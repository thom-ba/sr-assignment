import { Category } from "../types";
import api from "./api";


export const getCategories = async (): Promise<Category[]> => {
    console.log("Trying to get categories");

    try {
        const response = await api.get("categories/")
        return response.data
    } catch (error) {
        console.error("Error retrieving competitions: ", error);
        throw error;
    }
}
