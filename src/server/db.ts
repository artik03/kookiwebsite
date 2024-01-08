import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  console.error("MONGODB_URI environment variable is not set.");
  console.log("MONGO DB URI not found");
  process.exit(1);
}

mongoose.connect(mongodbUri);

const recipeSchema = new mongoose.Schema({
  img: String,
  title: {
    type: String,
    required: true,
  },
  description: String,
  ingredients: [String],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export { Recipe, mongoose };
