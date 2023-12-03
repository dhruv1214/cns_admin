import React, {useState} from "react";
import Building from "@/models/Building";
import {Button, Input} from "@nextui-org/react";
import {primaryButton, subtitle, title} from "@/components/primitives";
import {BuildingFormValues} from "@/hooks/buildings/useAddBuiling";

interface BuildingFormProps {
    building: Building | null;
    onSubmit: (formValues: BuildingFormValues) => void;
}
//
const BuildingForm = (props: BuildingFormProps) => {

    const [name, setName] = useState(props.building?.name || "");
    const [description, setDescription] = useState(props.building?.description || "");
    const [imageURL, setImageURL] = useState(props.building?.imageURL || "");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate the form values
        if (!name || !description || !imageURL) {
            return;
        }

        const formValues: BuildingFormValues = {
            name,
            description,
            imageURL
        };

        props.onSubmit(formValues);
    }

    return (
        <div className={"flex flex-col max-w-md mx-auto"}>
            <h1 className={title({color: 'pink'})}>{props.building ? "Edit Building" : "Add Building"}</h1>
            <span className={subtitle({fullWidth: true})}>Fill in the form below to {props.building ? "edit" : "add"} a building.</span>
            <form onSubmit={handleSubmit} className={"flex flex-col gap-4 mt-5"}>
                <Input
                    isRequired
                    label="Name"
                    placeholder="Enter the name of the building"
                    value={name}
                    onValueChange={setName}
                />

                <Input
                    label="Description"
                    placeholder="Enter the description of the building"
                    value={description}
                    onValueChange={setDescription}
                />

                <Input
                    label="Image URL"
                    placeholder="Enter the image URL of the building"
                    value={imageURL}
                    onValueChange={setImageURL}/>

                <Button type="submit" className={primaryButton({color: "pink"})} >
                    {props.building ? "Edit" : "Add"}
                </Button>

            </form>
        </div>
    );
};
export default BuildingForm;

