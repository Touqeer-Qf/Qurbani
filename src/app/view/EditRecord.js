import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Box, Dialog, DialogContent, DialogTitle, TextField, MenuItem, Button, Grid} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../axios';


const EditRecord = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("")
  const [category, setCategory] = useState("")

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const obj = {
        cow_id: formData.boxNumber,
        part_number: formData.partNo,
        customer_name: formData.firstName,
        phone_number: formData.phoneNumber,
        date_of_booking: formData.date,
        category: category,
        booker_name: formData.bookerName,
        address: formData.address,
        amount: formData.amount,  
      };
      const { data } = await Axios.put(`/bookings/${bookingId}`, obj);
      console.log("data : ", data)
      if (data === "Booking updated." ) {
        navigate("/report")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // setOpen(false);
    }
  };

  const defaultData = () => {
    setValue('date', state?.data.date_of_booking?.split('T')[0])
    setValue('boxNumber', state?.data.cow_id)
    setValue('firstName', state?.data.customer_name)
    setValue('bookerName', state?.data.booker_name)
    setValue('address', state?.data.address)
    setValue('phoneNumber', state?.data.phone_number)
    setValue('partNo', state?.data.part_number)
    setValue('amount', state?.data.amount)
    setBookingId(state?.data.booking_id)
    setCategory(state?.data.category)
  }
  useEffect(() => {
    defaultData()
  }, [])

  return (
    <Layout>
        <Box sx={{ backgroundColor: "white", mt:8, mr:4, ml:2, borderRadius: "12px", }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={4}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                {...register('date', { required: true })}
                error={!!errors.date}
                helperText={errors.date ? 'Date is required' : ''}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Animal Number"
                disabled
                fullWidth
                {...register('boxNumber')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Person Name"
                fullWidth
                {...register('firstName', { required: 'First Name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Booker Name"
                fullWidth
                {...register('bookerName', { required: 'Booker Name is required' })}
                error={!!errors.bookerName}
                helperText={errors.bookerName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                multiline
                rows={3}
                fullWidth
                {...register('address', { required: 'Address is required' })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                type="tel"
                fullWidth
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^\d{11}$/,
                    message: 'Phone Number must be 11 digits',
                  },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Hissa Number"
                fullWidth
                // InputProps={{ readOnly: true }}
                {...register('partNo')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount"
                type="tel"
                fullWidth
                {...register('amount', { required: 'Amount is required' })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button type="submit" color="primary" variant="contained" disabled={loading}>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        </Box>
    </Layout>
  )
}

export default EditRecord