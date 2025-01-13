import MenuIcon from "../Menu/MenuIcon.jsx";
import { useDispatch } from "react-redux";
import {
  setSelectedFoodOption,
  setShowFoodSelection,
} from "../../features/auth/authSlice.js";

const foodTypes = [
  {
    type: "Pizza",
    items: [
      "Pizza Margherita",
      "Pizza Prosciuotto",
      "Pizza Funghi",
      "Pizza Salamino",
      "Pizza Spinaci",
    ],
  },
  {
    type: "Burger",
    items: [
      "Cheese Burger",
      "Veggie Burger",
      "Bacon Burger",
      "Double Patty Burger",
      "Chicken Burger",
    ],
  },
  {
    type: "Steak",
    items: [
      "Ribeye Steak",
      "Sirloin Steak",
      "Tbone Steak",
      "Flank Steak",
      "Tomahawk Steak",
    ],
  },
  {
    type: "Salad",
    items: [
      "Caesars Salad",
      "Greek Salad",
      "Caprese Salad",
      "Coleslaw",
      "Green Salad",
    ],
  },
];

export default function FoodSelection() {
  const dispatch = useDispatch();

  const handleSetFoodType = (foodType) => {
    dispatch(setSelectedFoodOption(foodType));
    dispatch(setShowFoodSelection(false));
  };

  return (
    <div className="p-4">
      {foodTypes.map((foodType) => (
        <div
          key={foodType.type}
          className="mb-8"
          onClick={() => handleSetFoodType(foodType.type)}
        >
          <h2 className="text-2xl font-bold mb-4">{foodType.type}s</h2>
          <div className="flex items-center space-x-4">
            {foodType.items.map((item) => (
              <MenuIcon key={item} title={foodType.type} name={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
