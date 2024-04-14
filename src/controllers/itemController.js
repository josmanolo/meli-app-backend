import { formatItemDetails } from "../helpers/formatHelpers.js";
import {
  fetchDescription,
  fetchItem,
  searchMeliItems,
  fetchCategory,
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

  try {
    const itemPromise = fetchItem(id);
    const descriptionPromise = fetchDescription(id);

    const item = await itemPromise;
    const categoryPromise = fetchCategory(item.category_id);

    const [description, category] = await Promise.all([
      descriptionPromise,
      categoryPromise,
    ]);

    const formattedItem = formatItemDetails(item, description, category);

    res.json(formattedItem);
  } catch (error) {
    next(error);
  }
};

export { searchItems, getItemDetails };
