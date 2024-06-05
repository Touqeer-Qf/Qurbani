import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Layout from './Layout'
import InputFormDialog from '../components/InputFormDialog';
import Axios from '../../axios';
import useAuth from '../useAuth';

const getBoxStyle = (filled, total) => {
  if (filled === total) {
    return {
      backgroundColor: 'red',
      color: 'white',
    };
  } else if (filled === 0) {
    return {
      backgroundColor: '#90e0ef',
      color: 'black',
    };
  } else {
    return {
      backgroundColor: '#06d6a0',
      color: 'white',
    };
  }
};


const Home = () => {
  const {name} = useAuth()
  const total = 7;
    const [dialog, setDialog] = useState(false)
    const [selectedBox, setSelectedBox] = useState(null);
    const [partNumber, setPartNumber] = useState(null);
    const [bookingData, setBookingData] = useState([]);

    const getData = async () => {
      try {
          const result = await Axios.get('/cows')
          if (result.status === 200) {
            setBookingData(result.data)
          }
      } catch (e) {
          console.log("err->", e);
      }
  };

  useEffect(()=>{
    getData()
  },[])
  
  const refreshData = () => {
    getData();
  };

  return (
    <Layout>
      <InputFormDialog open={dialog} setOpen={()=>setDialog(!dialog)} selectedAnimal={selectedBox} partNumber={partNumber+1} refreshData={refreshData} bookerName={name}/>
        <Grid container  pt={5} pl={2}> 
        {bookingData?.map(({ ID, TotalParts, AllocatedParts }) => {
          const isCompleted = AllocatedParts === total;
          const boxStyle = getBoxStyle(AllocatedParts, total);

          return (
            <Grid item xs={6} sm={5} md={3} lg={2.2}
            onClick={() => {
                if (!isCompleted) {
                    setPartNumber(AllocatedParts)
                    setSelectedBox(ID);
                    setDialog(!dialog);
                }
              }}
              sx={{
                // width: '18%',
                padding: 2,
                m: 1,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: 3,
                ...boxStyle,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '180px',
                cursor: isCompleted ? 'default' : 'pointer',
                '&:hover': {
                  opacity: isCompleted ? 1 : 0.8,
                },
              }}
            >
              <Typography variant="h6">
                {isCompleted ? 'Completed' : `${AllocatedParts}/${total}`}
              </Typography>
            </Grid>
          );
        })}
        </Grid>
    </Layout>
  )
}

export default Home