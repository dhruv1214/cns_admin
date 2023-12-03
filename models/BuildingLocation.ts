
class BuildingLocation {

    locationId?: string;
    buildingId: string;
    name: string;
    description: string;
    floor: number;
    roomNumber: string;
    connectedLocations: string;

    constructor(buildingId: string, name: string, description: string, floor: number, roomNumber: string, connectedLocations: string){
        this.buildingId = buildingId;
        this.name = name;
        this.description = description;
        this.floor = floor;
        this.roomNumber = roomNumber;
        this.connectedLocations = connectedLocations;
    }
}