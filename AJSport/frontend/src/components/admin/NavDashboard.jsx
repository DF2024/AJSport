import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Divider,
} from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People'; // Para gestionar usuarios (futuro)
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function AdminDashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const navItems = [
    // { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Vehículos', icon: <DirectionsCarIcon />, path: '/dashboard/vehicles' },
    { text: 'Usuarios', icon: <PeopleIcon />, path: '/dashboard/users' }, // Futura ruta
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Panel de Administración
          </Typography>
          <ListItemButton onClick={handleLogout} sx={{ width: 'auto' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 1, color: 'white' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" sx={{ color: 'white' }} />
          </ListItemButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> {/* Para empujar el contenido debajo del AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* Puedes añadir más secciones aquí si es necesario */}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {' '}
        {/* mt para evitar que el contenido quede debajo del AppBar */}
        {children}
      </Box>
    </Box>
  );
}

export default AdminDashboardLayout;