import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import supabase from "../config/supabaseConfig";
import Loading from "../components/Loading";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [orderBy, setOrderBy] = useState("created-at");

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("recipes").select();

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
  }, [deleted]);

  return (
    <div className="p-4 mt-4 space-y-4">
      <div></div>
      {fetchError && (
        <p className="bg-red-200 text-red-500 p-4 w-max mx-auto flex items-center gap-x-2">
          <ShieldAlert size={20} />
          <p>Couldnt fetch recepies</p>
        </p>
      )}
      {!fetchError && (
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {recipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              setDeleted={setDeleted}
            />
          ))}
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default Home;
