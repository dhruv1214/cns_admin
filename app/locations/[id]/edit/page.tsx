'use client';

import React from "react";
import LocationForm from "@/components/Locations/LocationForm";
import {LocationFormValues} from "@/hooks/locations/useAddLocation";
import Loading from "@/components/loading";
import {useRouter} from "next/navigation";
import {useDisclosure} from "@nextui-org/react";
import ErrorModel from "@/components/ErrorModel";
import useEditLocation from "@/hooks/locations/useEditLocation";


export default function Page({params}: { params: { id: string } }) {
    const {editLocation, isLoading, error, setError, location} = useEditLocation(params.id);
    const router = useRouter();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleSubmit = async (formValues: LocationFormValues) => {
        const result = await editLocation(formValues);

        if (result) {
            router.push(`/locations`);
        }
    }

    if (isLoading) return (<Loading/>);

    if (error && !isOpen) {
        onOpen();
        setError(null)
    }

    if (!location) return (<div>Location not found</div>);

    const buildingLocation:BuildingLocation = {
        locationId: location.locationId,
        name: location.name,
        description: location.description,
        floor: location.floor,
        roomNumber: location.roomNumber,
        buildingId: location.buildingId,
        connectedLocations: location.connectedLocations
    }

    return (
        <div>
            <title>Edit Location</title>
            <LocationForm onSubmit={handleSubmit} buildingLocation={buildingLocation}/>
            <ErrorModel error={error} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}