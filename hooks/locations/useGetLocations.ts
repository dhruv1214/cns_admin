import {useState, useEffect} from "react";
import axios from "axios";

const useGetLocations = () => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {

        const fetchLocations = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://159.203.48.115:8898/api/v1/locations');
                setLocations(response.data);
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
        fetchLocations();
    }, []);

    return {locations, isLoading, error};
};

export default useGetLocations;