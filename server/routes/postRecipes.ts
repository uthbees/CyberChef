import { RequestHandler } from 'express';
import { type } from 'arktype';
import { openDb } from '../utils/openDb';
import { v4 as uuidV4 } from 'uuid';

const postRecipes: RequestHandler = async (req, res) => {
    const uuid = uuidV4();

    const requestBody = postRecipesBody(req.body);
    if (requestBody instanceof type.errors) {
        res.status(400).send(`Invalid request body: ${requestBody.message}`);
        return;
    }

    let db;
    try {
        db = await openDb();
    } catch (err) {
        console.error('Failed to open database', err);
        res.status(500).send();
        return;
    }

    try {
        await db.run('BEGIN TRANSACTION');

        const insertResult = await db.run(
            'INSERT INTO Recipes' +
                ' (uuid, name, description, difficulty, prep_time_min, cook_time_min, notes)' +
                ' VALUES (?,?,?,?,?,?,?)',
            uuid,
            requestBody.name,
            requestBody.description,
            requestBody.difficulty,
            requestBody.prep_time,
            requestBody.cook_time,
            requestBody.notes,
        );

        for (const instructionIndex of requestBody.instructions.keys()) {
            await db.run(
                'INSERT INTO Instructions (text, step_number, Recipes_id) VALUES (?,?,?)',
                requestBody.instructions[instructionIndex],
                instructionIndex,
                insertResult.lastID,
            );
        }

        for (const ingredientIndex of requestBody.ingredients.keys()) {
            await db.run(
                'INSERT INTO Ingredients (name, quantity, unit, ingredient_order, Recipes_id) VALUES (?, ?, ?, ?, ?)',
                requestBody.ingredients[ingredientIndex].name,
                requestBody.ingredients[ingredientIndex].quantity,
                requestBody.ingredients[ingredientIndex].unit,
                ingredientIndex,
                insertResult.lastID,
            );
        }

        await db.run('COMMIT');

        res.status(201).json({ uuid });
        console.log('Recipe added successfully');
    } catch (err) {
        console.error('Error inserting recipe', err);
        res.status(500).send();

        await db.run('ROLLBACK');
    }
};

export default postRecipes;

const ingredient = type({
    quantity: type.number.atLeast(1),
    unit: type.string.optional().atLeastLength(1).atMostLength(100),
    name: type.string.atLeastLength(1).atMostLength(100),
});

const postRecipesBody = type({
    name: type.string.atLeastLength(1).atMostLength(100),
    description: type.string.atLeastLength(1).atMostLength(5000),
    difficulty: "'Easy' | 'Intermediate' | 'Advanced'",
    prep_time: type.number.atLeast(1).atMost(1000),
    cook_time: type.number.atLeast(1).atMost(1000),
    ingredients: ingredient.array(),
    instructions: type.string.atLeastLength(1).atMostLength(1000).array(),
    notes: type.string.atLeastLength(0).atMostLength(5000),
});
export type PostRecipesBody = typeof postRecipesBody.infer;
