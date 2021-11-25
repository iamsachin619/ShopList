export const add = (arrOfShops, ShopToAdd) => {
  arrOfShops.push(ShopToAdd);
  return arrOfShops;
};

export const del = (arrOfShops, ShopToDel) => {
  // const index = arrOfShops.indexOf(ShopToDel);
  // const arr = arrOfShops.splice(index, 1);
  // return arr;
  return arrOfShops.filter(
    (Shop) =>
      Shop.name !== ShopToDel.name &&
      Shop.category !== ShopToDel.category &&
      Shop.area !== ShopToDel.area
  );
};

export const edit = (arrOfShops, { currentShopData, newData }) => {
  const index = arrOfShops.indexOf(currentShopData);
  console.log(index);
  const newArr = [...arrOfShops];
  newArr[index] = newData;

  return newArr;
};
