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
                    <DialogTitle>{recipe.name}</DialogTitle>
                    <DialogContent>
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
                <DialogTitle>{recipe.name}</DialogTitle>
                <DialogContent>
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
                    <p>Additional Notes:</p>
                    <p>{recipe.note}</p>
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
            <DialogTitle>{recipe.name}</DialogTitle>
            <DialogContent>
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
