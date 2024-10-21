import express from 'express';
import postRecipes from './routes/postRecipes';
import getRecipes from './routes/getRecipes';

const app = express();
const port = 3001;

app.get('/recipes', getRecipes);
app.post('/recipes', postRecipes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
