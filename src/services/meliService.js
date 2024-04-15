import { formatSearchResults } from "../helpers/formatHelpers.js";
import axiosInstance from "./apiConfig.js";
import NodeCache from "node-cache";

const categoryCache = new NodeCache({ stdTTL: 86400, checkperiod: 43200 }); //86400segs (24hrs) - 43200segs (12hrs)

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
    const cachedIds = [];
    const idsToFetch = [];

    categoryIds.forEach((id) => {
      const cachedCategory = categoryCache.get(id);
      if (cachedCategory) {
        cachedIds.push(cachedCategory);
      } else {
        idsToFetch.push(id);
      }
    });

    if (idsToFetch.length === 0) {
      return cachedIds;
    }

    const promises = idsToFetch.map((id) =>
      axiosInstance.get(`https://api.mercadolibre.com/categories/${id}`)
    );
    const results = await Promise.all(promises);

    const newCategories = results.map((res) => {
      const category = {
        id: res.request.res.responseUrl.split("/").pop(),
        name: res.data.name,
      };
      categoryCache.set(category.id, category);
      return category;
    });

    return [...cachedIds, ...newCategories];
  } catch (error) {
    console.error("Failed to fetch category names:", error);
    return [];
  }
};

export {
  searchMeliItems,
  fetchItem,
  fetchDescription,
  getCategoryNames,
  fetchCategory,
};
