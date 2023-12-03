import React from "react";
// Columns for Location data with reference to Building
const columns = [
    {name: "ID", id: "locationId", sortable: true},
    {name: "Building Name", id: "building.name", sortable: true},
    {name: "Location Name", id: "name", sortable: true},
    {name: "Floor", id: "floor", sortable: true},
    {name: "Room Number", id: "roomNumber", sortable: true},
    {name: "ACTIONS", id: "actions"},
];



const INITIAL_VISIBLE_COLUMNS = ["name", "building.name", "floor", "roomNumber", "actions"];

const colors = [
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
];

export {columns, colors, INITIAL_VISIBLE_COLUMNS};
