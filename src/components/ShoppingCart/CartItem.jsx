import MenuIcon from "../Menu/MenuIcon.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../../features/cart/cartSlice.js";

export default function CartItem({ item }) {
  const { title, name, price, amount } = item;
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(setAmount({ name, amount: amount + 1 }));
  }

  function handleDecrement() {
    dispatch(setAmount({ name, amount: amount - 1 }));
  }

  return (
    <div className="cartItem flex justify-between items-center p-4 border-b border-gray-300">
      <span className="flex flex-col">
        <p className="text-lg font-semibold text-gray-800">{name}</p>
        <p className="text-lg font-semibold text-gray-800">
          ${(price * amount).toFixed(2)}
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded-lg"
            onClick={handleDecrement}
          >
            -
          </button>
          <span className="text-lg">{amount}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded-lg"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </span>
      <MenuIcon title={title} name={name} />
    </div>
  );
}
