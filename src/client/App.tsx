import "./Main.css";
import Header from "./Header";
import MakeYourRecipe from "./MakeYourRecipe";
import TrendingRecipes from "./MyRecipes";
import axios from "axios";
import { useCallback, useState } from "react";

export interface Recipe {
  img?: string;
  title: string;
  description: string;
  ingredients: string[];
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = useCallback(() => {
    axios.get("/api/get-recipes").then(
      (response) => {
        const data: Recipe[] = response.data;
        setRecipes(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <Header />
      <main>
        <TrendingRecipes getRecipes={getRecipes} recipes={recipes} />
        <MakeYourRecipe getRecipes={getRecipes} />
      </main>
    </>
  );
}

export default App;
