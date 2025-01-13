import MenuIcon from "../Menu/MenuIcon.jsx";

export default function OrderedItem({ item }) {
  const { title, name, price, amount } = item;

  return (
    <div className="cartItem flex justify-between items-center p-4 border-b border-gray-300">
      <span className="flex flex-col">
        <p className="text-lg font-semibold text-gray-800">
          {name} - {amount}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          ${(price * amount).toFixed(2)}
        </p>
        <div className="flex items-center space-x-2"></div>
      </span>
      <MenuIcon title={title} name={name} />
    </div>
  );
}
