import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

interface Recipe {
    title: string;
    description: string;
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
            <DialogTitle>{recipe.title}</DialogTitle>
            <DialogContent>
                <p>{recipe.description}</p>
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
