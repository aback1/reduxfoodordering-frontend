import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import FoodSelection from "../components/FoodSelection/FoodSelection.jsx";
import Header from "../components/Header/Header.jsx";
import ShoppingCartModal from "../components/ShoppingCart/ShoppingCartModal.jsx";
import LoginForm from "../components/Login/LoginForm";

import { useSelector, useDispatch } from "react-redux";
import Menu from "../components/Menu/Menu.jsx";
import OrderConfirmation from "../components/Order/OrderConfirmation.jsx";

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const showOrder = useSelector((state) => state.auth.showOrderScreen);
  const itemInsideShoppingCart = useSelector(
    (state) => state.cart.shoppingCartempty,
  );
  const dispatch = useDispatch();

  return (
    <Router>
      <div>
        {isLoggedIn && <Header />}
        {isLoggedIn && itemInsideShoppingCart && <ShoppingCartModal />}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/menu" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/menu" /> : <LoginForm />}
          />
          <Route path="/menu" element={isLoggedIn ? <Menu /> : <LoginForm />} />
          <Route
            path="/order"
            element={
              showOrder ? (
                <OrderConfirmation />
              ) : isLoggedIn ? (
                <Menu />
              ) : (
                <LoginForm />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
