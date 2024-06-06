/*import React, { Fragment, useEffect, useState } from 'react';
import Layout from './Layout';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Box,
  TextField,
  Typography
} from '@mui/material';
import Axios from '../../axios';
import colors from '../style/colors';

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = async () => {
    setLoading(true)
    try {
        const result = await Axios.get('/bookings')
        if (result.status === 200) {
          setBookingData(result.data)
        }
    } catch (e) {
        console.log("err->", e);
    }finally{
      setLoading(false)
    }
};

const filteredData = bookingData?.filter(data => {
  const values = Object?.values(data)?.map(value => String(value)?.toLowerCase());
  return values?.some(value => value?.includes(searchQuery?.toLowerCase()));
});


useEffect(()=>{
  getData()
},[])

  return (
    <Layout>
        <Box sx={{ pt: 5, pl:2, pr:4 }}>
          <Box sx={{bgcolor:"white", py:2, display:"flex", alignItems:"center"}}>
            <Typography sx={{px:2}}>Search: </Typography>
          <TextField label="Search By Name" onChange={(e) => setSearchQuery(e.target.value)}/>
          </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{
                '&::-webkit-scrollbar': {
                  bgcolor: colors.white,
                  height: "8px",
                  borderRadius: "10px",
                  cursor: "pointer"
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: colors.primary,
                  borderRadius: "10px",
                  cursor: "pointer"
                },
                "&.MuiPaper-root": {
                  borderRadius: "12px",
                  mt: 2,
                  boxShadow: 0,
                }
              }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Person Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Booker Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Phone Numbers</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Animal Number</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Hissa Number</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Booking Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {loading ? <p style={{paddingLeft:"12px"}}>...loading</p>:
              <Fragment>
                {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.ID}>
                    <TableCell component="th" scope="row" sx={{ fontSize: "14px" }}>{row.customer_name}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.booker_name}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.phone_number}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.cow_id}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.part_number}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.category}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.date_of_booking?.split('T')[0]}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.address}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px" }}>{row.amount}</TableCell>
                  </TableRow>
                ))}
              </Fragment>
                }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={bookingData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </Layout>
  )
}

export default Report*/

import React, { Fragment, useEffect, useState } from 'react';
import Layout from './Layout';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Box,
  TextField,
  Typography
} from '@mui/material';
import Axios from '../../axios';
import colors from '../style/colors';

const Report = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const getData = async () => {
    setLoading(true);
    try {
      const result = await Axios.get('/bookings');
      if (result.status === 200) {
        setBookingData(result.data);
        const initialFilters = {};
        if (result.data.length > 0) {
          Object.keys(result.data[0]).forEach(key => {
            initialFilters[key] = "";
          });
        }
        setFilters(initialFilters);
      }
    } catch (e) {
      console.log("err->", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = bookingData.filter(data => {
    return Object.keys(filters).every(key => {
      return data[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  useEffect(() => {
    getData();
  }, []);

  const columns = bookingData.length > 0 ? Object.keys(bookingData[0]) : [];

  return (
    <Layout>
      <Box sx={{ pt: 5, pl: 2, pr: 4 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer sx={{
            '&::-webkit-scrollbar': {
              bgcolor: colors.white,
              height: "8px",
              borderRadius: "10px",
              cursor: "pointer"
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: colors.primary,
              borderRadius: "10px",
              cursor: "pointer"
            },
            "&.MuiPaper-root": {
              borderRadius: "12px",
              mt: 2,
              boxShadow: 0,
            }
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column} sx={{ fontWeight: "bold" }}>
                      {column.replace('_', ' ').toUpperCase()}
                      <TextField
                        name={column}
                        value={filters[column] || ''}
                        onChange={handleFilterChange}
                        placeholder={`Filter ${column}`}
                        variant="standard"
                        size="small"
                        sx={{ mt: 1, width: '100%' }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? <p style={{ paddingLeft: "12px" }}>...loading</p> :
                  <Fragment>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column) => (
                          <TableCell key={column} align="center" sx={{ fontSize: "14px" }}>
                            {column === 'date_of_booking' ? row[column]?.split('T')[0] : row[column]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </Fragment>
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={bookingData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Layout>
  );
}

export default Report;
