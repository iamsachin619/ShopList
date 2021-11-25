export const addShop = (ShopData) => ({
  type: "ADD_SHOP",
  payload: ShopData
});

export const deleteShop = (ShopToDel) => ({
  type: "DEL_SHOP",
  payload: ShopToDel
});

export const editShop = (currentShopData, newData) => ({
  type: "EDIT_SHOP",
  payload: { currentShopData, newData }
});
