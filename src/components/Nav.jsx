import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { Home, Plus, UtensilsCrossed } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center justify-center md:justify-start gap-x-4 md:gap-x-20 w-full p-3">
      <Link to="/" className="flex items-center gap-x-3">
        <h1 className="text-2xl md:text-4xl font-bold italic text-gradient">
          supa recipe
        </h1>
        <UtensilsCrossed
          size={25}
          strokeWidth={3}
          className="hidden md:block"
        />
      </Link>
      <div className="flex items-center gap-x-3">
        <Link to="/">
          <Button
            className={twMerge(
              "flex items-center gap-x-2 rounded-md",
              pathname === "/" && "bg-black text-white"
            )}
          >
            <p>Home</p>
            <Home size={18} />
          </Button>
        </Link>
        <Link to="/create">
          <Button
            className={twMerge(
              "flex items-center gap-x-2 rounded-md",
              pathname === "/create" && "bg-black text-white"
            )}
          >
            <p>Create</p>
            <Plus size={18} />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
