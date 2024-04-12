import { formatItemDetails } from "../helpers/formatHelpers.js";
import {
  fetchDescription,
  fetchItem,
  searchMeliItems,
} from "../services/meliService.js";

const searchItems = async (req, res, next) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const items = await searchMeliItems(query);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const getItemDetails = async (req, res, next) => {
  const { id } = req.params;

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
