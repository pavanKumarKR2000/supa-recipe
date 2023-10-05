import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { Home, Plus } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-x-20 w-full p-2">
      <Link to="/">
        <h1 className="text-4xl font-bold">supa recipe</h1>
      </Link>
      <div className="flex items-center gap-x-3">
        <Link to="/">
          <Button
            className={twMerge(
              "flex items-center gap-x-2 rounded-md",
              pathname === "/" && "bg-blue-300"
            )}
          >
            <p>Home</p>
            <Home size={18} />
          </Button>
        </Link>
        <Link to="/create">
          <Button
            className={`flex items-center gap-x-2 rounded-md ${
              pathname === "/create" && "bg-blue-300"
            }`}
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
