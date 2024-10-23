import React from 'react';
import { useNavigate } from "react-router-dom";

const NewRecipe: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [instructions, setInstructions] = React.useState('');
    const [ingredients, setIngredients] = React.useState('');
    const [prepTime, setPrepTime] = React.useState('');
    const [cookTime, setCookTime] = React.useState('');
    const [servings, setServings] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [tags, setTags] = React.useState('');

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic
    }

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant h-screen p-4 text-text">
            <div className="border-4 border-black p-4">
                <form className="max-w-md w-full flex flex-col space-y-4">
                    {/* Use flexbox for label and input alignment */}
                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Recipe Title</label>
                        <input type="text" placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Description</label>
                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Instructions</label>
                        <input type="text" placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Ingredients</label>
                        <input type="text" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Prep Time</label>
                        <input type="number" placeholder="Preparation Time (in minutes)" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Cook Time</label>
                        <input type="number" placeholder="Cook Time (in minutes)" value={cookTime} onChange={(e) => setCookTime(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Servings</label>
                        <input type="number" placeholder="Servings" value={servings} onChange={(e) => setServings(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Category</label>
                        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3">Tags</label>
                        <input type="text" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)}
                               className="w-2/3 pl-3 pr-3 py-2 border-2 border-input rounded-lg bg-input text-text focus:outline-none"/>
                    </div>

                    <div>
                        <button type="button" onClick={handleCreate} className="w-full py-3 bg-accent text-white rounded-lg">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRecipe;
