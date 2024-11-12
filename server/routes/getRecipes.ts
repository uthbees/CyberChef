import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

const getRecipes: RequestHandler = async (req, res) => {
    try {
        const db = await openDb();
        const rows = await db.all(
            'SELECT' +
                ' name, uuid, description, difficulty,' +
                ' prep_time_min AS prep_time, cook_time_min AS cook_time, notes' +
                ' FROM recipes',
        );
        console.log('Recipes loaded successfully', rows);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error loading recipes', err);
        res.status(500).send();
    }
};

export default getRecipes;
