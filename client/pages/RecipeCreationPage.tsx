import React, { useState } from 'react';

const RecipeCreation: React.FC = () => {
    // State to store the recipe information
    const [recipeName, setRecipeName] = useState<string>('');
    const [prepTime, setPrepTime] = useState<number>(30);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [rating, setRating] = useState<number>(1);
    const [ingredients, setIngredients] = useState<string[]>(['']); // Start with one ingredient input

    // Add a new ingredient input
    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    // Handle ingredient input change
    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    return (
        <div>
            <h2>Create a New Recipe</h2>

            <div>
                <label>Recipe Name:</label>
                <input
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    placeholder="Enter recipe name"
                />
            </div>

            <div>
                <label>Prep Time (in minutes):</label>
                <input
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                    min="1"
                />
            </div>

            <div>
                <label>Cook Time (in minutes):</label>
                <input
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                    min="1"
                />
            </div>

            <div>
                <label>Difficulty:</label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div>
                <label>Rating:</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>

            <div>
                <label>Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={ingredient}
                            onChange={(e) =>
                                handleIngredientChange(index, e.target.value)
                            }
                            placeholder={`Ingredient ${index + 1}`}
                        />
                    </div>
                ))}
                <button type="button" onClick={addIngredient}>
                    Add Ingredient
                </button>
            </div>

            <div>
                <button type="submit">Submit Recipe</button>
            </div>
        </div>
    );
};

export default RecipeCreation;
