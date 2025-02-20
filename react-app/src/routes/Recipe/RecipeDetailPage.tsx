import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiRecipe, Recipe } from '../../api/apiRecipes';
import { Clock, Users, ChefHat, Edit, Trash2, AlertCircle } from 'lucide-react';

const RecipeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await ApiRecipe.getRecipeById(id as string);
                setRecipe(response.data);
            } catch (err) {
                setError('Failed to load recipe. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchRecipe();
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await ApiRecipe.deleteRecipe(id as string);
            navigate('/recipes');
        } catch (err) {
            setError('Failed to delete recipe. Please try again later.');
        }
    };

    const renderIngredients = (ingredients: string | string[]) => {
        // If ingredients is already an array, use it directly
        const ingredientList: string[] = Array.isArray(ingredients)
            ? ingredients
            : typeof ingredients === 'string' && ingredients.startsWith('[')
                ? JSON.parse(ingredients) as string[]
                : ingredients.split('\n');

        return ingredientList.map((ingredient: string, index: number) => (
            <li
                key={index}
                className="text-secondary-variant dark:text-darkmode-secondary-variant py-1"
            >
                {ingredient.trim()}
            </li>
        ));
    };

    const renderInstructions = (instructions: string | Record<string, string> | string[]) => {
        let instructionList: string[] = [];

        if (typeof instructions === 'string' && instructions.startsWith('{')) {
            const parsedInstructions = JSON.parse(instructions) as Record<string, string>;
            instructionList = Object.entries(parsedInstructions)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([_, instruction]) => instruction);
        } else if (typeof instructions === 'object' && !Array.isArray(instructions)) {
            instructionList = Object.entries(instructions as Record<string, string>)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([_, instruction]) => instruction);
        } else {
            instructionList = Array.isArray(instructions)
                ? instructions
                : typeof instructions === 'string' && instructions.startsWith('[')
                    ? JSON.parse(instructions) as string[]
                    : instructions.split('\n');
        }

        return instructionList.map((instruction: string, index: number) => (
            <li
                key={index}
                className="text-secondary-variant dark:text-darkmode-secondary-variant py-2"
            >
                {instruction.trim()}
            </li>
        ));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-8 h-8 border-4 border-primary dark:border-darkmode-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-text dark:text-darkmode-text">Loading recipe...</span>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center text-error">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error || 'Recipe not found'}
                </div>
                <button
                    onClick={() => navigate('/recipes')}
                    className="mt-4 px-4 py-2 bg-primary dark:bg-darkmode-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant"
                >
                    Back to Recipes
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-variant-1 dark:bg-darkmode-background-variant-1 py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-4xl font-bold text-text dark:text-darkmode-text">{recipe.name}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/recipes/${id}/edit`)}
                            className="flex items-center px-4 py-2 bg-primary dark:bg-darkmode-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex items-center px-4 py-2 bg-error text-white rounded-lg hover:bg-error/80"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </button>
                    </div>
                </div>

                {/* Recipe Image */}
                <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden bg-background-variant-2 dark:bg-darkmode-background-variant-2">
                    <img
                        src={ApiRecipe.getImageUrl(recipe.image_filename)}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = ApiRecipe.getImageUrl(null);
                        }}
                    />
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {recipe.preparationTime > 0 && (
                        <div className="flex items-center bg-background dark:bg-darkmode-background p-4 rounded-lg">
                            <Clock className="w-6 h-6 mr-3 text-primary dark:text-darkmode-primary" />
                            <div>
                                <p className="text-sm text-secondary-variant dark:text-darkmode-secondary-variant">Prep Time</p>
                                <p className="font-semibold text-text dark:text-darkmode-text">{recipe.preparationTime} mins</p>
                            </div>
                        </div>
                    )}
                    {recipe.cookingTime > 0 && (
                        <div className="flex items-center bg-background dark:bg-darkmode-background p-4 rounded-lg">
                            <ChefHat className="w-6 h-6 mr-3 text-primary dark:text-darkmode-primary" />
                            <div>
                                <p className="text-sm text-secondary-variant dark:text-darkmode-secondary-variant">Cook Time</p>
                                <p className="font-semibold text-text dark:text-darkmode-text">{recipe.cookingTime} mins</p>
                            </div>
                        </div>
                    )}
                    {recipe.servings > 0 && (
                        <div className="flex items-center bg-background dark:bg-darkmode-background p-4 rounded-lg">
                            <Users className="w-6 h-6 mr-3 text-primary dark:text-darkmode-primary" />
                            <div>
                                <p className="text-sm text-secondary-variant dark:text-darkmode-secondary-variant">Servings</p>
                                <p className="font-semibold text-text dark:text-darkmode-text">{recipe.servings}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Description */}
                {recipe.description && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-text dark:text-darkmode-text">Description</h2>
                        <p className="text-secondary-variant dark:text-darkmode-secondary-variant">{recipe.description}</p>
                    </div>
                )}

                {/* Categories and Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {recipe.categories?.map(category => (
                        <span
                            key={category.id}
                            className="px-3 py-1 bg-secondary dark:bg-darkmode-secondary/20 text-secondary-variant dark:text-darkmode-secondary-variant rounded-full text-sm"
                        >
                            {category.name}
                        </span>
                    ))}
                    {recipe.tags?.map(tag => (
                        <span
                            key={tag.id}
                            className="px-3 py-1 bg-primary dark:bg-darkmode-primary/20 text-primary dark:text-darkmode-primary rounded-full text-sm"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>

                {/* Ingredients */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-text dark:text-darkmode-text">Ingredients</h2>
                    <div className="bg-background dark:bg-darkmode-background rounded-lg p-6">
                        <ul className="list-disc list-outside ml-6 space-y-2">
                            {renderIngredients(recipe.ingredients)}
                        </ul>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-text dark:text-darkmode-text">Instructions</h2>
                    <div className="bg-background dark:bg-darkmode-background rounded-lg p-6">
                        <ol className="list-decimal list-outside ml-6 space-y-4">
                            {renderInstructions(recipe.instructions)}
                        </ol>
                    </div>
                </div>

                {/* Source Attribution */}
                {recipe.source && (
                    <div className="mt-8 text-sm text-secondary-variant dark:text-darkmode-secondary-variant">
                        <p>Source: {recipe.source}</p>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-neutral-dark/50 dark:bg-darkmode-neutral-dark/50 flex items-center justify-center p-4">
                        <div className="bg-background dark:bg-darkmode-background p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-xl font-semibold mb-4 text-text dark:text-darkmode-text">Delete Recipe</h3>
                            <p className="text-secondary-variant dark:text-darkmode-secondary-variant mb-6">
                                Are you sure you want to delete this recipe? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-background-variant-2 dark:bg-darkmode-background-variant-2 text-text dark:text-darkmode-text rounded-lg hover:bg-background-variant-1 dark:hover:bg-darkmode-background-variant-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/80"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetailPage;