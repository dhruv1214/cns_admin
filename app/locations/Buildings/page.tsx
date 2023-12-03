'use client';
import React from "react";
import BuildingsTable from "@/components/Buildings/BuildingsTable";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/react";


export default function BuildingsPage() {
    return (
        <div>
            <title>Buildings</title>
            <div className="container mx-auto">
                <div className="flex flex-row justify-between mb-4">
                    <Button
                        className="hidden sm:flex"
                        color="primary"
                        variant="bordered"
                        onClick={() => {
                            window.location.href = "/locations"
                        }}>
                        <ChevronIcon/>
                    </Button>

                    <h1 className="text-3xl font-bold">Buildings</h1>

                </div>
                <BuildingsTable/>
            </div>
        </div>
    );
}