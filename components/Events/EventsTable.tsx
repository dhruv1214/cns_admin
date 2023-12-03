"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor, Tooltip
} from "@nextui-org/react";
import AddButton from "@/components/AddButton";
import {useDeleteEvent, useGetEvents} from "@/hooks/events/useGetEvents";
import {Link} from "@nextui-org/link";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "@/components/icons";
import {useRouter} from "next/navigation";
import Loading from "@/app/loading";


const columns = [
    {
        id: "name",
        name: "Name",
        sortable: true,
    },
    {
        id: "description",
        name: "Description",
        sortable: true,
    },
    {
        id: "startDateTime",
        name: "Start Date",
        sortable: true,
    },
    {
        id: "endDateTime",
        name: "End Date",
        sortable: true,
    },
    {
        id: "location.name",
        name: "Location",
        sortable: true,
    },
    {
        id: "actions",
        name: "Actions",
        sortable: false,
    },
];

export default function EventsTable() {
    const {events, isLoading, error} = useGetEvents();
    const router = useRouter();

    const onclickAdd = () => {
        router.push("/events/new");
    }


    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-end gap-3 items-center">
                    <div className="flex gap-3">
                        <Button
                            className="bg-foreground text-background"
                            onClick={onclickAdd}
                            endContent={<PlusIcon/>}>
                            Add New
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, []);

    if (isLoading) return (<Loading/>);

    if (error) return (<div>Error...</div>);

    if (!events) return (<div>No events found</div>);

    if (events.length === 0) return (<div>No events found</div>);

    return (
        <Table
            aria-label="Events Table"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
selectedKeys={[]}
            selectionMode="none"
            topContent={topContent}
            topContentPlacement="outside">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.id}
                        align={column.id === "actions" ? "end" : "start"}
                        allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No events found"} items={events}>
                {(item: any) => (
                    <TableRow key={item.name}>
                        {(columnKey) => {
                            return (<TableCell>{
                                columnKey === "actions" ? (
                                    <div className="flex gap-3 items-center">

                                        <div className="hidden relative md:flex items-center gap-2">
                                            <Tooltip content="Edit">
                                                <Link
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                    href={`/events/${item.eventId}/edit`}>
                                                    <EditIcon/>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ) : columnKey === "location.name" ? (
                                    <div className="flex gap-3 items-center">
                                        <div>{item.location.name} - {item.location.roomNumber}</div>
                                    </div>
                                ) : columnKey === "startDateTime" || columnKey === "endDateTime" ? (
                                    <div className="flex gap-3 items-center">
                                        <div>{item[columnKey].substring(0, 10)}</div>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 items-center">
                                        <div>{item[columnKey]}</div>
                                    </div>
                                )
                            }</TableCell>)
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>

    );
}
