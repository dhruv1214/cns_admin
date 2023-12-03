import {useState, useEffect} from "react";
import axios from "axios";

const useGetLocations = () => {

    const fetchLocations = async (buildingId: string) => {
        try {
            const response = await axios.get('http://159.203.48.115:8898/api/v1/locations/building/' + buildingId);
            return response.data;
        } catch (error) {
            return [];
        }
    };

    return {fetchLocations};
};

export default useGetLocations;