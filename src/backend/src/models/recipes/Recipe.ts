import mongoose from 'mongoose';
import RecipeSchema from './RecipeSchema';
import { IRecipe } from './IRecipe';

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
