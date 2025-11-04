import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Stack, Alert } from "@mui/material";

function Login({ apiBaseUrl = "http://127.0.0.1:8000" }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {

      const res = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.detail || "Error al iniciar sesión");
      }

      // Guardamos el token en localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", JSON.stringify(data.role));


      const role = JSON.parse(localStorage.getItem("role")).name_role.toLowerCase();
      // Redirigimos según el rol del usuario
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {

      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey.100",
        p: 3,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 5,
          borderRadius: 4,
          boxShadow: 3,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Correo electrónico"
              name="username"
              type="email"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
