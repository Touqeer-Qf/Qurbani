import React, { useState } from 'react';
import { Box, Button, Grid, InputAdornment, Typography, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from '../../axios';
import useProvideAuth from '../useProvideAuth';

const BgImage = styled('div')({
  backgroundImage: `url(https://enews.hamariweb.com/tpl_assets/2024/05/Untitled-Project-2024-05-18T113816.181.jpg)`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
});

const SignUpLink = styled('a')({
  textDecoration: "none",
  color: "#1976d2", // Replace this with your primary color
  marginLeft: "6px",
});

function Login() {
  
  const navigate = useNavigate();
  const { login, setUser } = useProvideAuth();
  const [loading, setLoading] = useState(false);

  // For Show Password Toggle
  const [showPassword, setShowPassword] = useState(false);

  // For Submit Login Form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        username: formData.email,
        password: formData.password,
      };
      const { status, data } = await Axios.post('users/login', obj)
      if (status === 200 && data.auth === true) {
        setUser(data.token);
        login(data)
        window.location.assign("/")
      }
    } catch (error) {
      
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component={BgImage} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={8} md={6} lg={4} sx={{ bgcolor: "#fff", pb: 2, borderRadius: "6px" }}>
            <Box sx={{ p: 2 }} display="flex" justifyContent="center">
              <Typography variant='h6' sx={{ fontSize: "20px", color: "#424242", fontWeight: "bold" }}>Login</Typography>
            </Box>
            <form onSubmit={handleSubmit(handleLogin)}>
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  label="User Name"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  {...register("email", {
                    required: "Please enter your User Name.",
                    pattern: {
                      message: "Please enter a valid User.",
                    },
                  })}
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  {...register("password", {
                    required: "Please enter your password.",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters.",
                    },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ px: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Box>
            </form>
            <Box sx={{ my: 4 }}>
              <Typography color="#424242" sx={{ textAlign: "center" }}>
                {/* Add any additional text here */}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
