
class EventData {
    name: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    location: string;

    constructor(name: string, description: string, startDateTime: string, endDateTime: string, location: string) {
        this.name = name;
        this.description = description;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.location = location;
    }
}

export default EventData;