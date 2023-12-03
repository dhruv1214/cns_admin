'use client';
import React from "react";
import LocationForm from "@/components/Locations/LocationForm";
import useAddLocation, {LocationFormValues} from "@/hooks/locations/useAddLocation";
import Loading from "@/components/loading";
import {useRouter} from "next/navigation";
import {useDisclosure} from "@nextui-org/react";
import ErrorModel from "@/components/ErrorModel";
import {useCreateEvent} from "@/hooks/events/useGetEvents";
import EventForm from "@/components/Events/EventForm";
import {EventFormData} from "@/hooks/events/useAddEvent";


export default function Page() {
    const {createEvent, isLoading, error, setError} = useCreateEvent();
    const router = useRouter();

    const {isOpen, onOpen, onOpenChange, getDisclosureProps} = useDisclosure();

    const handleSubmit = async (formValues: EventFormData) => {

        const result = await createEvent(formValues);

        if (result) {
            router.push(`/events`);
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
            <EventForm onSubmit={handleSubmit}/>
            <ErrorModel error={error} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}