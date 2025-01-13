import { useSelector } from "react-redux";
import OrderedItem from "./OrderedItem.jsx";
export default function OrderConfirmation() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <div>
        <h1>Your order:</h1>
        {cartItems.map((item) => (
          <OrderedItem key={item.id} item={item} />
        ))}
        <h2>will be delivered to you immediately</h2>
      </div>
    </>
  );
}
