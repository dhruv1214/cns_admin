import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table, TableHeader, TableBody, TableRow, TableCell, getKeyValue, TableColumn
} from "@nextui-org/react";

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'floor', label: 'Floor' },
    { key: 'roomNumber', label: 'Room Number' }
];

export default function LocationSelectionModel({locations, isOpen, onOpenChange, selectedLocations, setSelectedLocations}: {locations: any, isOpen: boolean, onOpenChange: any, selectedLocations: any, setSelectedLocations: any}) {

    return (
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <Table
                                    aria-label="Locations"
                                    color="primary"
                                    onSelectionChange={(selectedKeys) => {
                                        console.log(selectedKeys);
                                        setSelectedLocations(selectedKeys);
                                    }}
                                    selectedKeys={selectedLocations}
                                    selectionMode="multiple">
                                    <TableHeader columns={columns}>
                                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                    </TableHeader>
                                    <TableBody items={locations}>
                                        {(item: any) => (
                                            <TableRow key={item.locationId}>
                                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {
                                    onClose();
                                }}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
    );
}
