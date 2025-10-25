import api from './api'

export const getVehicles = async () => {
    try{
        const response = await api.get('/vehicles/');
        return response.data;
    }catch(error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
}