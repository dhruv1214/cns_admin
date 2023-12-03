'use client';
import React from "react";
import BuildingForm from "@/components/Buildings/BuildingForm";
import Building from "@/models/Building";
import { BuildingFormValues } from "@/hooks/buildings/useAddBuiling";
import {useRouter} from "next/navigation";
import useEditBuilding from "@/hooks/buildings/useEditBuilding";
import building from "@/models/Building";
import Loading from "@/components/loading";
import {useDisclosure} from "@nextui-org/react";
import ErrorModel from "@/components/ErrorModel";


export default function Page({params}: { params: { id: string } }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {editBuilding, isLoading, error, setError, building} = useEditBuilding(params.id);

    const router = useRouter();

    const handleSubmit = async  (formValues: BuildingFormValues) => {

            const result = await editBuilding(formValues);

            if (result) {
                router.push(`/locations/Buildings`);
            }
    }

    if (isLoading) return (<Loading/>);


    if (error && !isOpen) {
        onOpen();
        setError(null)
    }

    return (
        <div>
            <title>Edit Building</title>
            <BuildingForm onSubmit={handleSubmit} building={building} />
            <ErrorModel error={error} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}