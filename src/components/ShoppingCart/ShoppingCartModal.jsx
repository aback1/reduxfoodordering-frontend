import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import {
  setShowOrderScreen,
  setShowShoppingCart,
} from "../../features/auth/authSlice.js";

export default function ShoppingCartModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const showShoppingCart = useSelector((state) => state.auth.showShoppingCart);

  const confirmOrder = () => {
    dispatch(setShowShoppingCart(false));
    dispatch(setShowOrderScreen(true));
    navigate("/order");
  };

  const handleShowShoppingCart = () => {
    dispatch(setShowShoppingCart(false));
  };

  const totalCartValue = cartItems
    .reduce((sum, currentCartItem) => {
      return sum + currentCartItem.price * currentCartItem.amount;
    }, 0)
    .toFixed(2);

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-64 bg-orange-500 p-4 rounded-l-lg border-l-2 border-gray-500 shadow-lg overflow-y-auto md:w-72 lg:w-80 transition-transform transform ${
        showShoppingCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Your food 🥞😊</h2>
        <button
          type="button"
          className="text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleShowShoppingCart}
        >
          Close Shopping Cart
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">
          Total: {totalCartValue}
        </h1>
      </div>
      {showShoppingCart &&
        cartItems.map((item) => <CartItem key={item.id} item={item} />)}
      {cartItems && (
        <button
          type="button"
          className="mt-5 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
          onClick={confirmOrder}
        >
          Confirm Order
        </button>
      )}
    </aside>
  );
}
