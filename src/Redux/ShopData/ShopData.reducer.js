import { add, del, edit } from "./ShopData.util";

const INITIAL_STATE = {
  shops: []
};

const ShopDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_SHOP":
      return {
        ...state,
        shops: add(state.shops, action.payload)
      };
    case "DEL_SHOP":
      return {
        ...state,
        shops: del(state.shops, action.payload)
      };
    case "EDIT_SHOP":
      return {
        ...state,
        shops: edit(state.shops, action.payload)
      };
    default:
      return state;
  }
};

export default ShopDataReducer;
