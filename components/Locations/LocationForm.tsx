import React, {useEffect, useState} from "react";
import {
    Button, Chip,
    Input,
    Select,
    SelectItem,
    Textarea, useDisclosure
} from "@nextui-org/react";
import {primaryButton, subtitle, title} from "@/components/primitives";
import {LocationFormValues} from "@/hooks/locations/useAddLocation";
import useGetBuildings from "@/hooks/buildings/useGetBuildings";
import LocationSelectionModel from "@/components/Locations/LocationSelectionModel";
import useGetBuildingLocation from "@/hooks/locations/useGetBuildingLocation";

interface LocationFormProps {
    buildingLocation?: BuildingLocation;
    onSubmit: (formValues: LocationFormValues) => void;
}

const LocationForm = (props: LocationFormProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());

    const {buildings} = useGetBuildings();
    const {fetchLocations} = useGetBuildingLocation();
    const [locations, setLocations] = useState<any[]>([]);

    const [name, setName] = useState(props.buildingLocation?.name || "");
    const [description, setDescription] = useState(props.buildingLocation?.description || "");
    const [floor, setFloor] = useState(props.buildingLocation?.floor || 1);
    const [roomNumber, setRoomNumber] = useState(props.buildingLocation?.roomNumber || "");
    const [buildingId, setBuildingId] = useState<string>(buildings[0]?.buildingId || "");

    useEffect(() => {
        if (!buildingId) return;
        fetchLocations(buildingId).then((locations) => {
            if (props.buildingLocation) {
                const filteredLocations = locations.filter((location:any) => location.locationId !== props.buildingLocation?.locationId);
                setLocations(filteredLocations);
            } else {
                setLocations(locations);
            }
        });
    }, [buildingId])

    useEffect(() => {
        if(!props.buildingLocation || !props.buildingLocation.connectedLocations) return;

        const connectedLocationObject:any = props.buildingLocation.connectedLocations;

        // new set with location id only
        const locationSet = new Set([connectedLocationObject.locationId]);

        console.log(locationSet);

        setSelectedLocations(locationSet);

    }, [props.buildingLocation?.connectedLocations])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const connectedLocations: string[] = Array.from(selectedLocations);

        const formValues: LocationFormValues = {
            name,
            description,
            floor,
            roomNumber,
            buildingId,
            connectedLocations
        }

        props.onSubmit(formValues);
    }

    useEffect(() => {
        if (buildings.length > 0) {
            setBuildingId(buildings[0].buildingId);
        }
    }, [buildings])

    const handleBuildingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuildingId(event.target.value);
        setSelectedLocations(new Set());
    }

    const handleLocationSelection = () => {
        onOpen();
    }


    return (
        <div className={"flex flex-col max-w-md mx-auto"}>

            <h1 className={title({color: 'yellow'})}>{props.buildingLocation ? "Edit Location" : "Add Location"}</h1>
            <span
                className={subtitle({fullWidth: true})}>Fill in the form below to {props.buildingLocation ? "edit" : "add"} a building.</span>

            {
                selectedLocations.size > 0 ? (
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex flex-row gap-2 flex-wrap"}>
                            {
                                Array.from(selectedLocations).map((locationId: string) => {
                                    const location = locations.find((location) => location.locationId === locationId);
                                    return (
                                        <Chip color="success" key={locationId} className="rounded" variant="flat">
                                            {location?.name}
                                        </Chip>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : null
            }

            <form onSubmit={handleSubmit} className={"flex flex-col gap-4 mt-5"}>

                <div className={"flex flex-row gap-2 items-baseline"}>
                    <Select
                        isRequired
                        label="Building"
                        selectedKeys={[buildingId]}
                        labelPlacement="outside"
                        onChange={handleBuildingChange}
                        placeholder="Select a building">
                        {buildings.map((building: any) => (
                            <SelectItem key={building.buildingId} value={building.buildingId}>
                                {building.name}
                            </SelectItem>
                        ))}
                    </Select>

                    {
                        locations.length > 0 ? (
                            <div className={"block flex-grow"}>
                                <Button
                                    className={primaryButton({color: "yellow"})}
                                    onClick={handleLocationSelection}>
                                    Select Locations
                                </Button>
                            </div>
                        ) : null
                    }
                </div>

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
                    label="Floor"
                    placeholder="Enter the floor of the building"
                    value={floor.toString()}
                    onValueChange={(value) => setFloor(Number(value))}

                />

                <Input
                    label="Room Number"
                    placeholder="Enter the room number of the building"
                    value={roomNumber}
                    onValueChange={setRoomNumber}
                />

                <Button type="submit" className={primaryButton({color: "yellow"})}>
                    {props.buildingLocation ? "Edit" : "Add"}
                </Button>

            </form>

            <LocationSelectionModel locations={locations} isOpen={isOpen} onOpenChange={onOpenChange}
                                    selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations}/>

        </div>
    );
};
export default LocationForm;

