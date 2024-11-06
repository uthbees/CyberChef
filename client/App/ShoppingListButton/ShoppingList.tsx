import { useContext } from 'react';
import { SelectedRecipesContext } from '../SelectedRecipesContextProvider';
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    Typography,
} from '@mui/material';
import { Recipe, RecipeDifficulty } from '../types';
import { Close } from '@mui/icons-material';

export default function ShoppingList() {
    const { selectedRecipes, setSelectedRecipes } = useContext(
        SelectedRecipesContext,
    );

    return (
        <div>
            <div style={{ padding: 16 }}>
                {selectedRecipes.map((recipe) => (
                    <RecipeDisplay key={recipe.uuid} recipe={recipe} />
                ))}
            </div>
            <Button
                onClick={() =>
                    setSelectedRecipes((prevState) => [
                        ...prevState,
                        {
                            // Just put something unique in there for now since it's not going into the database
                            uuid: Math.random().toString(36),
                            name: 'test name',
                            description: 'test description',
                            difficulty: RecipeDifficulty.EASY,
                            prepTimeMin: 10,
                            cookTimeMin: 10,
                            ingredients: [
                                { name: 'test ingredient', quantity: 3 },
                                {
                                    name: 'test ingredient 2',
                                    quantity: 6,
                                    unit: 'kilometer',
                                },
                            ],
                            instructions: [],
                            note: '',
                        },
                    ])
                }
            >
                Add new recipe
            </Button>
        </div>
    );
}

function RecipeDisplay({ recipe }: { recipe: Recipe }) {
    const { setIngredientCheckedStatus, setSelectedRecipes } = useContext(
        SelectedRecipesContext,
    );

    const recipeChecked = recipe.ingredients.every(
        (ingredient) => ingredient.uiChecked,
    );
    const recipeIndeterminate =
        !recipeChecked &&
        recipe.ingredients.some((ingredient) => ingredient.uiChecked);

    return (
        <FormGroup style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={recipeChecked}
                            indeterminate={recipeIndeterminate}
                            onClick={() => {
                                recipe.ingredients.forEach((_, index) =>
                                    setIngredientCheckedStatus(
                                        recipe.uuid,
                                        index,
                                        !recipeChecked,
                                    ),
                                );
                            }}
                        />
                    }
                    label={
                        <Typography
                            variant="h5"
                            style={{ textAlign: 'center' }}
                        >
                            {recipe.name}
                        </Typography>
                    }
                />
                <IconButton
                    onClick={() =>
                        setSelectedRecipes((prevState) =>
                            prevState.filter(
                                (stateRecipe) =>
                                    stateRecipe.uuid !== recipe.uuid,
                            ),
                        )
                    }
                >
                    <Close />
                </IconButton>
            </div>
            {recipe.ingredients.map((ingredient, index) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            checked={ingredient.uiChecked}
                            onClick={(event) =>
                                setIngredientCheckedStatus(
                                    recipe.uuid,
                                    index,
                                    // @ts-expect-error - This needs a special type library that I don't want to bother
                                    // tracking down and installing.
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                    event.target.checked,
                                )
                            }
                        />
                    }
                    label={ingredient.name}
                    style={{ marginLeft: 8 }}
                />
            ))}
        </FormGroup>
    );
}
