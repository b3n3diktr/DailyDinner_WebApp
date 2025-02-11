import React from 'react';
import { useNavigate } from "react-router-dom";

const NewRecipe: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [instructions, setInstructions] = React.useState<string[]>([]);
    const [instructionStep, setInstructionStep] = React.useState('');
    const [ingredients, setIngredients] = React.useState<{ name: string; amount: string }[]>([]);
    const [ingredientName, setIngredientName] = React.useState('');
    const [ingredientAmount, setIngredientAmount] = React.useState('');
    const [prepTime, setPrepTime] = React.useState('');
    const [cookTime, setCookTime] = React.useState('');
    const [servings, setServings] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleAddIngredient = () => {
        if (ingredientName && ingredientAmount) {
            setIngredients([...ingredients, { name: ingredientName, amount: ingredientAmount }]);
            setIngredientName('');
            setIngredientAmount('');
        }
    };

    const handleDeleteIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleAddInstruction = () => {
        if (instructionStep) {
            setInstructions([...instructions, instructionStep]);
            setInstructionStep('');
        }
    };

    const handleDeleteInstruction = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formattedCategory = category.split(';').map(cat => cat.trim());
            // API call goes here
        } catch (error: any) {
            setSuccess(false);
            setMessage("Error creating recipe.");
            console.error(error);
        }
    };

    return (
        <div className="bg-background dark:bg-darkmode-background min-h-screen flex items-center justify-center px-6 py-12">
            <div className="shadow-lg bg-background-variant-1 dark:bg-darkmode-background-variant-1 rounded-xl p-8 max-w-3xl w-full">
                <h1 className="text-4xl font-bold text-text dark:text-darkmode-text text-center mb-6">
                    🍽️ Create a New Recipe
                </h1>

                <form className="space-y-6" onSubmit={handleCreate}>
                    <div>
                        <label className="block text-text dark:text-darkmode-text font-medium">Recipe Title</label>
                        <input
                            type="text"
                            placeholder="Recipe Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text"
                        />
                    </div>

                    <div>
                        <label className="block text-text dark:text-darkmode-text font-medium">Description</label>
                        <textarea
                            placeholder="Describe your recipe..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text"
                        />
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label className="block text-text dark:text-darkmode-text font-medium">Ingredients</label>
                        <div className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                placeholder="Ingredient Name"
                                value={ingredientName}
                                onChange={(e) => setIngredientName(e.target.value)}
                                className="flex-grow p-2 border rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text"
                            />
                            <input
                                type="text"
                                placeholder="Amount"
                                value={ingredientAmount}
                                onChange={(e) => setIngredientAmount(e.target.value)}
                                className="flex-grow p-2 border rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text"
                            />
                            <button
                                type="button"
                                onClick={handleAddIngredient}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-variant transition-all"
                            >
                                ➕ Add
                            </button>
                        </div>
                        <ul className="mt-3 space-y-1">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex justify-between items-center bg-secondary dark:bg-darkmode-secondary p-2 rounded-lg">
                                    <span>{ingredient.name} - {ingredient.amount}</span>
                                    <button type="button" onClick={() => handleDeleteIngredient(index)} className="text-error hover:text-red-700">
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                        <label className="block text-text dark:text-darkmode-text font-medium">Instructions</label>
                        <div className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                placeholder="Instruction Step"
                                value={instructionStep}
                                onChange={(e) => setInstructionStep(e.target.value)}
                                className="flex-grow p-2 border rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text"
                            />
                            <button
                                type="button"
                                onClick={handleAddInstruction}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-variant transition-all"
                            >
                                ➕ Add
                            </button>
                        </div>
                        <ul className="mt-3 space-y-1">
                            {instructions.map((step, index) => (
                                <li key={index} className="flex justify-between items-center bg-secondary dark:bg-darkmode-secondary p-2 rounded-lg">
                                    <span>Step {index + 1}: {step}</span>
                                    <button type="button" onClick={() => handleDeleteInstruction(index)} className="text-error hover:text-red-700">
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Other Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-text dark:text-darkmode-text font-medium">Prep Time (min)</label>
                            <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} className="w-full p-3 border rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text" />
                        </div>
                        <div>
                            <label className="block text-text dark:text-darkmode-text font-medium">Cook Time (min)</label>
                            <input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} className="w-full p-3 border rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text" />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-primary-variant transition-all">
                        ✅ Create Recipe
                    </button>

                    {message && <p className={success ? "text-success" : "text-error"}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default NewRecipe;
