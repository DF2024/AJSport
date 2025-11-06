import * as React from 'react';

import AdbIcon from '@mui/icons-material/Adb';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link, Container} from '@mui/material';


function NavForm() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

            <Link
                component={RouterLink} 
                to="/" 
                color="inherit" 
                sx={{ textDecoration: 'none' }}
            >
              LOGO
            </Link>
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
 
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavForm;