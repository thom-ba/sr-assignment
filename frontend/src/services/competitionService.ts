import { Competition } from "../types";
import api from "./api";

export const saveCompetition = async (competition: {
    name: string;
    sportId: number;
    categoryId: number;
    year: string;
}): Promise<Competition> => {

    console.log("Trying to save: ", competition);

    try {
        const response = await api.post("/competition/create", { competition });
        return response.data;
    } catch (error) {
        console.error("Error saving competition: ", error);
        throw error;
    }
}
