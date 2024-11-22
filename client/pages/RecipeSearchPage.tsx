import React, { useState } from 'react';
import RecipeDialog from '../src/dialog';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { SelectedRecipesContext } from '../App/SelectedRecipesContextProvider';

const RecipeSearchPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { selectedRecipes, setSelectedRecipes } = useContext(
        SelectedRecipesContext,
    );

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    return (
        <div>
            <h1>Recipe Search</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
            >
                Show Recipe
            </Button>
            <RecipeDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                recipe={selectedRecipes[0]}
            />
        </div>
    );
};

export default RecipeSearchPage;
