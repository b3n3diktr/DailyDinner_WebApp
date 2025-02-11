import React from 'react';
import { useNavigate } from "react-router-dom";

const Recipe: React.FC = () => {
    const navigate = useNavigate();

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

            {/* Recipes Grid */}
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className="bg-background dark:bg-darkmode-background shadow-lg rounded-lg p-4 border border-neutral-light dark:border-darkmode-neutral-light hover:border-accent dark:hover:border-darkmode-accent transition-all duration-200"
                    >
                        <div className="h-40 bg-background-variant-2 dark:bg-darkmode-background-variant-2 rounded-lg"></div>
                        <h2 className="text-xl font-semibold mt-4 text-text dark:text-darkmode-text">
                            Recipe {index + 1}
                        </h2>
                        <p className="text-secondary-variant dark:text-darkmode-secondary-variant mt-2 text-sm">
                            A delicious placeholder recipe description. Stay tuned for real recipes!
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant transition-all duration-200"
                        >
                            View Recipe
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipe;