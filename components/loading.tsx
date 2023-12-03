import {Spinner} from "@nextui-org/react";
import React from "react";

export default function Loading() {

    return (<div>
        <Spinner color="secondary" label="Loading..." labelColor="secondary"/>
    </div>)
}