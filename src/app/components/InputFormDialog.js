import React, { useEffect, useState } from 'react';
import {
  Box, Dialog, DialogContent, DialogTitle, TextField, MenuItem, Button, Grid, InputAdornment, IconButton
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditLocationAlt } from '@mui/icons-material';
import Axios from '../../axios';

const InputFormDialog = ({ open, setOpen, partNumber, selectedAnimal, refreshData, bookerName }) => {
  console.log("booke=>", bookerName)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('normal');
  const [boxNumber, setBoxNumber] = useState(selectedAnimal);
  const [partNo, setPartNo] = useState(partNumber);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBoxNumber(selectedAnimal);
    setPartNo(partNumber);
    reset(); // Reset form fields when dependencies change
  }, [selectedAnimal, partNumber, reset]);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const obj = {
        cow_id: selectedAnimal,
        part_number: partNo,
        customer_name: formData.firstName,
        phone_number: formData.phoneNumber,
        date_of_booking: date,
        category: category,
        booker_name: formData.bookerName,
        address: formData.address,
        amount: formData.amount,  
      };
      const { status, data } = await Axios.post('/bookings', obj);
      if (status === 201 ) {
        setOpen(false);
        refreshData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>Animal No: {boxNumber} Form</DialogTitle>
      <DialogContent>
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
                select
                label="Category"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                {...register('category', { required: true })}
                error={!!errors.category}
                helperText={errors.category ? 'Category is required' : ''}
              >
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                label="Animal Number"
                fullWidth
                defaultValue={selectedAnimal}
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
                defaultValue={bookerName}
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
                value={partNo}
                InputProps={{ readOnly: true }}
                {...register('partNo')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                {...register('amount', { required: 'Amount is required' })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={() => setOpen(false)} color="secondary" sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained" disabled={loading}>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InputFormDialog;
