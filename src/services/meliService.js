import { fetchWithCache } from "../helpers/apiHelpers.js";
import { formatSearchResults } from "../helpers/formatHelpers.js";
import axiosInstance from "./apiConfig.js";
import NodeCache from "node-cache";

const categoryCache = new NodeCache({ stdTTL: 86400, checkperiod: 43200 }); //86400segs (24hrs) - 43200segs (12hrs)
const sellerCache = new NodeCache({ stdTTL: 86400, checkperiod: 43200 }); //86400segs (24hrs) - 43200segs (12hrs)

const meliApiRequest = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.error,
      message: error.response?.data?.message || "Unknown error",
      status: error.response?.status || 500,
    };
  }
};

const searchMeliItems = async (query, limit = 4) => {
  const response = await meliApiRequest(
    `/sites/MLA/search?q=${query}&limit=${limit}`
  );

  return formatSearchResults(response);
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
  return fetchWithCache(
    categoryIds,
    categoryCache,
    (id) => axiosInstance.get(`/categories/${id}`).then((res) => res.data),
    (category) => category.id,
    (category) => ({ id: category.id, name: category.name })
  );
};

const getSellerInfo = async (sellerIds) => {
  return fetchWithCache(
    sellerIds,
    sellerCache,
    (id) => axiosInstance.get(`/users/${id}`).then((res) => res.data),
    (seller) => seller.id,
    (seller) => ({ id: seller.id, city: seller.address.city })
  );
};

export {
  searchMeliItems,
  fetchItem,
  fetchDescription,
  getCategoryNames,
  fetchCategory,
  getSellerInfo,
};
