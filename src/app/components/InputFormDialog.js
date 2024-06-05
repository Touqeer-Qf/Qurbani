import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, TextField, MenuItem, Button, Grid} from '@mui/material';
import { useForm } from 'react-hook-form';
import Axios from '../../axios';

const InputFormDialog = ({ open, setOpen, partNumber, selectedAnimal, refreshData, bookerName }) => {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('normal');
  const [boxNumber, setBoxNumber] = useState(selectedAnimal);
  const [partNo, setPartNo] = useState(partNumber);
  console.log("Partnum=>", partNo)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBoxNumber(selectedAnimal);
    setPartNo(partNumber);
    reset();
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
                label="Animal Number"
                disabled
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
                defaultValue={partNumber}
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
