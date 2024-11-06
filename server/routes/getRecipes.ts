import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

const getRecipes: RequestHandler = async (req, res) => {
    try {
        const db = await openDb();
        const rows = await db.all('SELECT * FROM recipes');
        // console.log('Recipes loaded successfully');
        res.status(200);
        res.json(rows);
    } catch (err) {
        console.error('Error loading recipes', err);
        res.status(500);
    }
};

export default getRecipes;
