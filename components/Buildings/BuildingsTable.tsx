import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Tooltip, Spinner,
} from "@nextui-org/react";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {Link} from "@nextui-org/link";
import useGetBuildings from "@/hooks/buildings/useGetBuildings";
import {useRouter} from "next/navigation";
import Loading from "@/components/loading";
import useDeleteBuilding from "@/hooks/buildings/userDeleteBuilding";

const columns = [
    {key: 'name', label: 'Name'},
    {key: 'description', label: 'Description'},
    {key: 'Action', label: 'Action'}
]

export default function BuildingsTable() {
    const { buildings, isLoading, error } = useGetBuildings();
    const {deleteBuilding, isLoading: deleteLoading, error: deleteError} = useDeleteBuilding();


    const renderCell = (item: any, column: any) => {
        const cellValue = item[column.key];

        const id = getKeyValue(item, 'buildingId');

        switch (column.key) {
            case 'Action':
                return (
                    <TableCell key={column.key} align="center">
                        <div className="relative flex items-center gap-2">
                            <Tooltip content="Edit user">
                                <Link className="text-lg text-default-400 cursor-pointer active:opacity-50" href={`Buildings/${id}`}>
                                    <EditIcon/>
                                </Link>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteBuilding(id)}>
                                <DeleteIcon/>
                              </span>
                            </Tooltip>
                        </div>
                    </TableCell>
                );
            default:
                return (
                    <TableCell key={column.key} align="center">
                        {cellValue}
                    </TableCell>
                );
        }

    }

    if (isLoading || deleteLoading) {
        return (<Loading />);
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (deleteError) {
        return <div>Error: {deleteError.message}</div>
    }

    return (
        <Table aria-label="Buildings table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={buildings}>
                {(item: any) => (
                    <TableRow key={item._id}>
                        {columns.map((column) => renderCell(item, column))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
