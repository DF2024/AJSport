// src/pages/AdminVehiclesPage.jsx
import React, { useState } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import VehicleTable from '../../components/admin/VehicleTable';
import VehicleForm from '../../components/admin/VehicleForm';
import CSVUploadForm from '../../components/admin/CSVUploadForm';
import AdminDashboardLayout from  '../../layouts/AdminDashboardLayout'


function AdminVehiclesPage() {
  const [currentView, setCurrentView] = useState('table');
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const handleEdit = (id) => {
    setEditingVehicleId(id);
    setCurrentView('edit');
  };

  const handleNewVehicle = () => {
    setEditingVehicleId(null);
    setCurrentView('create');
  };

  const handleCSVUpload = () => {
    setCurrentView('csv');
  };

  const handleActionSuccess = () => {
    setCurrentView('table');

  };

  const handleCancel = () => {
    setCurrentView('table');
  };

  return (

    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Vehículos
      </Typography>

      {currentView === 'table' && (
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleNewVehicle}>
            Añadir Nuevo Vehículo
          </Button>
          <Button variant="outlined" onClick={handleCSVUpload}>
            Subir Vehículos por CSV
          </Button>
        </Stack>
      )}

      {currentView === 'table' && (
        <VehicleTable onEdit={handleEdit} onRefresh={handleActionSuccess} />
      )}

      {(currentView === 'create' || currentView === 'edit') && (
        <VehicleForm
          vehicleId={editingVehicleId}
          onSave={handleActionSuccess}
          onCancel={handleCancel}
        />
      )}

      {currentView === 'csv' && (
        <CSVUploadForm onUploadSuccess={handleActionSuccess} onCancel={handleCancel} />
      )}
    </Box>

  );
}

export default AdminVehiclesPage;