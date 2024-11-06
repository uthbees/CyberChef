import { RequestHandler } from 'express';

const postRecipes: RequestHandler = (req, res) => {
    // try{
    //     const db = await openDb();
    //     await db.run('INSERT INTO recipes VALUES (?,?,?,?,?,?,?)','cookies',30,60,'Easy',['make dough','put dough on cooking sheet','put in oven','enjoy'],'ad3d4678-857a-499d-8a60-3c1d65836b7c');
    //     res.status(201).json({message: 'Recipe added successfully'});
    //     console.log('Recipe added successfully');
    // } catch (err) {
    //     console.error('Error inserting recipe', err);
    //     res.status(500);
    //     console.log('Error inserting recipe');
    // }
    res.send('stub implementation');
};

export default postRecipes;
