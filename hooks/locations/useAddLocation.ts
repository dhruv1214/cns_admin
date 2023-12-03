import axios from "axios";
import {useState} from "react";

export interface LocationFormValues {
    name: string;
    description: string;
    floor: number;
    roomNumber: string;
    buildingId: string;
    connectedLocations: string[];
}

const useAddLocation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addLocation = async (values: LocationFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://159.203.48.115:8898/api/v1/locations', {
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

    return { addLocation, isLoading, error, setError };
};

export default useAddLocation;