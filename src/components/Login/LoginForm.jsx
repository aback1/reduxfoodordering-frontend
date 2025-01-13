import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  setCurrentUser,
  setUsers,
} from "../../features/auth/authSlice.js";
import { useGetUsers, useRegisterUser } from "../../api/authApi.js";
import backgroundImage from "../../assets/background.jpg"; // Import the image

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [test, setTest] = useState(null);
  const { mutate: registerUser } = useRegisterUser();
  const { data: usersData, error, isLoading } = useGetUsers();
  const dispatch = useDispatch();
  const newUserID = uuidv4();

  useEffect(() => {
    if (usersData) {
      dispatch(setUsers(usersData));
      setTest(usersData);
    }
  }, [usersData, dispatch]);

  const users = useSelector((state) => state.auth.users || []);

  const userExists = users.find(
    (user) => user.name.toLowerCase() === userName.toLowerCase(),
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!users || !Array.isArray(users)) {
      console.error("Users data is not available.");
      alert("Error loading user data. Please try again later.");
      return;
    }

    const user = test.find(
      (u) => u.name.toLowerCase() === userName.toLowerCase(),
    );

    if (user) {
      const response = await fetch("http://127.0.0.1:8000/api/verifyPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        dispatch(
          login({
            name: userName,
            password: password,
            isLoggedIn: true,
          }),
        );
        dispatch(setCurrentUser(user.id));
      } else {
        alert("Invalid password");
      }
    } else {
      alert("User not found");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (userExists) {
      alert("User already exists");
    } else {
      const newUser = {
        id: newUserID,
        name: userName,
        password: password,
      };

      try {
        await registerUser(newUser);
        dispatch(setCurrentUser(newUserID));
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Failed to register user. Please try again.");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
      }}
    >
      <div className="bg-orange-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded text-gray-800"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded text-gray-800"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 mb-4"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
