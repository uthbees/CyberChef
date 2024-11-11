import { createContext, ReactNode, useMemo, useState } from 'react';
import { Recipe } from './types';
import useInitialSetup from '../utils/useInitialSetup';
import serverUrl from './config/serverUrl';

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
        return {
            recipes,
        };
    }, [recipes]);

    return (
        <AllRecipesContext.Provider value={contextValue}>
            {children}
        </AllRecipesContext.Provider>
    );
}

interface AllRecipesContextValue {
    recipes: Record<string, Recipe>;
}

export const AllRecipesContext = createContext<AllRecipesContextValue>({
    recipes: {},
});
