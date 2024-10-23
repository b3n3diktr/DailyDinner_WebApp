import Recipe from "../../models/recipes/Recipe";
import crypto from "crypto";

export class newRecipeService {
    async newRecipe(title: string,
                    instructions: string[],
                    ingredients: string[],
                    prepTime: number,
                    cookTime: number,
                    servings: number,
                    category: string,
                    tags: string[],
                    description?: string,) {

        if(!title || title.length < 3) {
            throw new Error("Please enter a valid title");
        }
        if(!instructions || instructions.length < 3) {
            throw new Error("Please enter valid instructions");
        }
        if(!ingredients) {
            throw new Error("Please enter at least one ingredient");
        }
        if(!prepTime || prepTime < 0) {
            throw new Error("Please enter a valid prep time");
        }
        if(!cookTime || cookTime < 0) {
            throw new Error("Please enter a valid cook time");
        }
        if(!servings || servings < 0){
            throw new Error("Please enter an amount for servings");
        }
        if(!category || category.length < 3) {
            throw new Error("Please enter a valid category");
        }
        if(!tags) {
            throw new Error("Please enter at least one tag");
        }
        if(!description) {
            description = "";
        }

        let id;
        let exists;
        do {
            id = crypto.randomUUID();
            exists = await Recipe.findOne({id});
        } while (exists);

        const recipe = new Recipe({
            title: title,
            uid: id,
            description: description,
            ingredients: ingredients,
            instructions: instructions,
            prepTime: prepTime,
            cookTime: cookTime,
            servings: servings,
            category: category,
            tags: tags
        });
        await recipe.save();

        logging.info(`RECIPES[New] - TITLE: [${recipe.title}] - ID: [${recipe.id}]`);
        return recipe;
    }
}