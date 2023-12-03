import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {PlusIcon} from "@/components/icons";

export default function AddButton() {


    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className="bg-foreground text-background"
                    endContent={<PlusIcon/>}>
                    Add New
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="building" href="/locations/Buildings/add">Building</DropdownItem>
                <DropdownItem key="location" href="/locations/add">Location</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
