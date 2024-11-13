import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

const getRecipes: RequestHandler = async (req, res) => {
    try {
        const db = await openDb();
        const rows = await db.all(
            'SELECT recipes.name, recipes.difficulty, recipes.prep_time_min, recipes.cook_time_min, recipes.uuid ,ingredients.name, instructions.text, recipes_has_ingredients.quantity, recipes_has_ingredients.unit FROM recipes JOIN recipes_has_ingredients ON recipes.recipes_id = recipes_has_ingredients.recipes_id JOIN instructions ON recipes_has_ingredients.recipes_id = instructions.recipes_id JOIN ingredients ON recipes_has_ingredients.ingredients_id = ingredients.ingredients_id',
        );
        // console.log('Recipes loaded successfully');
        res.status(200);
        res.json(rows);
    } catch (err) {
        console.error('Error loading recipes', err);
        res.status(500);
    }
};

export default getRecipes;
