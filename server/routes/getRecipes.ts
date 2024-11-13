import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

const getRecipes: RequestHandler = async (req, res) => {
    try {
        const db = await openDb();
        const rows = await db.all(
            'SELECT' +
                ' recipes.name, recipes.uuid, recipes.description, recipes.difficulty,' +
                ' recipes.prep_time_min AS prep_time, recipes.cook_time_min AS cook_time, recipes.notes,' +
                ' ingredients.quantity, ingredients.unit, ingredients.ingredient_order, ingredients.name,' +
                ' instructions.text' +
                ' FROM recipes' +
                ' JOIN ingredients ON recipes.recipes_id = ingredients.recipes_id' +
                ' JOIN instructions ON recipes.recipes_id = instructions.recipes_id',
        );
        console.log('Recipes loaded successfully', rows);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error loading recipes', err);
        res.status(500).send();
    }
};

export default getRecipes;
