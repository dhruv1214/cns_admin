'use client';
import {Spinner} from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <Spinner label="Loading..." color="secondary" labelColor="secondary"/>
            </div>
        </div>
    );
}