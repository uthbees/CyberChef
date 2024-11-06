import express from 'express';
import postRecipes from './routes/postRecipes';
import getRecipes from './routes/getRecipes';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/recipes', getRecipes);
app.post('/recipes', postRecipes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
