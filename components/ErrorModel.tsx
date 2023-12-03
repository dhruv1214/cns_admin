import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import React from "react";

export default function ErrorModel({error, isOpen, onOpenChange}: { error: any, isOpen: boolean, onOpenChange: any }) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col text-red-500">Error</ModalHeader>
                            <ModalBody>
                                <span>An error occurred while processing your request.</span>
                                <span className={"text-red-500"}>
                                    Stack Trace:
                                </span>

                                <span>{error?.toString()}</span>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} color="danger">
                                    Close
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}