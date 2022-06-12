import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import "./index.css";
import { HomeScreen } from "./Screens/HomeScreen";
import { ProductScreen } from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PayementScreen from "./Screens/PayementScreen";
import UsersListScreen from "./Screens/UsersListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductsListScreen from "./Screens/ProductsListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrdersListScreen from "./Screens/OrdersListScreen";
import { PlaceOrderScreen } from "./Screens/PlaceOrderScreen";
import { OrderScreen } from "./Screens/OrderScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/search/:keyword" element={<HomeScreen />} />
              <Route exact path="/page/:pageNumber" element={<HomeScreen />} />
              <Route
                exact
                path="/search/:keyword/page/:pageNumber"
                element={<HomeScreen />}
              />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/cart/" element={<CartScreen />} />
              <Route path="/login/" element={<LoginScreen />} />
              <Route path="/register/" element={<RegisterScreen />} />
              <Route path="/profile/" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PayementScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/admin/userslist" element={<UsersListScreen />} />
              <Route
                path="/admin/productslist"
                element={<ProductsListScreen />}
              />
              <Route
                path="/admin/productslist/:pageNumber"
                element={<ProductsListScreen />}
              />
              <Route
                path="/admin/users/:id/edit"
                element={<UserEditScreen />}
              />
              <Route
                path="/admin/products/:id/edit"
                element={<ProductEditScreen />}
              />
              <Route path="/admin/orderslist" element={<OrdersListScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
