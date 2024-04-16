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

    if (item.error) {
      const err = new Error(item.message);
      err.status = item.status;
      err.error = item.error;

      return next(err);
    }

    const categoryPromise = fetchCategory(item.category_id);
    const [description, category] = await Promise.all([
      descriptionPromise,
      categoryPromise,
    ]);

    if (description.error) {
      const err = new Error(description.message);
      err.status = item.status;
      err.error = item.error;

      return next(err);
    }

    if (category.error) {
      const err = new Error(category.message);
      err.status = item.status;
      err.error = item.error;

      return next(err);
    }

    const formattedItem = formatItemDetails(item, description, category);
    res.json(formattedItem);
  } catch (error) {
    next(error);
  }
};

export { searchItems, getItemDetails };
