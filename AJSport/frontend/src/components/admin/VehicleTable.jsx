// src/components/admin/VehicleTable.jsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api' // Tu instancia de Axios
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


function VehicleTable({ onEdit, onRefresh }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/vehicles/'); // Endpoint que lista todos los vehículos (ya protegido por AdminAuth si quieres)
      console.log('Vehículos recibidos:', response.data);
      setVehicles(response.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Error al cargar los vehículos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [onRefresh]); // Refresca la tabla cuando onRefresh cambia (cuando un formulario se guarda)

  const handleDeleteClick = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirm(false);
    if (!vehicleToDelete) return;

    setLoading(true);
    try {
      await api.delete(`/vehicles/${vehicleToDelete}`); // Endpoint de eliminación
      onRefresh(); // Dispara la recarga de la tabla
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      setError('Error al eliminar el vehículo.');
    } finally {
      setLoading(false);
      setVehicleToDelete(null);
    }
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setVehicleToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }   

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Año</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id_vehicle}>
              <TableCell component="th" scope="row">
                {vehicle.id_vehicle}
              </TableCell>
              <TableCell>
                <Avatar
                  src={vehicle.image_url} // Usa la URL generada en el backend
                  alt={vehicle.name_vehicle}
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                >
                  <DirectionsCarIcon />
                </Avatar>
              </TableCell>
              <TableCell>{vehicle.name_vehicle}</TableCell>
              <TableCell>{vehicle.trademark?.name_trademark || 'N/A'}</TableCell>
              <TableCell>{vehicle.year_vehicle}</TableCell>
              <TableCell align="right">${vehicle.price_vehicle.toFixed(2)}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEdit(vehicle.id_vehicle)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteClick(vehicle.id_vehicle)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de que desea eliminar este vehículo? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} autoFocus color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default VehicleTable;