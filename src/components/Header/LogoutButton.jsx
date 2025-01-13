import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { clearCart } from "../../features/cart/cartSlice.js";
import { Navigate, useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn || false);

  function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  }

  return isLoggedIn ? (
    <button
      className="bg-green-400 text-white p-2 rounded hover:bg-green-200"
      onClick={handleLogout}
    >
      Logout
    </button>
  ) : null;
}
