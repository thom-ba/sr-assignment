import { Competition } from "../types";
import api from "./api";

export const saveCompetition = async (competition: {
    name: string;
    sport_id: number;
    category_id: number;
    year: string;
}): Promise<Competition> => {
    console.log("Trying to save: ", competition);

    try {
        const response = await api.post("/competition/create", competition);
        return response.data;
    } catch (error) {
        console.error("Error saving competition: ", error);
        throw error;
    }
};

export const getCompetitions = async (): Promise<Competition[]> => {
    console.log("Trying to get competition.");

    try {
        const response = await api.get("/competition/");
        return response.data;
    } catch (error) {
        console.error("Error retrieving competitions: ", error);
        throw error;
    }
};
