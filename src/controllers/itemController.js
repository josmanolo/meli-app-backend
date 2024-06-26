import { createApiError } from "../helpers/apiHelpers.js";
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

    const [item, description] = await Promise.all([itemPromise, descriptionPromise]);

    if (item.error) {
      const err = createApiError(item, "item");
      return next(err);
    }
    if (description.error) {
      const err = createApiError(description, "description");
      return next(err);
    }

    const category = await fetchCategory(item.category_id);

    if (category.error) {
      const err = createApiError(category, "category");
      return next(err);
    }

    const formattedItem = formatItemDetails(item, description, category);
    res.json(formattedItem);
  } catch (error) {
    next(error);
  }
};

export { searchItems, getItemDetails };
