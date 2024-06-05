import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Typography, Button, Box, MenuItem, TextField } from '@mui/material';
import Layout from './Layout';
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

const debounce = (func, delay) => {
  let debounceTimer;
  return function(...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

const Home = () => {
  const { name } = useAuth();
  const total = 7;
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [partNumber, setPartNumber] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);

  const [category, setCategory] = useState(null);
  console.log("catgry->", category)
  const [isApiCalling, setIsApiCalling] = useState(false);

  const getData = async (category) => {
    try {
      setLoading(true);
      if(category){
        setIsApiCalling(true);
      const result = await Axios.get(`cows/category/${category}`);
      if (result.status === 200) {
        setBookingData(result.data);
      }
      }
      else{
      const result = await Axios.get('/cows');
      if (result.status === 200) {
        const data = result.data;
        setBookingData(data);
        const lastIndex = data.findIndex((box) => box.AllocatedParts < total);
        setCurrentBoxIndex(lastIndex !== -1 ? lastIndex : data.length - 1);
      }
      }
    } catch (e) {
      console.log('err->', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshData = () => {
    getData();
  };

  const handleCreateNew = () => {
    if (currentBoxIndex < bookingData.length - 1) {
      setCurrentBoxIndex(currentBoxIndex + 1);
    }
  };

  const handleBoxClick = (ID, AllocatedParts) => {
    console.log('alPart', AllocatedParts);
    if (AllocatedParts < total) {
      setPartNumber(AllocatedParts);
      setSelectedBox(ID);
      setDialog(true);
    }
  };

  const debouncedFetchData = useCallback(debounce(getData, 500), []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (!isApiCalling) {
      debouncedFetchData(selectedCategory);
    }
  };

  return (
    <Layout>
      <InputFormDialog
        open={dialog}
        setOpen={() => setDialog(!dialog)}
        selectedAnimal={selectedBox}
        partNumber={partNumber + 1}
        refreshData={refreshData}
        bookerName={name}
      />
      <Box pt={5} pl={3} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
        <Button
          variant="outlined"
          onClick={handleCreateNew}
          disabled={
            bookingData.length === 0 ||
            bookingData[currentBoxIndex].AllocatedParts < total
          }
        >
          Create New
        </Button>
        <Box sx={{width:"25%", display:"flex", alignItems:"center", px:4 }}>
          <Typography sx={{width:"200px"}}>Select Category</Typography>
        <TextField select label="Category" fullWidth
        value={category}
        onChange={handleCategoryChange}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          </TextField>
        </Box>
      </Box>
      {loading ? (
        <Typography pt={2} pl={2}>loading....</Typography>
      ) : (
        <Grid container pt={2} pl={2}>
          {bookingData
            .slice(0, currentBoxIndex + 1)
            .map((box, index) => (
              <Grid
                key={box.ID}
                item
                xs={6}
                sm={5}
                md={3}
                lg={2.2}
                onClick={() => handleBoxClick(box.ID, box.AllocatedParts)}
                sx={{
                  position: 'relative',
                  padding: 2,
                  m: 1,
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: 3,
                  ...getBoxStyle(box.AllocatedParts, total),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '100px',
                  cursor: box.AllocatedParts === total ? 'default' : 'pointer',
                  '&:hover': {
                    opacity: box.AllocatedParts === total ? 1 : 0.8,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '4px',
                    padding: '2px 4px',
                  }}
                >
                  Animal #{index + 1}
                </Typography>
                <Typography variant="h6">
                  {box.AllocatedParts === total ? 'Completed' : `${box.AllocatedParts}/${total}`}
                </Typography>
              </Grid>
            ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
