import { useState, useEffect } from 'react';
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

function UserForm({ userId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name_user: '',
    lastname_user: '',
    email_user: '',
    password: '',
    ci_user: '',
    number_user: '',
    born_date: '',
    role_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [roles, setRoles] = useState([]);


  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const [roleRes] = await Promise.all([
          api.get('/roles/'),
        ]);
        setRoles(roleRes.data);
      } catch (err) {
        console.error('Error fetching lookup data:', err);
        setError('Error al cargar los roles.');
      }
    };

    fetchLookups();

    if (userId) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/users/${userId}`);
          setFormData({
            name_user: response.data.name_user,
            lastname_user: response.data.lastname_user,
            email_user: response.data.email_user,
            password: response.data.password,
            ci_user: response.data.ci_user,
            number_user: response.data.number_user,
            born_date: response.data.born_date,
            role_id: response.data.user_role?.id_role || '',
          });
        } catch (err) {
          console.error('Error fetching user:', err);
          setError('Error al cargar los datos del usuario para edición.');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [userId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;
      if (userId) {
  
        response = await api.put(`/users/${userId}`, formData);
        setSuccess('Usuario actualizado exitosamente.');
      } else {

        response = await api.post('/users/', formData);
        setSuccess('Usuario creado exitosamente.');
      }
      onSave();
    } catch (err) {
      console.error('Error saving user:', err.response?.data || err.message);
      setError(
        err.response?.data?.detail || 'Error al guardar el usuario. Intente de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {userId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Nombre"
          name="name_user"
          value={formData.name_user}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Apellido"
          name="lastname_user"
          value={formData.lastname_user}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Correo Electrónico"
          name="email_user"
          type="email"
          value={formData.email_user}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Cédula / ID"
          name="ci_user"
          value={formData.ci_user}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Número de Teléfono"
          name="number_user"
          value={formData.number_user}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Fecha de Nacimiento"
          name="born_date"
          type="date"
          value={formData.born_date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          select
          label="Rol"
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          fullWidth
          required
        >
          {roles.map((option) => (
            <MenuItem key={option.id_role} value={option.id_role}>
              {option.name_role}
            </MenuItem>
          ))}
        </TextField>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Guardar Usuario'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default UserForm;
