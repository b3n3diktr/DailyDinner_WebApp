import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="bg-color-background dark:bg-darkmode-background text-text dark:text-darkmode-text">
            {/* Hero Section */}
            <div className="bg-placeholder bg-cover bg-no-repeat bg-center bg-fixed relative min-h-screen flex flex-col items-center justify-center text-center bg-background-variant-1 dark:bg-darkmode-background-variant-1 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-darkmode-background-variant-2 p-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-primary dark:text-darkmode-primary mb-4 tracking-tight">
                            Simplify Your Meal Planning
                        </h1>
                        <p className="text-xl mb-6 text-text dark:text-darkmode-text opacity-80">
                            Create personalized meal plans, discover exciting recipes, and make cooking a breeze.
                        </p>
                        <Link
                            to="/register"
                            className="inline-block px-8 py-3 bg-primary dark:bg-darkmode-primary text-white rounded-lg shadow-md hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                        >
                            Get Started
                        </Link>

                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-16 text-center bg-background-variant-2 dark:bg-darkmode-background-variant-2">
                <h2 className="text-3xl font-semibold text-primary dark:text-darkmode-primary">How It Works</h2>
                <div className="flex flex-wrap justify-center gap-8 mt-8">
                    <div className="max-w-xs p-6 bg-background-variant-1 dark:bg-darkmode-background-variant-1 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-text dark:text-darkmode-text">1. Create a Meal Plan</h3>
                        <p className="mt-2 text-text dark:text-darkmode-text">Customize your weekly meal plan according to your preferences.</p>
                    </div>
                    <div className="max-w-xs p-6 bg-background-variant-1 dark:bg-darkmode-background-variant-1 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-text dark:text-darkmode-text">2. Choose Recipes</h3>
                        <p className="mt-2 text-text dark:text-darkmode-text">Pick from your own, community, or open-source recipes.</p>
                    </div>
                    <div className="max-w-xs p-6 bg-background-variant-1 dark:bg-darkmode-background-variant-1 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-text dark:text-darkmode-text">3. Stay Organized</h3>
                        <p className="mt-2 text-text dark:text-darkmode-text">Generate a grocery list automatically and stay on track.</p>
                    </div>
                </div>
            </div>

            {/* Featured Recipes */}
            <div className="py-16 text-center bg-neutral-light dark:bg-darkmode-neutral-light">
                <h2 className="text-3xl font-semibold text-primary dark:text-darkmode-primary">Explore Popular Recipes</h2>
                <p className="mt-4 text-text dark:text-darkmode-text">Browse trending and recommended meals from our library.</p>
                <Link
                    to="/recipes"
                    className="mt-6 inline-block px-6 py-3 bg-accent dark:bg-darkmode-accent text-white rounded-lg shadow-md hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                    Browse Recipes
                </Link>
            </div>

            {/* Call to Action */}
            <div className="py-16 text-center bg-background-variant-1 dark:bg-darkmode-background-variant-1">
                <h2 className="text-3xl font-semibold text-primary dark:text-darkmode-primary">Start Planning Today</h2>
                <p className="mt-4 text-text dark:text-darkmode-text">Sign up now and make meal planning easy and enjoyable.</p>
                <Link
                    to="/register"
                    className="mt-6 inline-block px-6 py-3 bg-primary dark:bg-darkmode-primary text-white rounded-lg shadow-md hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
};

export default Home;
