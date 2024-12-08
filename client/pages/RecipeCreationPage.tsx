import React, { useContext, useState } from 'react';
import { PostRecipesBody } from '../../server/routes/postRecipes';
import { AllRecipesContext } from '../App/AllRecipesContextProvider';
import { RecipeDifficulty } from '../App/types';
import {
    Button,
    CircularProgress,
    FormControlLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Grid2,
} from '@mui/material';

export default function RecipeCreationPage() {
    const [recipeCreationStatus, setRecipeCreationStatus] =
        useState<RecipeCreationStatus | null>(null);
    return (
        <div style={{ textAlign: 'center', margin: 50 }}>
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
            [field]: field === 'measurement' ? Number(value) : value,
        };
        setIngredients(newIngredients);
    };

    return (
        <>
            <div
                id="page-title-container"
                style={{
                    textAlign: 'center',
                    marginBottom: '75px',
                }}
            >
                <h1 style={{ fontFamily: 'Rokkitt' }}>Create a New Recipe</h1>
                <p style={{ fontFamily: 'Montserrat' }}>
                    Share your family favorites!
                </p>
            </div>
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
                            setRecipeCreationStatus(
                                RecipeCreationStatus.SUCCESS,
                            ),
                        onError: () =>
                            setRecipeCreationStatus(
                                RecipeCreationStatus.FAILED,
                            ),
                    });
                }}
            >
                <Stack
                    spacing={1}
                    sx={{
                        p: 2,
                        bgcolor: '#E4E2DC',
                        border: '5px solid #201C1C',
                        borderRadius: 5,
                        margin: 'auto',
                        padding: 2,
                    }}
                    maxWidth={1000}
                >
                    <div>
                        <FormControlLabel
                            control={
                                <TextField
                                    sx={{ bgcolor: '#F4F2EC' }}
                                    style={{ margin: 8, width: '500px' }}
                                    type="text"
                                    value={recipeName}
                                    onChange={(e) =>
                                        setRecipeName(e.target.value)
                                    }
                                    label="Enter recipe name"
                                    required
                                />
                            }
                            label="Recipe Name:"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <TextField
                                    sx={{ bgcolor: '#F4F2EC' }}
                                    style={{ margin: 8, width: '500px' }}
                                    type="text"
                                    value={recipeDescription}
                                    onChange={(e) =>
                                        setRecipeDescription(e.target.value)
                                    }
                                    label="Enter description"
                                    required
                                />
                            }
                            label="Description:"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <TextField
                                    sx={{ bgcolor: '#F4F2EC' }}
                                    style={{ margin: 8, width: '75px' }}
                                    type="number"
                                    value={prepTime}
                                    onChange={(e) =>
                                        setPrepTime(Number(e.target.value))
                                    }
                                    required
                                />
                            }
                            label="Prep Time (minutes):"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            style={{ margin: 25 }}
                            control={
                                <TextField
                                    sx={{ bgcolor: '#F4F2EC' }}
                                    style={{ margin: 8, width: '75px' }}
                                    type="number"
                                    value={cookTime}
                                    onChange={(e) =>
                                        setCookTime(Number(e.target.value))
                                    }
                                    required
                                />
                            }
                            label="Cook Time (minutes):"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={
                                <Select
                                    sx={{ bgcolor: '#F4F2EC' }}
                                    style={{ margin: 8 }}
                                    value={difficulty}
                                    onChange={(e) => {
                                        if (
                                            stringIsRecipeDifficulty(
                                                e.target.value,
                                            )
                                        ) {
                                            setDifficulty(e.target.value);
                                        } else {
                                            alert(
                                                `Error: ${difficulty} is not a valid difficulty`,
                                            );
                                        }
                                    }}
                                    variant="outlined"
                                >
                                    <MenuItem value="Easy">Easy</MenuItem>
                                    <MenuItem value="Intermediate">
                                        Intermediate
                                    </MenuItem>
                                    <MenuItem value="Expert">Expert</MenuItem>
                                </Select>
                            }
                            label="Difficulty: "
                            labelPlacement="start"
                        />
                    </div>

                    {/* <div>
                    <FormControlLabel
                        control={
                            <Select
                                style={{ margin: 8 }}
                                value={difficulty}
                                onChange={(e) => {
                                    if (
                                        stringIsRecipeDifficulty(e.target.value)
                                    ) {
                                        setDifficulty(e.target.value);
                                    } else {
                                        alert(
                                            `Error: ${difficulty} is not a valid difficulty`,
                                        );
                                    }
                                }}
                                variant="outlined"
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
                    />
                </div> */}

                    <div style={{ margin: 'auto' }}>
                        <Typography marginBottom={'12px'} marginTop={'20px'}>
                            Ingredients:
                        </Typography>
                        <Grid2
                            container
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            marginX={'125px'}
                            spacing={'25px'}
                        >
                            {ingredients.map((ingredient, index) => (
                                <Grid2
                                    container
                                    size={12}
                                    columns={16}
                                    spacing={'10px'}
                                    key={index}
                                >
                                    <Grid2 size={9}>
                                        <TextField
                                            sx={{ bgcolor: '#F4F2EC' }}
                                            type="text"
                                            value={ingredient.name}
                                            onChange={(e) =>
                                                handleIngredientChange(
                                                    index,
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            label={`Ingredient ${index + 1}`}
                                            fullWidth
                                            required
                                        />
                                    </Grid2>
                                    <Grid2 size={2}>
                                        <TextField
                                            sx={{ bgcolor: '#F4F2EC' }}
                                            type="number"
                                            value={ingredient.measurement}
                                            onChange={(e) =>
                                                handleIngredientChange(
                                                    index,
                                                    'measurement',
                                                    e.target.value,
                                                )
                                            }
                                            label={`Amount`}
                                            fullWidth
                                            required
                                        />
                                    </Grid2>
                                    <Grid2 size={5}>
                                        <TextField
                                            sx={{ bgcolor: '#F4F2EC' }}
                                            type="text"
                                            value={ingredient.unit}
                                            onChange={(e) =>
                                                handleIngredientChange(
                                                    index,
                                                    'unit',
                                                    e.target.value,
                                                )
                                            }
                                            label={`Unit`}
                                            fullWidth
                                            required
                                        />
                                    </Grid2>
                                </Grid2>
                            ))}
                        </Grid2>
                        <br />
                        <Button variant="text" onClick={addIngredient}>
                            Add Ingredient
                        </Button>
                    </div>

                    <br />
                    <br />
                    <br />

                    <div>
                        <Button variant="contained" type="submit">
                            Submit Recipe
                        </Button>
                    </div>
                </Stack>
            </form>
        </>
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
