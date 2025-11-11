import { AppEvent } from "../types";
import api from "./api";

export const saveEvent = async (event: {
    competition_id: number;
    event_type_id: number;
    home_team_id: number;
    away_team_id: number;
    venue_id: number;
    eventDateTime: string;
    name: string;
    description: string;
}): Promise<AppEvent> => {
    console.log("Trying to save event: ", event);

    try {
        const response = await api.post("/event/create", event);
        return response.data;
    } catch (error) {
        console.error("Error saving event: ", error);
        throw error;
    }
}

export const getEvents = async (): Promise<AppEvent[]> => {
    console.log("Trying to get events.");

    try {
        const response = await api.get("/event/");
        return response.data;
    } catch (error) {
        console.error("Error retrieving events: ", error);
        throw error;
    }
}
