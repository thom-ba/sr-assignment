import { Sport } from "../types";
import api from "./api";

export const saveSport = async (name: string): Promise<Sport> => {
    try {
        const response = await api.post("/sport/create", {name});
        return response.data;
    } catch (error) {
        console.error("Error saving sport: ", error);
        throw error;
    }
};
