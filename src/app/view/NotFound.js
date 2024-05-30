import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

export function PageNotFound() {
  let navigate = useNavigate();
  const backToDashboard = () => {
    navigate("/")
  }
  return (
    <Box sx={{ height: '80vh', textAlign: 'center' }}>
      <Box sx={{ mt: 10 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="initial" sx={{ pt: 4 }}>
            We can't seem to find that
          </Typography>
          <Typography variant="h6" color="initial" sx={{ pt: 4 }}>
            The Page You're Looking For Doesn't Exist Or Has Been Moved
          </Typography>
        </Box>
        <Box width='20%' sx={{ pl: "40%" }}>
          <Button title={'Back to Dashboard'} onClick={backToDashboard} />
        </Box>
      </Box>
    </Box>
  )
}