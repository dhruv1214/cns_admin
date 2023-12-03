import axios from "axios";
import {useEffect, useState} from "react";
import {BuildingFormValues} from "@/hooks/buildings/useAddBuiling";
import Building from "@/models/Building";


const useEditBuilding = (id: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [building, setBuilding] = useState<Building | null>(null);

    useEffect(() => {
        const getBuilding = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8898/api/v1/buildings/${id}`);
                setBuilding(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (axios.isAxiosError(error)) {
                    setError(error);
                    console.error('Failed to get building:', error.message);
                } else {
                    setError(new Error('An unknown error occurred'));
                    console.error('Failed to get building:', error);
                }
            }
        };

        getBuilding();
    }, [id]);

    const editBuilding = async (values: BuildingFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put(`http://localhost:8898/api/v1/buildings/${id}`, {
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
                console.error('Failed to edit building:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to edit building:', error);
            }

            console.log(error);
        }
    };

    return { editBuilding, isLoading, error, setError, building };
};

export default useEditBuilding;