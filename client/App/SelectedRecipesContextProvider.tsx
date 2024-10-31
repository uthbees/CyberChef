import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from 'react';
import { Recipe } from './types';
import useInitialSetup from '../utils/useInitialSetup';

export default function SelectedRecipesContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

    useInitialSetup(() => {
        const rawSavedSelectedRecipes = localStorage.getItem('selectedRecipes');

        if (rawSavedSelectedRecipes === null) {
            return;
        }

        let parsedSavedSelectedRecipes: Recipe[];
        try {
            parsedSavedSelectedRecipes = JSON.parse(
                rawSavedSelectedRecipes,
            ) as unknown as Recipe[];
        } catch (e) {
            alert('Error: Failed to parse saved selected recipes.');
            return;
        }

        setSelectedRecipes(parsedSavedSelectedRecipes);
    });

    const selectedRecipesContextValue: SelectedRecipesContextValue =
        useMemo(() => {
            function updateSelectedRecipes(
                setStateAction: SetStateAction<Recipe[]>,
            ) {
                setSelectedRecipes((prevState) => {
                    let newSelectedRecipes: Recipe[];
                    if (typeof setStateAction === 'function') {
                        newSelectedRecipes = setStateAction(prevState);
                    } else {
                        newSelectedRecipes = setStateAction;
                    }

                    localStorage.setItem(
                        'selectedRecipes',
                        JSON.stringify(newSelectedRecipes),
                    );

                    return newSelectedRecipes;
                });
            }

            return {
                selectedRecipes,
                setSelectedRecipes: updateSelectedRecipes,
            };
        }, [selectedRecipes]);

    return (
        <SelectedRecipesContext.Provider value={selectedRecipesContextValue}>
            {children}
        </SelectedRecipesContext.Provider>
    );
}

interface SelectedRecipesContextValue {
    selectedRecipes: Recipe[];
    setSelectedRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

export const SelectedRecipesContext =
    createContext<SelectedRecipesContextValue>({
        selectedRecipes: [],
        setSelectedRecipes: () => null,
    });
