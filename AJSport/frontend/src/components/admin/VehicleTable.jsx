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

  // Cargar vehículos
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

  // Eliminar un vehículo individual
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

  // Eliminar múltiples vehículos
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

  const columns = [
    { field: 'id_vehicle', headerName: 'ID', width: 80 },
    {
      field: 'image_url',
      headerName: 'Imagen',
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={params.row?.image_url || undefined}
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
    {
      field: 'trademark',
      headerName: 'Marca',
      width: 150,
      valueGetter: (params) => params.row?.trademark?.name_trademark || 'N/A',
    },
    { field: 'year_vehicle', headerName: 'Año', width: 100 },
    {
      field: 'price_vehicle',
      headerName: 'Precio',
      width: 120,
      valueFormatter: (params) => {
        const value = params.value;
        return typeof value === 'number' ? `$${value.toFixed(2)}` : 'N/A';
      },
    },
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
        rows={vehicles}
        columns={columns}
        getRowId={(row) => row.id_vehicle}
        checkboxSelection
        selectionModel={selectionModel}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={(newSelection) => {
          console.log("✅ Selección actual:", newSelection);
          setSelectionModel(newSelection);
        }}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default VehicleTable;
