'use client';
import React from "react";
import LocationForm from "@/components/Locations/LocationForm";
import useAddLocation, {LocationFormValues} from "@/hooks/locations/useAddLocation";
import Loading from "@/components/loading";
import {useRouter} from "next/navigation";
import {useDisclosure} from "@nextui-org/react";
import ErrorModel from "@/components/ErrorModel";


export default function Page() {
    const {addLocation, isLoading, error, setError} = useAddLocation();
    const router = useRouter();

    const {isOpen, onOpen, onOpenChange, getDisclosureProps} = useDisclosure();

    const handleSubmit = async (formValues: LocationFormValues) => {

        const result = await addLocation(formValues);

        if (result) {
            router.push(`/locations`);
        }

    }

    if (isLoading) return (<Loading/>);

    if (error && !isOpen) {
        onOpen();
        setError(null)
    }

    return (
        <div>
            <title>Add Location</title>
            <LocationForm onSubmit={handleSubmit}/>
            <ErrorModel error={error} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}