// src/components/admin/VehicleForm.jsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import api from '../../services/api';

function VehicleForm({ vehicleId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name_vehicle: '',
    description_vehicle: '',
    year_vehicle: '',
    mileage_vehicle: '',
    price_vehicle: '',
    trademark_id: '',
    status_id: '',
    type_id: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Datos para los selects
  const [trademarks, setTrademarks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchLookups = async () => {
    try {
        const [trademarksRes, statusesRes, typesRes] = await Promise.all([
            api.get('/trademarks/'), // <-- Cambia a la ruta base de tu router_trademark.py
            api.get('/statuses/'),   // <-- Cambia a la ruta base de tu router_status.py
            api.get('/vehicle-types/'),      // <-- Cambia a la ruta base de tu router_type.py
        ]);
        setTrademarks(trademarksRes.data);
        setStatuses(statusesRes.data);
        setTypes(typesRes.data);
      } catch (err) {
        console.error('Error fetching lookup data:', err);
        setError('Error al cargar datos de marcas, estados o tipos.');
      }
    };

    fetchLookups();

    if (vehicleId) {
      const fetchVehicle = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/vehicles/${vehicleId}`);
          setFormData({
            name_vehicle: response.data.name_vehicle,
            description_vehicle: response.data.description_vehicle,
            year_vehicle: response.data.year_vehicle,
            mileage_vehicle: response.data.mileage_vehicle,
            price_vehicle: response.data.price_vehicle,
            trademark_id: response.data.trademark?.id_trademark || '',
            status_id: response.data.status?.id_status || '',
            type_id: response.data.vehicle_type?.id_type || '',
          });
        } catch (err) {
          console.error('Error fetching vehicle:', err);
          setError('Error al cargar los datos del vehículo para edición.');
        } finally {
          setLoading(false);
        }
      };
      fetchVehicle();
    }
  }, [vehicleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      let response;
      if (vehicleId) {
        response = await api.put(`/vehicles/${vehicleId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Vehículo actualizado exitosamente.');
      } else {
        response = await api.post('/vehicles/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Vehículo creado exitosamente.');
      }
      onSave(); // Notificar a la página principal para refrescar
    } catch (err) {
      console.error('Error saving vehicle:', err.response?.data || err.message);
      setError(
        err.response?.data?.detail || 'Error al guardar el vehículo. Intente de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {vehicleId ? 'Editar Vehículo' : 'Crear Nuevo Vehículo'}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nombre del Vehículo"
          name="name_vehicle"
          value={formData.name_vehicle}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Descripción"
          name="description_vehicle"
          value={formData.description_vehicle}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
        />
        <TextField
          label="Año"
          name="year_vehicle"
          type="number"
          value={formData.year_vehicle}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Kilometraje"
          name="mileage_vehicle"
          type="number"
          value={formData.mileage_vehicle}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Precio"
          name="price_vehicle"
          type="number"
          value={formData.price_vehicle}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          select
          label="Marca"
          name="trademark_id"
          value={formData.trademark_id}
          onChange={handleChange}
          fullWidth
          required
        >
          {trademarks.map((option) => (
            <MenuItem key={option.id_trademark} value={option.id_trademark}>
              {option.name_trademark}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Estado"
          name="status_id"
          value={formData.status_id}
          onChange={handleChange}
          fullWidth
          required
        >
          {statuses.map((option) => (
            <MenuItem key={option.id_status} value={option.id_status}>
              {option.status}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Tipo de Vehículo"
          name="type_id"
          value={formData.type_id}
          onChange={handleChange}
          fullWidth
          required
        >
          {types.map((option) => (
            <MenuItem key={option.id_type} value={option.id_type}>
              {option.name_type}
            </MenuItem>
          ))}
        </TextField>

        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span" fullWidth>
            {imageFile ? imageFile.name : 'Seleccionar Imagen'}
          </Button>
        </label>
        {imageFile && (
          <Typography variant="body2" color="textSecondary">
            Imagen seleccionada: {imageFile.name}
          </Typography>
        )}

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Guardar Vehículo'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default VehicleForm;