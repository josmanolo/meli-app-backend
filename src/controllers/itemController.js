import { formatItemDetails } from "../helpers/formatHelpers.js";
import {
  fetchDescription,
  fetchItem,
  searchMeliItems,
} from "../services/meliService.js";

const searchItems = async (req, res, next) => {
  const { q: query, limit } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search parameter is required" });
  }

  try {
    const items = await searchMeliItems(query, limit);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const getItemDetails = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  try {
    
    const item = await fetchItem(id);
    const description = await fetchDescription(id);
    const formattedItem = formatItemDetails(item, description);

    res.json(formattedItem);
  } catch (error) {
    next(error);
  }
};

export { searchItems, getItemDetails };
