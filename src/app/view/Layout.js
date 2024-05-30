import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import colors from '../style/colors'
import SideNav from './SideNav';
import { Typography, Toolbar } from '@mui/material';

function Layout({ children }) {
  const drawerWidth = 240;

  return (
    <Fragment>
      <SideNav />
      <Box sx={{ bgcolor: colors.bgColor }}>
        <Box sx={{ display: "flex", justifyContent: { xs: "start", sm: "end" }, width: "100%", }}>
          <Box
            component="main"
            sx={{ width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },  }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>


      </Box>
    </Fragment>
  )
}

export default Layout