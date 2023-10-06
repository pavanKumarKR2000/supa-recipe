import { ArrowDownUp, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import supabase from "../config/supabaseConfig";
import Loading from "../components/Loading";
import { twMerge } from "tailwind-merge";
import Pagination from "../components/Pagination";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [orderBy, setOrderBy] = useState("created_at");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);

      const { error: countError, count } = await supabase
        .from("recipes")
        .select("*", { count: "exact", head: true });

      if (!countError) {
        setCount(count);
      }

      const { data, error } = await supabase
        .from("recipes")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError(error);
        setRecipes(null);
      } else {
        setRecipes(data);
        setFetchError(null);
      }
      setIsLoading(false);
    };

    fetchRecipes();
  }, [deleted, orderBy]);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 items-center md:pl-6 gap-x-4">
        <div className="flex items-center gap-x-2">
          <p>Order by</p>
          <ArrowDownUp size={18} />
        </div>
        <div className="flex items-center gap-x-3 justify-center md:justify-start">
          <div
            onClick={() => setOrderBy("created_at")}
            className={twMerge(
              "py-2 px-4 rounded-md bg-white text-black cursor-pointer",
              orderBy === "created_at" && " bg-black text-white"
            )}
          >
            Time created
          </div>
          <div
            onClick={() => setOrderBy("title")}
            className={twMerge(
              "py-2 px-4 rounded-md bg-white text-black cursor-pointer",
              orderBy === "title" && "bg-black text-white"
            )}
          >
            Title
          </div>
          <div
            onClick={() => setOrderBy("rating")}
            className={twMerge(
              "py-2 px-4 rounded-md bg-white text-black cursor-pointer",
              orderBy === "rating" && "bg-black text-white"
            )}
          >
            Rating
          </div>
        </div>
      </div>
      {fetchError && (
        <p className="bg-red-200 text-red-500 p-4 w-max mx-auto flex items-center gap-x-2">
          <ShieldAlert size={20} />
          <p>Couldnt fetch recepies</p>
        </p>
      )}
      {!fetchError && !isLoading && (
        <>
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 p-4">
            {recipes?.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                setDeleted={setDeleted}
              />
            ))}
          </div>
          <Pagination count={count} />
        </>
      )}

      {isLoading && <Loading />}
    </div>
  );
};

export default Home;
