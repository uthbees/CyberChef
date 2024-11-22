import { createContext, ReactNode, useMemo, useState } from 'react';
import { Recipe } from './types';
import useInitialSetup from '../utils/useInitialSetup';
import serverUrl from './config/serverUrl';
import { PostRecipesBody } from '../../server/routes/postRecipes';

export default function AllRecipesContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [recipes, setRecipes] = useState<Record<string, Recipe>>({});

    useInitialSetup(() => {
        const genericFailMessage =
            'Failed to get recipes data (see console for details).';
        fetch(`${serverUrl}/recipes`).then(
            async (response) => {
                if (!response.ok) {
                    alert(genericFailMessage);
                    console.error('Failed to get recipes data', response);
                    return;
                }

                const decoded: unknown = await response.json();

                if (!Array.isArray(decoded)) {
                    alert(genericFailMessage);
                    console.error(
                        'Failed to get recipes data - server returned invalid data structure',
                        response,
                    );
                    return;
                }

                const recipesObject: Record<string, Recipe> = {};

                decoded.forEach((recipe: Recipe) => {
                    recipesObject[recipe.uuid] = recipe;
                });

                setRecipes(recipesObject);
            },
            (reason) => {
                alert(genericFailMessage);
                console.error('Failed to get recipes data', reason);
            },
        );
    });

    const contextValue = useMemo(() => {
        const createRecipe: CreateRecipeFunction = async (
            requestBody,
            options,
        ) => {
            const result = await fetch(`${serverUrl}/recipes`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
            });

            if (result.ok) {
                const json: unknown = await result.json();
                if (
                    typeof json !== 'object' ||
                    json === null ||
                    !('uuid' in json) ||
                    typeof json.uuid !== 'string'
                ) {
                    throw new Error("Response didn't include uuid");
                }

                const uuid = json.uuid;

                setRecipes((prevState) => ({
                    ...prevState,
                    [uuid]: {
                        uuid,
                        name: requestBody.name,
                        description: requestBody.description,
                        difficulty: requestBody.difficulty,
                        prepTimeMin: requestBody.prep_time,
                        cookTimeMin: requestBody.cook_time,
                        ingredients: requestBody.ingredients,
                        instructions: requestBody.instructions,
                        note: requestBody.notes,
                    },
                }));

                options?.onSuccess?.();
            } else {
                options?.onError?.();
            }
        };

        return {
            recipes,
            createRecipe,
        };
    }, [recipes]);

    return (
        <AllRecipesContext.Provider value={contextValue}>
            {children}
        </AllRecipesContext.Provider>
    );
}

type CreateRecipeFunction = (
    recipe: PostRecipesBody,
    options?: { onSuccess?: () => void; onError?: () => void },
) => void;

interface AllRecipesContextValue {
    recipes: Record<string, Recipe>;
    createRecipe: CreateRecipeFunction;
}

export const AllRecipesContext = createContext<AllRecipesContextValue>({
    recipes: {},
    createRecipe: () => {},
});
