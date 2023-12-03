'use client';
import React from "react";
import BuildingForm from "@/components/Buildings/BuildingForm";
import useAddBuilding, {BuildingFormValues} from "@/hooks/buildings/useAddBuiling";
import {useRouter} from "next/navigation";
import Loading from "@/components/loading";


export default function Page() {
    const { addBuilding, isLoading, error } = useAddBuilding();
    const router = useRouter();

    const handleSubmit = async (formValues: BuildingFormValues) => {
        const result = await addBuilding(formValues);
        if (result) {
            console.log('Building added:', result);
            router.push('/locations');
        }
    }

    if (isLoading) {
        return (<Loading />);
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <title>Add Building</title>
            <BuildingForm  building={null} onSubmit={handleSubmit} />
        </div>
    );
}