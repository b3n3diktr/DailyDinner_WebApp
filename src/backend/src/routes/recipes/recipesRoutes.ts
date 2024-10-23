import {Router} from "express";
import Recipe from "../../models/recipes/Recipe";
import {newRecipeService} from "../../core/recipes/newRecipeService";

const router = Router();
const recipe = new newRecipeService();

router.post('/new', (async (req, res) => {
    const { title, instruction, ingredients, prepTime, cookTime, servings, category, tags, description } = req.body;
    try{
        await recipe.newRecipe(title, instruction, ingredients, prepTime, cookTime, servings, category, tags, description);
        res.status(201).json({message:"Successfully added a new Recipe!"}).end();
        return;
    }catch (error: any){
        res.status(500).json({message: error.message}).end();
        return;
    }
}));

export default router;