import { Team } from "../types";
import api from "./api";

export const saveTeam = async (name: string, countryCode: string): Promise<Team> => {
    try {
        const response = await api.post("/team/create", {name, countryCode});
        return response.data;
    } catch (error) {
        console.error("Error saving team: ", error);
        throw error;
    }
};

export const getTeams = async(): Promise<Team[]> => {
    try {
        const response = await api.get("/team/")
        return response.data;
    } catch (error) {
        console.error("Error retrieving teams: ", error);
        throw error;
    }
};
