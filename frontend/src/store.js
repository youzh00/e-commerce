import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducer,
  productsListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products: productsListReducer,
  product: productDetailReducer,
  cart: cartReducer,
});
const localStorageCartItem = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  cart: { cartItems: localStorageCartItem },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
