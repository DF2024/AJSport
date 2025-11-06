import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../services/vehicleService"; // crea esta función
import DetailsVehicle from "../components/vehicles/DetailsVehicle";

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      const data = await getVehicleById(id);
      setVehicle(data);
    };
    fetchVehicle();
  }, [id]);

  return vehicle ? <DetailsVehicle vehicle={vehicle} /> : <p>Cargando...</p>;
};

export default VehicleDetailPage;