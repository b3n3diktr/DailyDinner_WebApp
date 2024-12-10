import React from 'react';
import {useNavigate} from "react-router-dom";

const Recipe: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant mt-[20vh] pt-20 pb-0 px-0 min-h-[90vh] flex flex-col items-center rounded-t-xl md:pb-0 md:px-4 text-text dark:text-darkmode-text">
            <div>
                <h1>Brows Recipes</h1>
                <button
                    type="button"
                    onClick={() => {navigate('/recipes/new')}}
                    className="w-full py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none">
                    New Recipe
                </button>
            </div>
            <div>
                <a> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto doloribus illum ipsam ipsum laborum, provident quam quia quis reprehenderit vitae? Autem consequatur eligendi impedit incidunt laboriosam maiores nihil, provident voluptates! </a>
            </div>
        </div>
    );
};

export default Recipe;