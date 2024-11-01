import { useContext } from 'react';
import { SelectedRecipesContext } from '../SelectedRecipesContextProvider';
import { Button } from '@mui/material';
import { RecipeDifficulty } from '../types';

export default function ShoppingList() {
    const { selectedRecipes, setSelectedRecipes } = useContext(
        SelectedRecipesContext,
    );

    return (
        <div>
            <div>{JSON.stringify(selectedRecipes)}</div>
            <Button
                onClick={() =>
                    setSelectedRecipes((prevState) => [
                        ...prevState,
                        {
                            name: 'test name',
                            description: 'test description',
                            difficulty: RecipeDifficulty.EASY,
                            prepTimeMin: 10,
                            cookTimeMin: 10,
                            ingredients: [],
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
