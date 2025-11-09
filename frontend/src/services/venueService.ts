import { Venue } from "../types";
import api from "./api";

export const saveVenue = async (venue: {
    name: string,
    city: string,
    capacity: number,
}): Promise<Venue> => {
    console.log("Trying to save: ", venue);

    try {
        const response = await api.post("/venue/create", venue);
        return response.data
    } catch (error) {
        console.error("Error saving venue: ", error);
        throw error;
    }
}

export const getVenues = async (): Promise<Venue[]> => {
    console.log("Trying to get venues.");

    try {
        const response = await api.get("/venue/")
        return response.data
    } catch (error) {
       console.error("Erro retreiving venues: ", error);
       throw error;
    }
}
