import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case REMOVE_ITEM_FROM_CART:
      return state;
    default:
      return state;
  }
};
