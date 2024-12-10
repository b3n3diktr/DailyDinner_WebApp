import React from 'react';
import { useNavigate } from "react-router-dom";
//import { newRecipe } from "../../../api/api";

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
            /*const response = await newRecipe(
                title,
                instructions,
                ingredients,
                prepTime,
                cookTime,
                servings,
                formattedCategory,
                description
            );
            if (response) {
                setSuccess(true);
                setMessage("Recipe created successfully!");
                navigate("/recipes");
            }*/
        } catch (error: any) {
            setSuccess(false);
            setMessage("Error creating recipe.");
            console.error(error);
        }
    };

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant min-h-screen p-6 flex items-center justify-center">
            <div className="border border-gray-300 rounded-lg shadow-xl p-10 max-w-lg w-full bg-white dark:bg-darkmode-base-variant">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Create New Recipe</h1>

                <form className="space-y-8" onSubmit={handleCreate}>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Recipe Title</label>
                        <input type="text" placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Description</label>
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                    </div>

                    {/* Ingredients Section */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Ingredients</label>
                        <div className="flex items-center space-x-2 mt-2">
                            <input type="text" placeholder="Ingredient Name" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} className="flex-grow p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                            <input type="text" placeholder="Amount" value={ingredientAmount} onChange={(e) => setIngredientAmount(e.target.value)} className="flex-grow p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                            <button type="button" onClick={handleAddIngredient} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                        </div>
                        <ul className="mt-3 space-y-1">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                                    <span>{ingredient.name} - {ingredient.amount}</span>
                                    <button type="button" onClick={() => handleDeleteIngredient(index)} className="text-red-600 hover:text-red-800">Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Section */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Instructions</label>
                        <div className="flex items-center space-x-2 mt-2">
                            <input type="text" placeholder="Instruction Step" value={instructionStep} onChange={(e) => setInstructionStep(e.target.value)} className="flex-grow p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                            <button type="button" onClick={handleAddInstruction} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                        </div>
                        <ul className="mt-3 space-y-1">
                            {instructions.map((step, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                                    <span>Step {index + 1}: {step}</span>
                                    <button type="button" onClick={() => handleDeleteInstruction(index)} className="text-red-600 hover:text-red-800">Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Other Fields */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Prep Time</label>
                        <input type="number" placeholder="Preparation Time (in minutes)" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Cook Time</label>
                        <input type="number" placeholder="Cook Time (in minutes)" value={cookTime} onChange={(e) => setCookTime(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Servings</label>
                        <input type="number" placeholder="Servings" value={servings} onChange={(e) => setServings(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Category</label>
                        <input type="text" placeholder="Category (Separate multiple categories with ';')" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200">Create Recipe</button>

                    {message && <p className={success ? "text-green-500" : "text-red-500"}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default NewRecipe;
