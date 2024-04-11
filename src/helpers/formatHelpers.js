const formatSearchResults = (data) => {
  let categories = [];
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

    if (!categories.includes(category_id)) {
      categories.push(category_id);
    }

    return {
      id: id,
      title: title,
      price: {
        currency: currency_id,
        amount: Math.floor(price),
        decimals: parseFloat((price % 1).toFixed(2)),
      },
      picture: thumbnail,
      condition: condition,
      free_shipping: shipping.free_shipping,
    };
  });

  return {
    author: { name: "Josue", lastname: "Lopez" },
    categories,
    items,
  };
};

export { formatSearchResults };
