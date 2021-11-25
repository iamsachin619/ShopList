import { combineReducers } from "redux";

import ShopDataReducer from "./ShopData/ShopData.reducer";
export default combineReducers({
  shopData: ShopDataReducer
});
