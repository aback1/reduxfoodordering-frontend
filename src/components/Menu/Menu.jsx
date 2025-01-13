import { useGetFood } from "../../api/foodApi.js";
import MenuItem from "./MenuItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartModal from "../ShoppingCart/ShoppingCartModal.jsx";
import {
  setSelectedFoodOption,
  setShowFoodSelection,
  setShowShoppingCart,
} from "../../features/auth/authSlice.js";
import FoodSelection from "../FoodSelection/FoodSelection.jsx";

export default function Menu() {
  const { data: foodData, error, isLoading } = useGetFood();
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.auth.showShoppingCart);
  const selectedFoodOption = useSelector(
    (state) => state.auth.selectedFoodOption,
  );

  const showFoodSelection = useSelector(
    (state) => state.auth.showFoodSelection,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Could not fetch food</p>;
  }

  const groupedFoodData = foodData.reduce((acc, food) => {
    if (!acc[food.type]) {
      acc[food.type] = [];
    }
    acc[food.type].push(food);
    return acc;
  }, {});

  const foodSelection = groupedFoodData[selectedFoodOption];
  console.log(foodSelection);

  function handleShowShoppingCart() {
    dispatch(setShowShoppingCart(true));
  }

  function handleShowFoodOptions() {
    dispatch(setSelectedFoodOption(null));
    dispatch(setShowFoodSelection(true));
  }

  return (
    <>
      {showFoodSelection && <FoodSelection />}
      {!showFoodSelection && (
        <>
          <button
            type="button"
            className="text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleShowFoodOptions}
          >
            Go back to Food Selection
          </button>
          <h3 className="text-2xl font-semibold mb-2">{selectedFoodOption}s</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-4">
            {foodSelection.map((food) => (
              <MenuItem
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                title={food.type}
              />
            ))}
          </div>
        </>
      )}
      {!showCart && (
        <button
          type="button"
          className="text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleShowShoppingCart}
        >
          Open ShoppingCart
        </button>
      )}
      {showCart && <ShoppingCartModal />}
    </>
  );
}
