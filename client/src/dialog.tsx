import React from 'react';
import { RecipeDifficulty } from '../App/types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

interface Recipe {
    name: string;
    description: string;
    difficulty: RecipeDifficulty;
    prepTimeMin: number;
    cookTimeMin: number;
    ingredients: Array<string>;
    instructions: Array<string>;
    note: string;
}

interface RecipeDialogProps {
    open: boolean;
    onClose: () => void;
    recipe: Recipe;
}

const RecipeDialog: React.FC<RecipeDialogProps> = ({
    open,
    onClose,
    recipe,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{recipe.name}</DialogTitle>
            <DialogContent>
                <p>
                    prep time:{recipe.prepTimeMin} cook time:
                    {recipe.cookTimeMin}
                </p>
                <p>{recipe.description}</p>
                <p>{recipe.difficulty}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                <p>{recipe.note}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RecipeDialog;
