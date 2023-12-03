import axios from "axios";
import {useEffect, useState} from "react";
import {LocationFormValues} from "@/hooks/locations/useAddLocation";


const useEditLocation = (id: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [location, setLocation] = useState<any | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://159.203.48.115:8898/api/v1/locations/${id}`);
                setLocation(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (axios.isAxiosError(error)) {
                    setError(error);
                    console.error('Failed to add location:', error.message);
                } else {
                    setError(new Error('An unknown error occurred'));
                    console.error('Failed to add location:', error);
                }
            }
        };
        fetchLocation();
    }, []);

    const editLocation = async (values: LocationFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put(`http://159.203.48.115:8898/api/v1/locations/${id}`, {
                name: values.name,
                description: values.description,
                floor: values.floor,
                roomNumber: values.roomNumber,
                buildingId: values.buildingId,
                connectedLocations: values.connectedLocations,
            });

            setIsLoading(false);
            return response.data;
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
                console.error('Failed to add location:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to add location:', error);
            }

            console.log(error);
        }
    };

    return { editLocation, isLoading, error, setError, location };
};

export default useEditLocation;