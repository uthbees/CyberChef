import { RequestHandler } from 'express';
import { openDb } from '../utils/openDb';

export interface ApiRecipe {
    uuid: string;
    name: string;
    description: string;
    difficulty: string;
    prep_time: number;
    cook_time: number;
    ingredients: ApiIngredient[];
    instructions: string[];
    notes: string;
}

export interface ApiIngredient {
    name: string;
    quantity: number;
    unit?: string;
}

// The Intermediate interfaces represent the data in the intermediate phase, when it's
// been only partially transformed.
interface IntermediateRecipe extends Omit<ApiRecipe, 'instructions'> {
    instructions: { text: string; step_number: number }[];
    ingredients: IntermediateIngredient[];
}

interface IntermediateIngredient extends ApiIngredient {
    order: number;
}

interface RecipeQueryResult {
    uuid: string;
    recipe_name: string;
    description: string;
    difficulty: string;
    prep_time: number;
    cook_time: number;
    notes: string;
    ingredient_name?: string;
    ingredient_quantity?: number;
    ingredient_unit?: string;
    ingredient_order?: number;
    instruction?: string;
    instruction_step_number?: number;
}

const getRecipes: RequestHandler = async (req, res) => {
    try {
        const db = await openDb();
        // WARNING: This query returns a cartesian product. I'm not sure of the best way to fix it, so since
        // the project is pretty much over, we're leaving it.
        const rows = await db.all(
            'SELECT' +
                ' Recipes.uuid, Recipes.name AS recipe_name, Recipes.description, Recipes.difficulty,' +
                ' Recipes.prep_time_min AS prep_time, Recipes.cook_time_min AS cook_time, Recipes.notes,' +
                ' Ingredients.name AS ingredient_name, Ingredients.quantity AS ingredient_quantity,' +
                ' Ingredients.unit AS ingredient_unit, Ingredients.ingredient_order,' +
                ' Instructions.text AS instruction, Instructions.step_number AS instruction_step_number' +
                ' FROM Recipes' +
                ' LEFT JOIN Ingredients ON Recipes.recipes_id = Ingredients.recipes_id' +
                ' LEFT JOIN Instructions ON Recipes.recipes_id = Instructions.recipes_id',
        );
        const recipeMap: Map<string, IntermediateRecipe> = new Map();
        rows.forEach((row: RecipeQueryResult) => {
            if (!recipeMap.has(row.uuid)) {
                recipeMap.set(row.uuid, {
                    uuid: row.uuid,
                    name: row.recipe_name,
                    description: row.description,
                    difficulty: row.difficulty,
                    prep_time: row.prep_time,
                    cook_time: row.cook_time,
                    ingredients: [],
                    instructions: [],
                    notes: row.notes,
                });
            }
            if (isSet(row.ingredient_name)) {
                if (
                    !isSet(row.ingredient_quantity) ||
                    !isSet(row.ingredient_order)
                ) {
                    throw new Error(
                        'ingredient quantity/order should never be undefined when ingredient_name is defined',
                    );
                }
                const ingredient: IntermediateIngredient = {
                    name: row.ingredient_name,
                    quantity: row.ingredient_quantity,
                    order: row.ingredient_order,
                };
                if (isSet(row.ingredient_unit)) {
                    ingredient.unit = row.ingredient_unit;
                }
                recipeMap.get(row.uuid)!.ingredients.push(ingredient);
            }
            if (isSet(row.instruction)) {
                if (!isSet(row.instruction_step_number)) {
                    throw new Error(
                        'instruction step number should never be undefined when instruction is defined',
                    );
                }
                recipeMap.get(row.uuid)!.instructions.push({
                    text: row.instruction,
                    step_number: row.instruction_step_number,
                });
            }
        });

        const finalRecipes: ApiRecipe[] = Array.from(recipeMap.values()).map(
            convertIntermediateToFinalRecipe,
        );

        console.log('Recipes loaded successfully');
        res.status(200).json(finalRecipes);
    } catch (err) {
        console.error('Error loading recipes', err);
        res.status(500).send();
    }
};

function convertIntermediateToFinalRecipe(
    recipe: IntermediateRecipe,
): ApiRecipe {
    const finalInstructions = recipe.instructions
        .sort((a, b) => a.step_number - b.step_number)
        .map((instruction) => instruction.text);

    const finalIngredients = recipe.ingredients
        .sort((a, b) => a.order - b.order)
        .map((ingredient) => {
            // Remove order
            const { order, ...finalIngredient } = ingredient;
            return finalIngredient;
        });

    return {
        ...recipe,
        instructions: finalInstructions,
        ingredients: finalIngredients,
    };
}

// Utility function to check if a variable is either null or undefined.
function isSet<T>(variable: T | undefined | null): variable is T {
    return variable !== null && variable !== undefined;
}

export default getRecipes;
