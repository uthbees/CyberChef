import React, { useContext, useState } from 'react';
import { PostRecipesBody } from '../../server/routes/postRecipes';
import { AllRecipesContext } from '../App/AllRecipesContextProvider';
import { RecipeDifficulty } from '../App/types';
import {
    CircularProgress,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Description } from '@mui/icons-material';

export default function RecipeCreationPage() {
    const [recipeCreationStatus, setRecipeCreationStatus] =
        useState<RecipeCreationStatus | null>(null);
    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            {(() => {
                switch (recipeCreationStatus) {
                    case null:
                        return (
                            <RecipeCreationForm
                                setRecipeCreationStatus={
                                    setRecipeCreationStatus
                                }
                            />
                        );
                    case RecipeCreationStatus.LOADING:
                        return <CircularProgress />;
                    case RecipeCreationStatus.SUCCESS:
                        return <Typography>Recipe created!</Typography>;
                    case RecipeCreationStatus.FAILED:
                        return (
                            <Typography>
                                Error: Failed to create recipe.
                            </Typography>
                        );
                    default:
                        return 'Error: Unhandled RecipeCreationStatus type.';
                }
            })()}
        </div>
    );
}

function RecipeCreationForm({
    setRecipeCreationStatus,
}: {
    setRecipeCreationStatus: (status: RecipeCreationStatus) => void;
}) {
    const { createRecipe } = useContext(AllRecipesContext);

    // State to store the recipe information
    const [recipeName, setRecipeName] = useState<string>('');
    const [recipeDescription, setRecipeDescription] = useState<string>('');
    const [prepTime, setPrepTime] = useState<number>(30);
    const [cookTime, setCookTime] = useState<number>(30);
    const [difficulty, setDifficulty] = useState<RecipeDifficulty>('Easy');
    const [ingredients, setIngredients] = useState<
        { name: string; measurement: number; unit: string }[]
    >([{ name: '', measurement: 1, unit: '' }]); // Start with one ingredient input

    // Add a new ingredient input
    const addIngredient = () => {
        setIngredients([
            ...ingredients,
            { name: '', measurement: 1, unit: '' },
        ]);
    };

    // Handle ingredient input change
    const handleIngredientChange = (
        index: number,
        field: 'name' | 'measurement' | 'unit',
        value: string | number,
    ) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = {
            ...newIngredients[index],
            [field]: value,
        };
        setIngredients(newIngredients);
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setRecipeCreationStatus(RecipeCreationStatus.LOADING);

                const requestBody: PostRecipesBody = {
                    name: recipeName,
                    description: recipeDescription,
                    difficulty,
                    prep_time: prepTime,
                    cook_time: cookTime,
                    ingredients: ingredients.map((ingredient) => ({
                        name: ingredient.name,
                        quantity: ingredient.measurement, // TODO
                        unit: ingredient.unit,
                    })),
                    instructions: [], // TODO
                    notes: '', // TODO
                };

                createRecipe(requestBody, {
                    onSuccess: () =>
                        setRecipeCreationStatus(RecipeCreationStatus.SUCCESS),
                    onError: () =>
                        setRecipeCreationStatus(RecipeCreationStatus.FAILED),
                });
            }}
        >
            <h2>Create a New Recipe</h2>

            <div>
                <FormControlLabel
                    control={
                        <TextField
                            type="text"
                            value={recipeName}
                            onChange={(e) =>
                                setRecipeDescription(e.target.value)
                            }
                            placeholder="Enter recipe name"
                            required
                            InputLabelProps={{ required: false }}
                        />
                    }
                    label="Recipe Name:"
                    labelPlacement="start"
                ></FormControlLabel>
            </div>

            <div>
                <FormControlLabel
                    control={
                        <TextField
                            type="text"
                            value={recipeDescription}
                            onChange={(e) =>
                                setRecipeDescription(e.target.value)
                            }
                            placeholder="Enter recipe description"
                            required
                            InputLabelProps={{ required: false }}
                        />
                    }
                    label="Description:"
                    labelPlacement="start"
                ></FormControlLabel>
            </div>
            <div>
                <FormControlLabel
                    control={
                        <TextField
                            type="number"
                            value={prepTime}
                            onChange={(e) =>
                                setPrepTime(Number(e.target.value))
                            }
                            required
                            InputLabelProps={{ required: false }}
                        />
                    }
                    label="Prep Time (in minutes):"
                    labelPlacement="start"
                ></FormControlLabel>
            </div>

            <div>
                <FormControlLabel
                    control={
                        <TextField
                            type="number"
                            value={cookTime}
                            onChange={(e) =>
                                setCookTime(Number(e.target.value))
                            }
                            required
                            InputLabelProps={{ required: false }}
                        />
                    }
                    label="Cook Time (in minutes):"
                    labelPlacement="start"
                ></FormControlLabel>
            </div>

            <div>
                <FormControlLabel
                    control={
                        <Select
                            value={difficulty}
                            onChange={(e) => {
                                if (stringIsRecipeDifficulty(e.target.value)) {
                                    setDifficulty(e.target.value);
                                } else {
                                    alert(
                                        `Error: ${difficulty} is not a valid difficulty`,
                                    );
                                }
                            }}
                        >
                            <MenuItem value="Easy">Easy</MenuItem>
                            <MenuItem value="Intermediate">
                                Intermediate
                            </MenuItem>
                            <MenuItem value="Expert">Expert</MenuItem>
                        </Select>
                    }
                    label="Cook Time (in minutes):"
                    labelPlacement="start"
                ></FormControlLabel>
            </div>

            <div>
                <label>Difficulty:</label>
                <Select
                    value={difficulty}
                    onChange={(e) => {
                        if (stringIsRecipeDifficulty(e.target.value)) {
                            setDifficulty(e.target.value);
                        } else {
                            alert(
                                `Error: ${difficulty} is not a valid difficulty`,
                            );
                        }
                    }}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Expert">Expert</MenuItem>
                </Select>
            </div>

            <div>
                <label>Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <TextField
                            type="text"
                            value={ingredient.name}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    'name',
                                    e.target.value,
                                )
                            }
                            placeholder={`Ingredient ${index + 1}`}
                            required
                        />
                        <TextField
                            type="number"
                            value={ingredient.measurement}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    'measurement',
                                    e.target.value,
                                )
                            }
                            placeholder={`Amount`}
                            required
                        />
                        <TextField
                            type="text"
                            value={ingredient.unit}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    'unit',
                                    e.target.value,
                                )
                            }
                            placeholder={`unit`}
                            required
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
        </form>
    );
}

function stringIsRecipeDifficulty(str: string): str is RecipeDifficulty {
    return ['Easy', 'Intermediate', 'Expert'].includes(str);
}

enum RecipeCreationStatus {
    LOADING,
    SUCCESS,
    FAILED,
}
