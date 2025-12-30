import api from './api'

export const getVehicles = async () => {
    try{
        const response = await api.get('/vehicles/');
        console.log("Vehículos recibidos:", response.data);
        return response.data;
    }catch(error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
}

export const getVehicleById = async (id) => {
  try {
    const response = await api.get(`/vehicles/${id}`);
    console.log("Vehículo recibido:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el vehículo con ID ${id}:`, error);
    throw error;
  }
};
