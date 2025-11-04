import React, { useState } from 'react';
import NameFieldForm from '../components/form/NameFieldForm';
import LastNameFieldForm from '../components/form/LastNameFieldForm';
import EmailInput from '../components/form/EmailFieldForm';
import PasswordTextField from '../components/form/PassFieldForm';
import CedulaTextField from '../components/form/CedulaFieldForm';
import PhoneNumberInput from '../components/form/PhoneNumberForm';
import BirthdatePicker from '../components/form/DateFieldForm';
import FormButtons from '../components/form/ButtonForm';
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Register({ apiBaseUrl = "http://127.0.0.1:8000" }) {
  const [form, setForm] = useState({
    name_user: '',
    lastname_user: '',
    email_user: '',
    password: '',
    ci_user: '',
    number_user: '',
    born_date: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null })); // Limpiar error al cambiar
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name_user) newErrors.name_user = "El nombre es obligatorio";
    if (!form.lastname_user) newErrors.lastname_user = "El apellido es obligatorio";
    if (!form.email_user) newErrors.email_user = "El email es obligatorio";
    if (!form.password || form.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    // Puedes agregar validaciones adicionales para cédula, teléfono o fecha
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setErrors({});
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Si el backend devuelve un array de errores por campo
        if (data.detail && Array.isArray(data.detail)) {
          const backendErrors = {};
          data.detail.forEach(err => {
            if (err.loc && err.msg) backendErrors[err.loc[1]] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          setErrors({ general: data.detail || data.message || "Error al registrar" });
        }
      } else {
        setSuccess("Registro exitoso. Ahora inicia sesión.");
        setOpenSnackbar(true);
        setForm({
          name_user: '',
          lastname_user: '',
          email_user: '',
          password: '',
          ci_user: '',
          number_user: '',
          born_date: ''
        });
        setTimeout(() => {
            navigate("/login");
        }, 1500);

      }
    } catch (err) {
      setErrors({ general: "Error de conexión. Revisa tu backend." });
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'grey.100',
        p: 3,
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 6,
          borderRadius: 6,
          boxShadow: 3,
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Registro de Usuario
        </Typography>

        {errors.general && (
          <Typography color="error" align="center" gutterBottom>
            {errors.general}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" align="center" gutterBottom>
            {success}
          </Typography>
        )}

        <Stack
          component="form"
          spacing={3}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <NameFieldForm
            name="name_user"
            value={form.name_user}
            onChange={handleChange}
            error={!!errors.name_user}
            helperText={errors.name_user}
          />

          <LastNameFieldForm
            name="lastname_user"
            value={form.lastname_user}
            onChange={handleChange}
            error={!!errors.lastname_user}
            helperText={errors.lastname_user}
          />

          <EmailInput
            name="email_user"
            value={form.email_user}
            onChange={handleChange}
            error={!!errors.email_user}
            helperText={errors.email_user}
          />

          <PasswordTextField
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <CedulaTextField
            name="ci_user"
            value={form.ci_user}
            onChange={handleChange}
            error={!!errors.ci_user}
            helperText={errors.ci_user}
          />

          <PhoneNumberInput
            name="number_user"
            value={form.number_user}
            onChange={handleChange}
            error={!!errors.number_user}
            helperText={errors.number_user}
          />

          <BirthdatePicker
            name="born_date"
            value={form.born_date}
            onChange={handleChange}
            error={!!errors.born_date}
            helperText={errors.born_date}
          />

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta?{' '}
              <MuiLink
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{ cursor: 'pointer' }}
              >
                Inicia Sesión
              </MuiLink>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <FormButtons name="Registrarse" type="submit" />
          </Box>
        </Stack>
      </Box>
      <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
            <Alert
                onClose={() => setOpenSnackbar(false)}
                severity="success"
                sx={{ width: "100%" }}
            >
                ✅ Registro exitoso. Redirigiendo al login...
            </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
