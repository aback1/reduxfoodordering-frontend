import LogoutButton from "./LogoutButton";
import Logo from "./Logo";
import Greeter from "./Greeter.jsx";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-orange-700 p-4 text-white shadow-md">
      <div className="flex items-center">
        <Logo />
        <p className="ml-40 mr-40 text-4xl font-semibold">
          Your Redux Symfony Food Delivery 🍕🍗
        </p>
        <div className="mr-40">
          <Greeter />
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
