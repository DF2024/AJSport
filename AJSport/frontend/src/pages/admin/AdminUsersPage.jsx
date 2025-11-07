import { useState } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import UserTable from '../../components/admin/UserTable';
import UserForm from '../../components/admin/UserForm';

function AdminUsersPage(){
    const [currentView, setCurrentView] = useState('table')
    const [editingUserId, setEditingUserId] = useState(null)

    const handleEdit = (id) => {
        setEditingVehicleId(id);
        setCurrentView('edit');
    };

    const handleNewUser = () => {
        setEditingUserId(null);
        setCurrentView('create');
    };

  // Función para refrescar la tabla y volver a la vista de tabla
    const handleActionSuccess = () => {
        setCurrentView('table');
        // La VehicleTable se volverá a montar y cargará los datos frescos
    };

    const handleCancel = () => {
        setCurrentView('table');
    };

    return(
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Gestión de Usuarios
            </Typography>

            {currentView === 'table' && (
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="contained" onClick={handleNewUser}>
                Añadir Nuevo Usuario
                </Button>
            </Stack>
            )}

            {currentView === 'table' && (
                <UserTable onEdit={handleEdit} onRefresh={handleActionSuccess} />
            )}

            {(currentView === 'create' || currentView === 'edit') && (
                <UserForm
                    userId={editingUserId}
                    onSave={handleActionSuccess}
                    onCancel={handleCancel}
                />
            )}
        </Box>
    )
}

export default AdminUsersPage