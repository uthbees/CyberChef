import React, { useState } from 'react';
import RecipeDialog from '../src/dialog';
import { Button } from '@mui/material';

const RecipeSearchPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Example recipe
    const [selectedRecipe, setSelectedRecipe] = useState({
        title: 'Chocolate Cake',
        description: 'A delicious chocolate cake recipe with rich flavors.',
    });

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
                recipe={selectedRecipe}
            />
        </div>
    );
};

export default RecipeSearchPage;
