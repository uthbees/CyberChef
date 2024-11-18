import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

interface Recipe {
    uuid: string;
    recipe_name: string;
    description: string;
    difficulty: string;
    prep_time: number;
    cook_time: number;
    notes: string;
    ingredients: Ingredient[];
    instructions: Instructions[];
}

interface RecipeDetails {
    uuid: string;
    recipe_name: string;
    description: string;
    difficulty: string;
    prep_time: number;
    cook_time: number;
    notes: string;
    ingredient_name: string;
    quantity: number;
    unit: string;
    text: string;
}

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

interface Instructions {
    text: string;
}

const getRecipes: RequestHandler = async (req, res) => {
    try {
        const db = await openDb();
        const rows = await db.all(
            'SELECT' +
                ' recipes.name AS recipe_name, recipes.uuid, recipes.description, recipes.difficulty,' +
                ' recipes.prep_time_min AS prep_time, recipes.cook_time_min AS cook_time, recipes.notes,' +
                ' ingredients.quantity, ingredients.unit, ingredients.ingredient_order, ingredients.name AS ingredient_name,' +
                ' instructions.text' +
                ' FROM recipes' +
                ' JOIN ingredients ON recipes.recipes_id = ingredients.recipes_id' +
                ' JOIN instructions ON recipes.recipes_id = instructions.recipes_id',
        );
        const recipeMap: Map<string, Recipe> = new Map();
        rows.forEach((row: RecipeDetails) => {
            if (!recipeMap.has(row.uuid)) {
                recipeMap.set(row.uuid, {
                    uuid: row.uuid,
                    recipe_name: row.recipe_name,
                    description: row.description,
                    difficulty: row.difficulty,
                    prep_time: row.prep_time,
                    cook_time: row.cook_time,
                    notes: row.notes,
                    ingredients: [],
                    instructions: [],
                });
            }
            recipeMap.get(row.uuid)!.ingredients.push({
                name: row.ingredient_name,
                quantity: row.quantity,
                unit: row.unit,
            });
            recipeMap.get(row.uuid)!.instructions.push({
                text: row.text,
            });
        });
        console.log('Recipes loaded successfully', rows);
        res.status(200).json(Array.from(recipeMap.values()));
    } catch (err) {
        console.error('Error loading recipes', err);
        res.status(500).send();
    }
};

export default getRecipes;
