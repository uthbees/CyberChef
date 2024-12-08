import { useContext, useMemo } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SelectedRecipesContext } from '../SelectedRecipesContextProvider';

export default function ShoppingListIcon() {
    const { selectedRecipes } = useContext(SelectedRecipesContext);

    const uncheckedIngredientCount = useMemo(() => {
        let count = 0;

        selectedRecipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (!ingredient.uiChecked) {
                    count++;
                }
            });
        });

        return count;
    }, [selectedRecipes]);

    return (
        <Badge badgeContent={uncheckedIngredientCount} color="error">
            <ShoppingCartIcon />
        </Badge>
    );
}
