import { Plus, ShieldAlert, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import supabase from "../config/supabaseConfig";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState(-1);
  const [ingredients, setIngredients] = useState("");
  const [showRatingError, setShowRatingError] = useState(false);
  const [supabaseError, setSupabaseError] = useState(false);

  const ratingArr = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);

  const handleClick = (index) => {
    setRating((prev) => {
      if (prev === index) {
        return -1;
      }
      setShowRatingError(false);
      return index;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === -1) {
      setShowRatingError(true);
    } else {
      setRating(rating + 1);

      const { error } = await supabase
        .from("recipes")
        .insert([{ title, method, rating, ingredients }])
        .select();

      if (error) {
        setSupabaseError(true);
        console.log(error);
      } else {
        toast.success("Recipe created  successfully");
        setSupabaseError(false);
        setTitle("");
        setMethod("");
        setRating(-1);
        setIngredients("");
      }
    }
  };

  return (
    <div className="h-[120vh] md:h-[90vh] w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[95%] lg:w-[50%] xl:w-[35%] bg-white shadow-md flex flex-col gap-y-2 px-6 py-12 rounded-md"
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          className="p-2 outline-none border border-gray-300 focus:border-black  rounded-md"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="ingridents">
          Ingredients (Enter ingridents seperated by comma)
        </label>
        <input
          id="ingredients"
          type="text"
          placeholder="Enter ingredients"
          className="p-2 outline-none border border-gray-300 focus:border-black rounded-md"
          required
          onChange={(e) => setIngredients(e.target.value)}
          value={ingredients}
        />
        <label htmlFor="method">Instructions</label>
        <textarea
          id="method"
          cols="30"
          rows="10"
          placeholder="Enter instructions"
          className="p-2 border border-gray-300 outline-none focus:border-black rounded-md"
          required
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        />
        <label htmlFor="rating">Rating</label>
        <div
          id="rating"
          tabIndex={3}
          className="flex items-center  justify-between border border-gray-300 p-2 focus:border-black transition rounded-md bg-blue-50"
        >
          {ratingArr.map((index) => (
            <Star
              size={20}
              key={index}
              fill={index <= rating ? "yellow" : "white"}
              strokeWidth={2}
              onClick={() => handleClick(index)}
              className="cursor-pointer"
            />
          ))}
        </div>

        <Button className="bg-green-500 hover:bg-green-400 transition mt-6 flex items-center justify-center gap-x-2 rounded-md">
          <p>Create recipe</p>
          <Plus size={20} />
        </Button>
        {showRatingError && (
          <p className="bg-red-200 text-red-500 p-4 w-full flex items-center justify-center gap-x-2">
            <ShieldAlert size={20} />
            <p>Rating is required</p>
          </p>
        )}
        {supabaseError && (
          <p className="bg-red-200 text-red-500 p-4 w-full flex items-center justify-center gap-x-2">
            <ShieldAlert size={20} />
            <p>Couldnt create recipe</p>
          </p>
        )}
      </form>
    </div>
  );
};

export default Create;
