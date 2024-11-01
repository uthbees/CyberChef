import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

const getRecipes: RequestHandler = async (req, res) => {
    const db = await openDb();
    res.send('stub implementation');
};

export default getRecipes;
