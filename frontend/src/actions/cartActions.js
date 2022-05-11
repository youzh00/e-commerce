import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from "../constants/cartConstants";
import axios from "axios";

//!---------------actions part ----------------//
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${id}`);
  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//getState=get all the entire state tree
