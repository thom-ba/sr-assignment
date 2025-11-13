import { Category } from "../types";
import api from "./api";


export const getCategories = async (): Promise<Category[]> => {
    console.log("Trying to get categories");

    try {
        const response = await api.get("categories/");
        return response.data;
    } catch (error) {
        console.error("Error retrieving categories: ", error);
        throw error;
    }
}

export const saveCategory = async (name: string): Promise<Category> => {
    console.log("Debug: ", name);

    try {
        const response = await api.post("categories/create", { name });
        return response.data;
    } catch (error) {
        console.error("Error saving category: ", error);
        throw error;
    }
}