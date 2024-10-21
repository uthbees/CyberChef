import { RequestHandler } from 'express';

const getRecipes: RequestHandler = (req, res) => {
    res.send('stub implementation');
};

export default getRecipes;
