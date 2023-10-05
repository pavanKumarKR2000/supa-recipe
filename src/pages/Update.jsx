import { Pencil, ShieldAlert, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Loading from "../components/Loading";
import supabase from "../config/supabaseConfig";

const Update = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState(-1);
  const [showRatingError, setShowRatingError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef(null);
  const methodRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const ratingArr = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        console.log(error);
        navigate("/", { replace: true });
      } else {
        setIsLoading(false);
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

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
      setMethod(methodRef.current.value);
      setTitle(titleRef.current.value);
      setRating(rating + 1);
      const { error } = await supabase
        .from("recipes")
        .update([{ title, method, rating }])
        .eq("id", id);

      if (error) {
        console.log(error);
      } else {
        toast.success("Recipe Updated  successfully");

        setTitle("");
        setMethod("");
        setRating(-1);
      }
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="h-[90vh] w-full flex items-center justify-center relative">
          <form
            onSubmit={handleSubmit}
            className="w-[95%] lg:w-[50%] xl:w-[35%] bg-white shadow-md flex flex-col gap-y-2 px-6 py-12 rounded-md"
          >
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              className="p-2 outline-none border border-gray-300 focus:border-black rounded-md"
              required
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="method">Method</label>
            <textarea
              id="method"
              cols="30"
              rows="10"
              placeholder="Enter method"
              className="p-2 border border-gray-300 outline-none focus:border-black rounded-md"
              required
              ref={methodRef}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label htmlFor="rating">Rating</label>
            <div
              id="rating"
              tabIndex={3}
              className="flex items-center  justify-between border border-gray-300 p-2 focus:border-black transition rounded-md"
            >
              {ratingArr.map((index) => (
                <Star
                  size={20}
                  key={index}
                  fill={index <= rating ? "yellow" : "white"}
                  onClick={() => handleClick(index)}
                  className="cursor-pointer"
                />
              ))}
            </div>

            <Button className="bg-orange-500 hover:bg-orange-400 transition mt-6 flex items-center justify-center gap-x-2 rounded-md">
              <p>Update recipe</p>
              <Pencil size={18} />
            </Button>
            {showRatingError && (
              <p className="bg-red-200 text-red-500 p-4 w-full flex items-center justify-center gap-x-2">
                <ShieldAlert size={20} />
                <p>Rating is required</p>
              </p>
            )}
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Update;
