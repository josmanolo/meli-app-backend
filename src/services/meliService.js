import { formatSearchResults } from "../helpers/formatHelpers.js";
import axiosInstance from "./apiConfig.js";

const meliApiRequest = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

const searchMeliItems = async (query, limit = 4) => {
  const data = await meliApiRequest(
    `/sites/MLA/search?q=${query}&limit=${limit}`
  );
  return formatSearchResults(data);
};

const fetchItem = async (id) => {
  const response = await meliApiRequest(`/items/${id}`);
  return response;
};

const fetchDescription = async (id) => {
  const response = await meliApiRequest(`/items/${id}/description`);
  return response;
};

const fetchCategory = async (id) => {
  const response = await meliApiRequest(`/categories/${id}`);
  return response;
};

const getCategoryNames = async (categoryIds) => {
  try {
    const promises = categoryIds.map((id) =>
      axiosInstance.get(`https://api.mercadolibre.com/categories/${id}`)
    );
    const results = await Promise.all(promises);
    return results.map((res) => ({
      id: res.config.url.split("/").pop(),
      name: res.data.name,
    }));
  } catch (error) {
    console.error("Failed to fetch category names:", error);
    return [];
  }
};

export { searchMeliItems, fetchItem, fetchDescription, getCategoryNames, fetchCategory };
