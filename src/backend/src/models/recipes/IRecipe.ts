import { Document } from 'mongoose';

interface Ingredient {
    name: string;
    quantity: string;
}

export interface IRecipe extends Document {
    title: string;
    id: string,
    description?: string;
    ingredients: Ingredient[];
    instructions: string[];
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    totalTime: number; // in minutes
    servings: number;
    category: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
