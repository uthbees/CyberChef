import { useContext } from 'react';
import { SelectedRecipesContext } from '../SelectedRecipesContextProvider';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    Typography,
} from '@mui/material';
import { Recipe } from '../types';
import { Close } from '@mui/icons-material';

export default function ShoppingList() {
    const { selectedRecipes } = useContext(SelectedRecipesContext);

    return (
        <div style={{ padding: 16 }}>
            {selectedRecipes.map((recipe) => (
                <RecipeDisplay key={recipe.uuid} recipe={recipe} />
            ))}
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
