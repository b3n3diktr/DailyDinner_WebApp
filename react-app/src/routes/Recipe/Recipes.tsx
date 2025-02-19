import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ApiRecipe, Recipe } from "../../api/apiRecipes";
import { useQuery } from "@tanstack/react-query";

const RecipeComponent: React.FC = () => {
    const navigate = useNavigate();
    const PAGE_SIZE = 6;
    const [page, setPage] = useState(0);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch
    } = useQuery({
        queryKey: ['recipes', page],
        queryFn: () => ApiRecipe.getPaginatedRecipes(page, PAGE_SIZE),
    });

    // Update allRecipes when new data comes in
    useEffect(() => {
        if (data?.data) {
            if (page === 0) {
                // Reset the list if we're on the first page
                setAllRecipes(data.data);
            } else {
                // Append new recipes to existing ones
                setAllRecipes(prev => [...prev, ...data.data]);
            }
        }
    }, [data, page]);

    const hasMore = data?.data && data.data.length === PAGE_SIZE;

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    // Helper function to render recipe categories as badges
    const renderCategoryBadges = (categories: Recipe['categories']) => {
        if (!categories || categories.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-1 mt-2">
                {categories.slice(0, 3).map(category => (
                    <span
                        key={category.id}
                        className="px-2 py-1 text-xs rounded-full bg-secondary-variant/20 text-secondary-variant dark:bg-darkmode-secondary-variant/20 dark:text-darkmode-secondary-variant"
                    >
                        {category.name}
                    </span>
                ))}
                {categories.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-secondary-variant/10 text-secondary-variant dark:bg-darkmode-secondary-variant/10 dark:text-darkmode-secondary-variant">
                        +{categories.length - 3} more
                    </span>
                )}
            </div>
        );
    };

    const renderRecipeCard = (recipe: Recipe) => {
        return (
            <div
                key={recipe.id}
                className="bg-background dark:bg-darkmode-background shadow-lg rounded-lg overflow-hidden border border-neutral-light dark:border-darkmode-neutral-light hover:border-accent dark:hover:border-darkmode-accent transition-all duration-200 flex flex-col h-full"
            >
                {/* Recipe Image */}
                <div className="relative h-48 bg-background-variant-2 dark:bg-darkmode-background-variant-2 overflow-hidden">
                    <img
                        src={ApiRecipe.getImageUrl(recipe.image_filename)}
                        alt={recipe.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = ApiRecipe.getImageUrl(null);
                        }}
                    />
                </div>

                <div className="p-4 flex-grow flex flex-col">
                    {/* Recipe Name */}
                    <h2 className="text-xl font-semibold text-text dark:text-darkmode-text line-clamp-1">
                        {recipe.name}
                    </h2>

                    {/* Categories */}
                    {renderCategoryBadges(recipe.categories)}

                    {/* Description */}
                    <p className="text-secondary-variant dark:text-darkmode-secondary-variant mt-2 text-sm line-clamp-2 flex-grow">
                        {recipe.description}
                    </p>

                    {/* Time and Servings Info */}
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-secondary-variant dark:text-darkmode-secondary-variant">
                        {recipe.preparationTime > 0 && (
                            <span title="Preparation Time">
                                🕐 Prep: {recipe.preparationTime}min
                            </span>
                        )}
                        {recipe.cookingTime > 0 && (
                            <span title="Cooking Time">
                                👨‍🍳 Cook: {recipe.cookingTime}min
                            </span>
                        )}
                        {recipe.servings > 0 && (
                            <span title="Number of Servings">
                                👥 Serves: {recipe.servings}
                            </span>
                        )}
                    </div>

                    {/* View Recipe Button and Rating */}
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            className="px-4 py-2 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant transition-all duration-200"
                            onClick={() => navigate(`/recipes/${recipe.id}`)}
                        >
                            View Recipe
                        </button>

                        {/* Rating */}
                        {recipe.rating > 0 && (
                            <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1 text-sm text-secondary-variant dark:text-darkmode-secondary-variant">
                                    {recipe.rating.toFixed(1)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-background-variant-1 dark:bg-darkmode-background-variant-1 min-h-screen py-12 px-6 flex flex-col items-center text-text dark:text-darkmode-text">
            {/* Title and New Recipe Button */}
            <div className="w-full max-w-4xl text-center mb-8">
                <h1 className="text-4xl font-bold">🍽️ Browse Recipes</h1>
                <p className="mt-2 text-secondary-variant dark:text-darkmode-secondary-variant">
                    Find and explore delicious recipes!
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/recipes/new')}
                    className="mt-4 px-6 py-3 bg-primary text-text dark:text-darkmode-text text-lg font-semibold rounded-lg hover:bg-primary-variant transition-all duration-200"
                >
                    ➕ New Recipe
                </button>
            </div>

            {/* Loading State for Initial Load */}
            {isLoading && page === 0 && (
                <div className="flex justify-center items-center w-full py-12">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3">Loading recipes...</span>
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-red-500 dark:text-red-400">Failed to load recipes. Please try again later.</p>
                    <button
                        onClick={() => refetch()}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Recipes Grid */}
            {!isLoading && allRecipes.length > 0 && (
                <>
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-auto gap-6">
                        {allRecipes.map(renderRecipeCard)}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={loadMore}
                                disabled={isFetching}
                                className="px-6 py-3 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                            >
                                {isFetching ? (
                                    <>
                                        <div className="w-5 h-5 border-3 border-text/20 border-t-text rounded-full animate-spin mr-2"></div>
                                        Loading...
                                    </>
                                ) : (
                                    'Load More Recipes'
                                )}
                            </button>
                        </div>
                    )}

                    {/* End of Content Message */}
                    {!hasMore && (
                        <p className="mt-8 text-secondary-variant dark:text-darkmode-secondary-variant text-center">
                            You've reached the end of the recipes!
                        </p>
                    )}
                </>
            )}

            {/* Empty State */}
            {!isLoading && allRecipes.length === 0 && (
                <div className="text-center p-8 bg-background dark:bg-darkmode-background rounded-lg shadow-md">
                    <p className="text-lg text-secondary-variant dark:text-darkmode-secondary-variant mb-4">
                        No recipes available at the moment.
                    </p>
                    <button
                        className="px-4 py-2 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant transition-all duration-200"
                        onClick={() => {
                            setPage(0);
                            refetch();
                        }}
                    >
                        Refresh
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecipeComponent;