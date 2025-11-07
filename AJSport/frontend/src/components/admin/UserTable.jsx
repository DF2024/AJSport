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

function UserTable({ onEdit, onRefresh }){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get('/users/'); // Endpoint que lista todos los vehículos (ya protegido por AdminAuth si quieres)
                console.log('Usuarios recibidos:', response.data);
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Error al cargar los usuarios.');
            } finally {
                setLoading(false);
            }
        };


        useEffect(() => {
            fetchUsers();
        }, [onRefresh]) // Refresca la tabla cuando onRefresh cambia (cuando un formulario se guarda)

        const handleDeleteClick = (userId) => {
            setUserToDelete(userId)
            setOpenConfirm(true);
        }

        const handleConfirmDelete = async () => {
            setOpenConfirm(false)
            if (!userToDelete) return

            setLoading(true)
            try{
              await api.delete(`/users/${userToDelete}`)
              onRefresh();
            } catch(err){
              console.error('Error deleting user:', err);
              setError('Error al eliminar el usuario.');
            } finally {
                setLoading(false)
                setUserToDelete(null)
            }
        }

          const handleCloseConfirm = () => {
            setOpenConfirm(false);
            setUserToDelete(null);
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


        return(
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Cedula</TableCell>
                        <TableCell>Telefono</TableCell>
                        <TableCell>Fecha de nacimiento</TableCell>
                        <TableCell>Fecha de creación</TableCell>
                        <TableCell>Rol</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id_user}>
                            <TableCell component="th" scope="row">
                                {user.id_user}
                            </TableCell>
                            <TableCell>{user.name_user}</TableCell>
                            <TableCell>{user.lastname_user}</TableCell>
                            <TableCell>{user.email_user}</TableCell>
                            <TableCell >{user.ci_user}</TableCell>
                            <TableCell >{user.number_user}</TableCell>
                            <TableCell >{user.born_date}</TableCell>
                            <TableCell >{user.create_at}</TableCell>
                            <TableCell >{user.role?.name_role || 'N/A'}</TableCell>
                            <TableCell align="center">
                                <IconButton color="primary" onClick={() => onEdit(user.id_user)}>
                                <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDeleteClick(user.id_user)}>
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
        )


    }


export default UserTable