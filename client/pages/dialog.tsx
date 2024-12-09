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
    Chip,
    Divider,
} from '@mui/material';

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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography variant="h3">{toTitleCase(recipe.name)}</Typography>
            </DialogTitle>
            <DialogContent style={{ width: 600 }}>
                <Typography variant="body2" fontSize={16}>
                    <p>
                        Prep time: {recipe.prepTimeMin} minutes
                        <br />
                        Cook time: {recipe.cookTimeMin} minutes
                        <br />
                        Total time: {recipe.prepTimeMin +
                            recipe.cookTimeMin}{' '}
                        minutes
                    </p>
                    <p>
                        Difficulty:{' '}
                        <Chip
                            label={recipe.difficulty}
                            color={
                                recipe.difficulty === 'Easy'
                                    ? 'success'
                                    : recipe.difficulty === 'Intermediate'
                                      ? 'warning'
                                      : 'error'
                            }
                        />
                    </p>
                    <p>{recipe.description}</p>
                    <Divider />
                    <p>Ingredients:</p>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.quantity} {ingredient.unit}{' '}
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    {(() => {
                        if (recipe.instructions.length > 0) {
                            return (
                                <>
                                    <p>Instructions:</p>
                                    <ol>
                                        {recipe.instructions.map(
                                            (instruction, index) => (
                                                <li key={index}>
                                                    {instruction}
                                                </li>
                                            ),
                                        )}
                                    </ol>
                                </>
                            );
                        }
                    })()}
                    {(() => {
                        if (recipe.note !== '') {
                            return <p>{recipe.note}</p>;
                        }
                    })()}
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
