import { formatSearchResults } from "../helpers/formatHelpers.js";
import axiosInstance from "./apiConfig.js";

const meliApiRequest = async (endpoint) => {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

const searchMeliItems = async (query) => {
    const data = await meliApiRequest(`/sites/MLA/search?q=${query}`);
    return formatSearchResults(data);
};

const fetchItem = async (id) => {
    return await meliApiRequest(`/items/${id}`);
};

const fetchDescription = async (id) => {
    return await meliApiRequest(`/items/${id}/description`);
};

export { searchMeliItems, fetchItem, fetchDescription };
