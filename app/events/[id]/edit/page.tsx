'use client';
import React from "react";
import Loading from "@/components/loading";
import {useRouter} from "next/navigation";
import {useDisclosure} from "@nextui-org/react";
import ErrorModel from "@/components/ErrorModel";
import EventForm from "@/components/Events/EventForm";
import {EventFormData} from "@/hooks/events/useAddEvent";
import {useUpdateEvent} from "@/hooks/events/useGetEvents";
import EventData from "@/models/Event";

export default function Page({params}: { params: { id: string } }) {
    const {updateEvent, isLoading, error, setError, event} = useUpdateEvent(params.id);
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange, getDisclosureProps} = useDisclosure();

    const handleSubmit = async (formValues: EventFormData) => {
        const result = await updateEvent(formValues);

        if (result) {
            router.push(`/events`);
        }
    }

    if (isLoading) return (<Loading/>);

    if (error && !isOpen) {
        onOpen();
        setError(null)
    }


    if (!event) return (<Loading/>);

    const eventFormData: EventData = {
        name: event.name,
        description: event.description,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        location: event.locationId,
    }

    return (
        <div>
            <title>Add Location</title>
            <EventForm onSubmit={handleSubmit} event={eventFormData}/>
            <ErrorModel error={error} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}