import { useEffect, useState } from "react";
import { Recipe } from "./App";
import closeIcon from "./assets/closeIcon.svg";
import defaultImg from "./assets/defaultPic.jpg";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function MyRecipes({
  getRecipes,
  recipes,
}: {
  getRecipes: () => void;
  recipes: Recipe[];
}) {
  const [recipesToShow, setRecipesToShow] = useState<Recipe[]>(recipes);
  const handleDeleteRecipeCard = async (title: string) => {
    try {
      const response: AxiosResponse<{ message: string }> = await axios.delete(
        `/api/del-recipe/${title}`
      );
      alert(response.data.message);
      getRecipes();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;

        if (axiosError.response) {
          alert(axiosError.response.data.message);
        } else if (axiosError.request) {
          alert("No response received from the server");
        } else {
          alert("Error setting up the request:" + axiosError.message);
        }
      } else {
        alert("Unknown error:" + error);
      }
    }
  };

  useEffect(() => {
    setRecipesToShow(recipes);
  }, [recipes]);

  return (
    <section id="trending-recipes">
      <h1>MY RECIPES</h1>

      {recipesToShow.length === 0 ? (
        <p>
          You haven't got any recipes saved :( go to next section to fix this ;)
        </p>
      ) : (
        <ul id="card-ul">
          {recipesToShow.map((recipe: any, index: number) => (
            <li className="card" key={index}>
              <div className="uploaded-picture-container">
                <img
                  src={closeIcon}
                  id="close-icon"
                  className="close-icon"
                  alt="close-icon"
                  onClick={() => handleDeleteRecipeCard(recipe.title)}
                />
                <img
                  src={recipe.img === "default" ? defaultImg : recipe.img}
                  alt={recipe.title}
                  className="uploaded-img"
                />
              </div>

              <div className="card-content">
                <h1 className="card-title">{recipe.title}</h1>
                <ul className="tags-ul">
                  {recipe.ingredients.map(
                    (ingredient: string, index: number) => (
                      <li key={index} className="tag">
                        {ingredient}
                      </li>
                    )
                  )}
                </ul>
                <p className="card-description">{recipe.description}</p>
                <a href="#" id="create-recipe-btn" className="card-button">
                  Read More
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
