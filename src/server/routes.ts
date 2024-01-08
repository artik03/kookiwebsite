import express from "express";
const router = express.Router();
import { Recipe } from "./db.js";

router.post("/add-recipe", async (req, res) => {
  try {
    const recipe = req.body;
    const doesRecipeExists = await Recipe.findOne({
      title: recipe.title,
    }).exec();

    if (doesRecipeExists) {
      return res
        .status(400)
        .json({ message: "Recipe with this title already exists!" });
    }
    const rec = new Recipe({
      img: recipe.img,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
    });

    try {
      await rec.save();
      res.status(201).json({ message: "Recipe successfully added" });
    } catch (saveError) {
      console.error("Error saving recipe:", saveError);
      res.status(500).json({ message: "Internal Server Error1" });
    }
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "Internal Server Error2" });
  }
});

router.delete("/del-recipe/:title", async (req, res) => {
  try {
    const result = await Recipe.deleteOne({ title: req.params.title }).exec();

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Recipe not found" });
    } else {
      console.log(result.deletedCount);
      res.json({ message: "Recipe deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-recipes", async (req, res) => {
  let recipes = [];
  try {
    recipes = await Recipe.find({}).exec();
    res.send(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
