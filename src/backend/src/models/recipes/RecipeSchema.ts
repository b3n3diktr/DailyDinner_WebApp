import mongoose, { Schema } from 'mongoose';
import { IRecipe } from './IRecipe';

const IngredientSchema: Schema = new Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
});

const RecipeSchema: Schema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        id: { type: String, required: true, unique: true },
        description: { type: String, trim: true },
        ingredients: { type: [IngredientSchema], required: true },
        instructions: { type: [String], required: true },
        prepTime: { type: Number, required: true, min: 0 },
        cookTime: { type: Number, required: true, min: 0 },
        servings: { type: Number, required: true, min: 1 },
        category: { type: String, required: true, trim: true },
        tags: { type: [String], default: [] },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

RecipeSchema.virtual('totalTime').get(function (this: IRecipe) {
    return this.prepTime + this.cookTime;
});

RecipeSchema.index({ title: 'text', description: 'text', tags: 1, category: 1 });

export default RecipeSchema;
