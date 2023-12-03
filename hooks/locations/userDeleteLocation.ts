import {useState} from "react";
import axios from "axios";

const useDeleteLocation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteLocation = async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            await axios.delete(`http://159.203.48.115:8898/api/v1/locations/${id}`);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
                console.error('Failed to delete location:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to delete location:', error);
            }

            console.log(error);
        }
    };

    return { deleteLocation, isLoading, error, setError };
}

export default useDeleteLocation;