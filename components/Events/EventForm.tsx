import React, {useState} from "react";
import {
    Button,
    Input,
    Select,
    SelectItem,
    Textarea
} from "@nextui-org/react";

import {primaryButton, subtitle, title} from "@/components/primitives";
import EventData from "@/models/Event";
import useGetLocations from "@/hooks/locations/useGetLocations";
import {EventFormData} from "@/hooks/events/useAddEvent";

interface EventFormProps {
    event?: EventData;
    onSubmit: (formValues: EventFormData) => void;
}

const EventForm = (props: EventFormProps) => {
    const {locations, error, isLoading} = useGetLocations();


    const [name, setName] = useState(props.event?.name || "");
    const [description, setDescription] = useState(props.event?.description || "");
    const [startDateTime, setStartDateTime] = useState(props.event?.startDateTime || "");
    const [endDateTime, setEndDateTime] = useState(props.event?.endDateTime || "");
    const [location, setLocation] = useState(props.event?.location || "");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formValues: EventFormData = {
            name,
            description,
            startDateTime,
            endDateTime,
            locationId: location,
        }

        props.onSubmit(formValues);
    }

    const onChangeStartDateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDateTime(event.target.value);
        const endDateTime = new Date(event.target.value);
        endDateTime.setHours(endDateTime.getHours() + 1);

        setEndDateTime(endDateTime.toISOString().slice(0, 16));
    }

    const onChangeLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(event.target.value);
    }

    return (
        <div className={"flex flex-col max-w-md mx-auto"}>

            <h1 className={title({color: 'green'})}>{props.event ? "Edit Event" : "Add Event"}</h1>
            <span
                className={subtitle({fullWidth: true})}>Fill in the form below to {props.event ? "edit" : "add"} a building.</span>


            <form onSubmit={handleSubmit} className={"flex flex-col gap-4 mt-5"}>

                <Input
                    isRequired
                    label="Name"
                    placeholder="Enter the name of the building"
                    value={name}
                    onValueChange={setName}/>

                <Textarea
                    label="Description"
                    placeholder="Enter the description of the building"
                    value={description}
                    onValueChange={setDescription}/>

                <Input
                    isRequired
                    label="Start Date Time"
                    type={"datetime-local"}
                    placeholder="Enter the start date time of the event"
                    value={startDateTime}
                    onChange={onChangeStartDateTime}/>
                <Input
                    isRequired
                    label="End Date Time"
                    type={"datetime-local"}
                    placeholder="Enter the end date time of the event"
                    value={endDateTime}
                    onValueChange={setEndDateTime}/>

                <Select
                    isRequired
                    label="Location"
                    labelPlacement="outside"
                    value={[location]}
                    onChange={onChangeLocation}
                    placeholder="Select a location">
                    {locations.map((location: any) => (
                        <SelectItem key={location.locationId} value={location.locationId}>
                            {location.name}
                        </SelectItem>
                    ))}
                </Select>

                <Button type="submit" className={primaryButton({color: "green"})}>
                    {props.event ? "Edit" : "Add"}
                </Button>

            </form>
        </div>
    );
};
export default EventForm;

