// src/components/admin/CSVUploadForm.jsx
import React, { useState } from 'react';
import {
  Button,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '../../services/api'

function CSVUploadForm({ onUploadSuccess, onCancel }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setSelectedFile(file);
      setMessage('');
      setSeverity('info');
    } else {
      setSelectedFile(null);
      setMessage('Por favor, selecciona un archivo CSV válido.');
      setSeverity('error');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Por favor, selecciona un archivo CSV primero.');
      setSeverity('warning');
      return;
    }

    setUploading(true);
    setMessage('');
    setSeverity('info');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post('/vehicles/upload-csv/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message || 'CSV subido exitosamente.');
      setSeverity('success');
      setSelectedFile(null); 
      onUploadSuccess(); 
    } catch (error) {
      console.error('Error uploading CSV:', error.response?.data || error.message);
      setMessage(
        error.response?.data?.detail?.message ||
          error.response?.data?.detail ||
          'Error al subir CSV. Verifique el formato del archivo.'
      );
      setSeverity('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ mt: 3, p: 3, border: '1px dashed grey', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Subir Vehículos por CSV
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        El archivo CSV debe contener las columnas: `name_vehicle`, `description_vehicle`, `year_vehicle`, `mileage_vehicle`, `price_vehicle`, `image_path` (opcional), `trademark_id`, `status_id`, `type_id`.
      </Typography>

      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="csv-upload-button"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="csv-upload-button">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          fullWidth
          sx={{ mb: 2 }}
        >
          {selectedFile ? selectedFile.name : 'Seleccionar Archivo CSV'}
        </Button>
      </label>

      {message && (
        <Alert severity={severity} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onCancel} disabled={uploading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {uploading ? 'Subiendo...' : 'Subir CSV'}
        </Button>
      </Stack>
    </Box>
  );
}

export default CSVUploadForm;