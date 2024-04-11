import { searchMeliItems } from "../services/meliService.js";

const searchItems = async (req, res, next) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const items = await searchMeliItems(query);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export { searchItems };
