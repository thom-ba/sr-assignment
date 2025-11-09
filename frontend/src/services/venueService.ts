import { Venue } from "../types";
import api from "./api";

export const saveVenue = async (venue: {
    name: string,
    city: string,
    capacity: number,
}): Promise<Venue> => {
    console.log("Trying to save: ", venue);

    try {
        const response = await api.post("/venue")
    }
}
