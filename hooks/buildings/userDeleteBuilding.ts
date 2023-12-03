import {useState} from "react";
import axios from "axios";

const useDeleteBuilding = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteBuilding = async (id: string) => {
        setIsLoading(true);
        setError(null);

        console.log(id);

        try {
            await axios.delete(`http://159.203.48.115:8898/api/v1/buildings/${id}`);
            setIsLoading(false);
            console.log("Deleted building");
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
                console.error('Failed to delete building:', error.message);
            } else {
                setError(new Error('An unknown error occurred'));
                console.error('Failed to delete building:', error);
            }

            console.log(error);
        }
    };

    return { deleteBuilding, isLoading, error, setError };
}

export default useDeleteBuilding;