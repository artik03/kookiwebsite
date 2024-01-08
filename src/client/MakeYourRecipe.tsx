import { useState, FormEvent } from "react";
import uploadFileImg from "./assets/uploadFile.svg";
import closeIcon from "./assets/closeIcon.svg";
import axios, { AxiosError, AxiosResponse } from "axios";

interface Recipe {
  img: string;
  title: string;
  description: string;
  ingredients: string[];
}

export default function MakeYourRecipe({
  getRecipes,
}: {
  getRecipes: () => void;
}) {
  const [titleValue, setTitle] = useState("");
  const [descriptionOfRecipeValue, setDescriptionOfRecipe] = useState("");
  const [imgValue, setImg] = useState("");
  const [ingredientsTagsValue, setIngredientsTagsValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  /*--------------error message-----------------------------------*/

  const [textareaErrorMessage, setTextareaErrorMessage] = useState("");

  /*---------------change handlers-------------------------------------------*/

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionOfRecipeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionOfRecipe(event.target.value);
    setTextareaErrorMessage("");
  };

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith("image/")) {
        // Read file as data URL
        const reader: FileReader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          setImg(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCloseImage = () => {
    setImg("");
  };

  const handleIngredientsTagsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientsTagsValue(event.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredientsTagsValue.trim() !== "") {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        ingredientsTagsValue,
      ]);
      setIngredientsTagsValue("");
    }
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  /*-----------------reset----------------------------------------*/

  const resetFormData = () => {
    setTitle("");
    setDescriptionOfRecipe("");
    setImg("");
    setIngredientsTagsValue("");
    setIngredients([]);
    setTextareaErrorMessage("");
  };

  /*-----------------submit---------------------------------------*/

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* text area -------------------------------------*/
    if (descriptionOfRecipeValue.trim().split(/\s+/).length < 15) {
      setTextareaErrorMessage("Please enter at least 15 words in the textarea");
    } else {
      resetFormData();

      const recipeToAdd: Recipe = {
        img: imgValue ? imgValue : "default",
        title: titleValue,
        description: descriptionOfRecipeValue,
        ingredients: ingredients,
      };

      // push to local storage

      //   const storedRecipes = localStorage.getItem("recipes");
      //   const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      //   recipes.push(recipeToAdd);
      //   localStorage.setItem("recipes", JSON.stringify(recipes));
      // }

      try {
        const response: AxiosResponse<{ message: string }> = await axios.post(
          "/api/add-recipe",
          recipeToAdd
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
    }
  };

  return (
    <section id="make-recipe-section">
      <h1>MAKE YOU OWN RECIPE</h1>

      <form id="form" onSubmit={handleSubmit}>
        <div id="form-content">
          <h3>
            Fill in information about your recipe and add it into your
            collection
          </h3>

          {/* name button --------------------------------------*/}
          <div className="input-group">
            <input
              required
              type="text"
              name="titleOfRecipe"
              value={titleValue}
              onChange={handleTitleChange}
            />
            <label className="user-label">Title</label>
          </div>

          {/* description -------------------------------------*/}

          {textareaErrorMessage && (
            <p id="textarea-error-message">{textareaErrorMessage}</p>
          )}

          <div className="input-group">
            <textarea
              required
              name="DescriptionOfRecipe"
              value={descriptionOfRecipeValue}
              onChange={handleDescriptionOfRecipeChange}
            />
            <label>
              Description <span>(min 15 words)</span>
            </label>
          </div>

          {/* file pic upload */}

          {imgValue && (
            <label
              className="custom-file-upload image-container"
              htmlFor="file"
            >
              <div className="uploaded-picture-container">
                <img
                  src={closeIcon}
                  id="close-icon"
                  className="close-icon"
                  alt="close-icon"
                  onClick={handleCloseImage}
                />
                <img
                  src={imgValue}
                  alt="uploaded-image"
                  className="uploaded-image"
                />
              </div>
            </label>
          )}

          {!imgValue && (
            <label
              className="custom-file-upload upload-your-pic-container"
              htmlFor="file"
            >
              <div className="upload-content">
                <img src={uploadFileImg} alt="upload-file-pic" />
                <p className="text">Upload your picture</p>
              </div>
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={handleImgChange}
              />
            </label>
          )}

          {/* tags */}
          <div className="input-group">
            <input
              /*remove auto focus*/

              type="text"
              name="ingredients-tags"
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`${
                !isFocused && ingredientsTagsValue === "" ? "blur" : ""
              }`}
              value={ingredientsTagsValue}
              onChange={handleIngredientsTagsChange}
            />
            <label>Ingredients (1 word at a time)</label>
          </div>

          <button
            type="button"
            id="add-ingredient-button"
            onClick={handleAddIngredient}
          >
            Add
          </button>

          <ul className="tags-ul">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="tag">
                {ingredient}
                <button
                  type="button"
                  className="tag-delete-button"
                  onClick={() => handleDeleteIngredient(index)}
                >
                  <img src={closeIcon} id="close-icon" alt="close-icon" />
                </button>
              </li>
            ))}
          </ul>

          {/* buttons */}
          <div id="form-footer">
            <button
              type="button"
              id="reset-form-button"
              onClick={resetFormData}
            >
              Reset
            </button>
            <button type="submit" id="submit-btn">
              Add recipe
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
