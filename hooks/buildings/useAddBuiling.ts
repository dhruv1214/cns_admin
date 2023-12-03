import { useState } from 'react';
import axios from 'axios';

export interface BuildingFormValues {
    name: string;
    description: string;
    imageURL: string;
}

const useAddBuilding = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addBuilding = async (values: BuildingFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8898/api/v1/buildings', {
                name: values.name,
                description: values.description,
                imageURL: values.imageURL,
            });

            setIsLoading(false);
            return response.data;
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

    return { addBuilding, isLoading, error };
};

export default useAddBuilding;
