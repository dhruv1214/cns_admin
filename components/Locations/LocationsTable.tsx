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
import {columns, colors, INITIAL_VISIBLE_COLUMNS} from "./LocationsTableData";
import {capitalize} from "../TableUtils";
import {VerticalDotsIcon, ChevronDownIcon, SearchIcon} from "@/components/icons";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import AddButton from "@/components/AddButton";
import {Link} from "@nextui-org/link";
import useGetLocations from "@/hooks/locations/useGetLocations";
import Loading from "@/components/loading";
import useGetBuildings from "@/hooks/buildings/useGetBuildings";
import useDeleteLocation from "@/hooks/locations/userDeleteLocation";

export default function LocationsTable() {

    const {locations, isLoading, error} = useGetLocations();
    const {buildings} = useGetBuildings();
    const {deleteLocation, isLoading: deleteLoading, error: deleteError} = useDeleteLocation();

    type Location = typeof locations[0];

    /** State **/
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(locations.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.id));
    }, [visibleColumns]);

    const statusColorMap: Record<string, ChipProps["color"]> = buildings.reduce(
        (acc, building: any, index) => ({
            ...acc,
            [building.name]: colors[index % colors.length],
        }),
        {},
    );

    const filteredItems = React.useMemo(() => {
        let filteredLocations = [...locations];

        if (hasSearchFilter) {
            filteredLocations = filteredLocations.filter((location: any) =>
                location.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all") {
            filteredLocations = filteredLocations.filter((location: any) =>
                statusFilter.has(location.building.name)
            );
        }

        return filteredLocations;
    }, [filterValue, statusFilter, hasSearchFilter, locations]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Location, b: Location) => {
            const first = a[sortDescriptor.column as keyof Location] as number;
            const second = b[sortDescriptor.column as keyof Location] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [items, sortDescriptor.column, sortDescriptor.direction]);

    /** End State **/

    /*** Callbacks ***/
    const renderCell = React.useCallback((location: any, columnKey: any) => {
        let cellValue;


        if (columnKey.includes('.')) {
            const keys = columnKey.split('.');
            cellValue = location[keys[0]][keys[1]];
        } else {
            cellValue = location[columnKey];
        }

        switch (columnKey) {
            case "locationId":
                return (
                    <div className="flex flex-col">
                        <p className="text-small text-default-300">{cellValue.split("-")[0]}...</p>
                    </div>
                );
            case "building.name":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[location.building.name]}
                        size="sm"
                        variant="dot">
                        {cellValue}
                    </Chip>
                );
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "roomNumber":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "floor":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div>
                        <div className="hidden relative md:flex items-center gap-2">
                            <Tooltip content="Edit">
                                <Link className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                      href={`/locations/${location.locationId}/edit`}>
                                    <EditIcon/>
                                </Link>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete">
                                <Button className="text-lg text-danger btn btn-danger cursor-pointer active:opacity-50"
                                        onClick={() => onClickDelete(location.locationId)}>
                                    <DeleteIcon/>
                                </Button>
                            </Tooltip>
                        </div>
                        <div className="relative flex md:hidden justify-end items-center gap-2">
                            <Dropdown className="bg-background border-1 border-default-200">
                                <DropdownTrigger>
                                    <Button isIconOnly radius="full" size="sm" variant="light">
                                        <VerticalDotsIcon className="text-default-400"/>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem>Edit</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [statusColorMap]);


    const onClickDelete = React.useCallback(async (locationId: string) => {
        console.log(locationId);
        await deleteLocation(locationId);
    }, []);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, [setRowsPerPage, setPage]);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, [setFilterValue, setPage]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-center">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by location name..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300"/>}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Link
                            className="hidden sm:flex"
                            color="secondary"
                            href="locations/Buildings">
                            Buildings
                        </Link>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small"/>}
                                    variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}>
                                {buildings.map((building: any) => (
                                    <DropdownItem key={building.locationId} className="capitalize">
                                        {capitalize(building.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small"/>}
                                    variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}>
                                {columns.map((column) => (
                                    <DropdownItem key={column.id} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <AddButton/>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {34} locations</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, onSearchChange, setFilterValue, setStatusFilter, setVisibleColumns]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${items.length} selected`}
        </span>
            </div>
        );
    }, [selectedKeys, items.length, page, hasSearchFilter, setPage]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "overflow-y-auto"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );


    if (isLoading || deleteLoading) return (<Loading/>);

    if (error) return (<div>{error.message}</div>);

    if (deleteError) return (<div>{deleteError.message}</div>);

    return (
        <Table
            aria-label="Locations Table"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}>
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.id}
                        align={column.id === "actions" ? "end" : "start"}
                        allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No locations found"} items={sortedItems}>
                {(item: any) => (
                    <TableRow key={item.name}>
                        {(columnKey) => {
                            return (<TableCell>{renderCell(item, columnKey)}</TableCell>)
                        }}
                    </TableRow>
                )
                }
            </TableBody>
        </Table>
    );
}
