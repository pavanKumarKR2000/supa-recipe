import PropTypes from "prop-types";
import { Star, Pencil, Trash2 } from "lucide-react";
import Button from "./Button";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseConfig";
import { toast } from "react-toastify";

const RecipeCard = ({ recipe, setDeleted }) => {
  useEffect(() => {}, []);

  const ratingArr = useMemo(() => {
    let arr = [];

    for (let i = 1; i <= recipe.rating; i++) {
      arr.push(<Star key={i} size={20} fill="yellow" />);
    }

    return arr;
  }, [recipe.rating]);

  const handleDelete = async () => {
    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", recipe.id);

    if (error) {
      console.log(error);
    } else {
      toast.success("Recipe deleted successfully");
      setDeleted((prev) => !prev);
    }
  };

  return (
    <div className="p-4 bg-white flex flex-col gap-y-3 shadow-md rounded-md border-l-[5px] border-black">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <div className="flex items-center gap-x-1">{ratingArr}</div>

      <p>{recipe.method}</p>
      <div className="flex items-center justify-end gap-x-2">
        <Link to={`/update/${recipe.id}`}>
          <Button className="bg-orange-500 hover:bg-orange-400 transition rounded-md p-2">
            <Pencil size={18} />
          </Button>
        </Link>
        <Button
          className="bg-red-500 hover:bg-red-400 transition rounded-md p-2"
          onClick={handleDelete}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  setDeleted: PropTypes.func,
};

export default RecipeCard;
