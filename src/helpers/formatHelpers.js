const author = { name: "Josue", lastname: "Lopez" };

const formatPrice = (currency_id, price) => ({
  currency: currency_id,
  amount: Math.floor(price),
  decimals: parseFloat((price % 1).toFixed(2)),
});

const formatSearchResults = (data) => {
  let categories = new Set();
  const items = data.results.map((item) => {
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

    categories.add(category_id);
    const freeShipping = shipping ? shipping.free_shipping : false;

    return {
      id,
      title,
      price: formatPrice(currency_id, price),
      picture: thumbnail,
      condition,
      free_shipping: freeShipping,
    };
  });

  return {
    author,
    categories: Array.from(categories),
    items,
  };
};

const formatItemDetails = (itemData, itemDescription) => {
  const { id, title, currency_id, price, pictures, condition, shipping } =
    itemData;

  const description =
    itemDescription && itemDescription.plain_text
      ? itemDescription.plain_text
      : "";
  const picture = pictures && pictures.length > 0 ? pictures[0].url : undefined;
  const freeShipping = shipping ? shipping.free_shipping : false;

  const item = {
    id,
    title,
    price: formatPrice(currency_id, price),
    picture,
    condition,
    free_shipping: freeShipping,
    description,
  };

  return {
    author,
    item,
  };
};

export { formatSearchResults, formatItemDetails };
