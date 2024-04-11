import axios from "axios";
import { formatSearchResults } from "../helpers/formatHelpers.js";
import axiosInstace from "./apiConfig.js";

const searchMeliItems = async (query) => {
  const url = `/sites/MLA/search?q=${query}`;
  const response = await axiosInstace.get(url);

  return formatSearchResults(response.data);
};

const fetchItem = async (id) => {
  const url = `/items/${id}`;
  const response = await axios.get(url);

  return response.data;
};

const fetchDescription = async (id) => {
  const url = `/items/${id}/description`;
  const response = await axios.get(url);

  return response.data;
};

export { searchMeliItems, fetchItem, fetchDescription };
