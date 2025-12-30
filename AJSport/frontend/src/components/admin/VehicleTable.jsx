// src/components/admin/VehicleTable.jsx
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, CircularProgress, Alert, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import api from '../../services/api';

function VehicleTable({ onEdit, onRefresh }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);


  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/vehicles/');
      setVehicles(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los vehículos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [onRefresh]);


  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este vehículo?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      setError('Error al eliminar el vehículo.');
    }
  };


  const handleBulkDelete = async () => {
    if (selectionModel.length === 0) {
      alert('No has seleccionado ningún vehículo.');
      return;
    }

    if (!window.confirm(`¿Seguro que deseas eliminar ${selectionModel.length} vehículos seleccionados?`)) return;

    try {
      await api.delete('/vehicles/bulk-delete/', {
        data: { ids: selectionModel },
      });
      setSelectionModel([]);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      setError('Error al eliminar los vehículos seleccionados.');
    }
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;


  const rows = vehicles.map(v => ({
    ...v,
    trademark_name: v.trademark?.name_trademark ?? 'N/A',
    status_name: v.status?.status ?? 'N/A',
    vehicle_type_name: v.vehicle_type?.name_type ?? 'N/A',
  }));

  // Columnas de la tabla
  const columns = [
    { field: 'id_vehicle', headerName: 'ID', width: 80 },
    {
      field: 'image_url',
      headerName: 'Imagen',
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={params.row?.image_url}
          alt={params.row?.name_vehicle || ''}
          variant="rounded"
          sx={{ width: 56, height: 56 }}
        >
          <DirectionsCarIcon />
        </Avatar>
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'name_vehicle', headerName: 'Nombre', width: 180 },
    { field: 'trademark_name', headerName: 'Marca', width: 150 },
    { field: 'year_vehicle', headerName: 'Año', width: 100 },
    { 
      field: 'price_vehicle', 
      headerName: 'Precio', 
      width: 120,
    },
    { field: 'status_name', headerName: 'Estado', width: 120 },
    { field: 'vehicle_type_name', headerName: 'Tipo', width: 130 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      renderCell: (params) => (
        <>
          <Button color="primary" onClick={() => onEdit(params.row.id_vehicle)}>
            <EditIcon />
          </Button>
          <Button color="error" onClick={() => handleDelete(params.row.id_vehicle)}>
            <DeleteIcon />
          </Button>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          disabled={selectionModel.length === 0}
          onClick={handleBulkDelete}
        >
          Eliminar seleccionados
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id_vehicle}
        checkboxSelection
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
        disableSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default VehicleTable;
