import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

const getRecipes: RequestHandler = async (req, res) => {
    try {
        const db = await openDb();
        const rows = await db.all(
            'SELECT * FROM recipes, ingredients, instructions, recipes_has_ingredients',
        );
        // console.log('Recipes loaded successfully');
        // rows = await db.all('SELECT * FROM ingredients');
        // rows += db.all('SELECT * FROM instructions');
        // rows += db.all('SELECT * FROM recipes_has_ingredients');
        res.status(200);
        res.json(rows);
    } catch (err) {
        console.error('Error loading recipes', err);
        res.status(500);
    }
};

export default getRecipes;
