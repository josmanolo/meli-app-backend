import { getCategoryNames } from "../services/meliService.js";

const author = { name: "Josue", lastname: "Lopez" };

const formatItem = (item, categoryIds, categoryCount) => {
  const {
    category_id,
    id,
    title,
    currency_id,
    price,
    thumbnail,
    condition,
    shipping,
  } = item;

  categoryIds.add(category_id);
  categoryCount[category_id] = (categoryCount[category_id] || 0) + 1;

  const freeShipping = shipping ? shipping.free_shipping : false;

  return {
    id,
    title,
    price: formatPrice(currency_id, price),
    picture: thumbnail,
    condition,
    free_shipping: freeShipping,
  };
};

const getMostFrequentCategoryId = (categoryCount) => {
  return Object.keys(categoryCount).reduce((a, b) =>
    categoryCount[a] > categoryCount[b] ? a : b
  );
};

const getMostFrequentCategoryName = (categoryId, categoriesInfo) => {
  const category = categoriesInfo.find(
    (category) => category.id === categoryId
  );
  return category ? category.name : "";
};

const formatPrice = (currency_id, price) => ({
  currency: currency_id,
  amount: Math.floor(price),
  decimals: parseFloat((price % 1).toFixed(2)),
});

const formatSearchResults = async (data) => {
  let categoryCount = {};
  let categoryIds = new Set();
  const items = data.results.map((item) =>
    formatItem(item, categoryIds, categoryCount)
  );

  const categoriesInfo = await getCategoryNames(Array.from(categoryIds));
  const mostFrequentCategoryId = getMostFrequentCategoryId(categoryCount);
  const mostFrequentCategory = getMostFrequentCategoryName(
    mostFrequentCategoryId,
    categoriesInfo
  );

  return {
    author,
    mostFrequentCategory,
    categories: categoriesInfo.map((category) => category.name),
    items,
  };
};

const formatItemDetails = (itemData, itemDescription, category) => {
  const {
    id,
    title,
    currency_id,
    price,
    pictures,
    condition,
    shipping,
    sold_quantity,
  } = itemData;

  console.log(itemData)

  const description =
    itemDescription && itemDescription.plain_text
      ? itemDescription.plain_text
      : "El producto no cuenta con descripción";
  const picture = pictures && pictures.length > 0 ? pictures[0].url : undefined;
  const freeShipping = shipping ? shipping.free_shipping : false;
  const categories_path = category.path_from_root.map(category => category.name);

  const item = {
    id,
    title,
    price: formatPrice(currency_id, price),
    picture,
    condition,
    free_shipping: freeShipping,
    sold_quantity,
    description,
    categories_path,
  };

  return {
    author,
    item,
  };
};

export { formatSearchResults, formatItemDetails };
