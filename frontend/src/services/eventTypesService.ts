import { EventType } from "../types";
import api from "./api";

export const getEventTypes = async(): Promise<EventType[]> => {
    try {
        const response = await api.get("/event-type/");
        return response.data;
    } catch (error) {
        console.error("Error retreiving event types: ", error);
        throw error;
    }
};
