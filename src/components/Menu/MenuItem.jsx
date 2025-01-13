import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice.js";
import { setShowShoppingCart } from "../../features/auth/authSlice.js";
import MenuIcon from "./MenuIcon.jsx";
import { useState } from "react";

export default function MenuItem({ id, name, price, title }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const handleAddCart = () => {
    const newItem = {
      title,
      name,
      amount: quantity,
      price,
    };

    dispatch(addItem(newItem));
    dispatch(setShowShoppingCart(true));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 flex items-start">
      <MenuIcon title={title} name={name} />
      <div className="ml-4 flex-1">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{title}</p>
        <p className="text-gray-800">${price.toFixed(2)}</p>
        <button
          type="button"
          onClick={handleAddCart}
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-2"
        >
          Add to Cart
        </button>
        <div className="flex items-center space-x-2 mt-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded-lg"
            onClick={decrement}
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded-lg"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
