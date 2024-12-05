import React from 'react';
import { RecipeDifficulty } from '../App/types';
import { Recipe } from '../App/types';
import { Ingredient } from '../App/types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Breadcrumbs,
} from '@mui/material';

// interface Recipe {
//     name: string;
//     description: string;
//     difficulty: RecipeDifficulty;
//     prepTimeMin: number;
//     cookTimeMin: number;
//     ingredients: Array<string>;
//     instructions: Array<string>;
//     note: string;
// }

interface RecipeDialogProps {
    open: boolean;
    onClose: () => void;
    recipe: Recipe;
}

function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const RecipeDialog: React.FC<RecipeDialogProps> = ({
    open,
    onClose,
    recipe,
}) => {
    if (!recipe) {
        // alert('No recipe found');
        return null;
    }
    if (recipe.instructions.length === 0) {
        if (recipe.note === '') {
            return (
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>
                        <Typography variant="h2">
                            {toTitleCase(recipe.name)}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="h5">
                            <p> Prep time: {recipe.prepTimeMin} Minutes </p>
                            <p> Cook time: {recipe.cookTimeMin} Minutes </p>
                            <p> Description: {recipe.description}</p>
                            <p> Difficulty: {recipe.difficulty}</p>
                            <p>Ingredients:</p>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.quantity} {ingredient.unit}{' '}
                                        {ingredient.name}
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    <Typography variant="h2">{recipe.name}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h5">
                        <p> prep time:{recipe.prepTimeMin} </p>
                        <p> cook time:{recipe.cookTimeMin} </p>
                        <p> Description: {recipe.description}</p>
                        <p> Difficulty: {recipe.difficulty}</p>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.quantity} {ingredient.unit}{' '}
                                    {ingredient.name}
                                </li>
                            ))}
                        </ul>
                        <p>Additional Notes:</p>
                        <p>{recipe.note}</p>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography variant="h2">{recipe.name}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h5">
                    <p> prep time:{recipe.prepTimeMin} </p>
                    <p> cook time:{recipe.cookTimeMin} </p>
                    <p> Description: {recipe.description}</p>
                    <p> Difficulty: {recipe.difficulty}</p>
                    <p>Ingredients:</p>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.quantity} {ingredient.unit}{' '}
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <p>Instructions:</p>
                    <ol>
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                    <p>Additional Notes:</p>
                    <p>{recipe.note}</p>
                </Typography>
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
