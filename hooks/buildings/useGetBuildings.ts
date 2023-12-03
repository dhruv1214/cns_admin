import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetBuildings = () => {
    const [buildings, setBuildings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                // Use your API endpoint here
                const response = await axios.get('http://159.203.48.115:8898/api/v1/buildings');
                setBuildings(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (axios.isAxiosError(error)) {
                    setError(error);
                    console.error('Failed to add building:', error.message);
                } else {
                    setError(new Error('An unknown error occurred'));
                    console.error('Failed to add building:', error);
                }
            }
        };
        fetchBuildings();
    }, []);

    return { buildings, isLoading, error };
};

export default useGetBuildings;
