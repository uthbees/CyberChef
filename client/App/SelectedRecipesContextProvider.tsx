import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from 'react';
import { Recipe } from './types';
import useInitialSetup from '../utils/useInitialSetup';
import { AllRecipesContext } from './AllRecipesContextProvider';

const LOCALSTORAGE_KEY = 'selectedRecipes';

export default function SelectedRecipesContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { recipes } = useContext(AllRecipesContext);

    const [savedSelectedRecipes, setSavedSelectedRecipes] = useState<
        SavedSelectedRecipe[]
    >([]);

    useInitialSetup(() => {
        const rawSavedSelectedRecipes = localStorage.getItem(LOCALSTORAGE_KEY);

        if (rawSavedSelectedRecipes === null) {
            return;
        }

        let parsedSavedSelectedRecipes: SavedSelectedRecipe[];
        try {
            parsedSavedSelectedRecipes = JSON.parse(
                rawSavedSelectedRecipes,
            ) as unknown as SavedSelectedRecipe[];
        } catch (e) {
            alert('Error: Failed to parse saved selected recipes.');
            return;
        }

        setSavedSelectedRecipes(parsedSavedSelectedRecipes);
    });

    const selectedRecipesContextValue: SelectedRecipesContextValue =
        useMemo(() => {
            function handleUpdateSelectedRecipes(
                setStateAction: SetStateAction<SavedSelectedRecipe[]>,
            ) {
                setSavedSelectedRecipes((prevState) => {
                    let newSelectedRecipes: SavedSelectedRecipe[];
                    if (typeof setStateAction === 'function') {
                        newSelectedRecipes = setStateAction(prevState);
                    } else {
                        newSelectedRecipes = setStateAction;
                    }

                    localStorage.setItem(
                        LOCALSTORAGE_KEY,
                        JSON.stringify(newSelectedRecipes),
                    );

                    return newSelectedRecipes;
                });
            }

            function setSelectedRecipeUuids(
                setStateAction: SetStateAction<string[]>,
            ) {
                handleUpdateSelectedRecipes((prevState) => {
                    let newUuids: string[];
                    if (typeof setStateAction === 'function') {
                        newUuids = setStateAction(
                            prevState.map((recipe) => recipe.uuid),
                        );
                    } else {
                        newUuids = setStateAction;
                    }

                    const newSelectedRecipes: SavedSelectedRecipe[] =
                        newUuids.map((uuid) => ({
                            uuid,
                            ingredientCheckedStatuses: [],
                        }));
                    prevState.forEach((prevSelectedRecipe) => {
                        const recipeIndex = newSelectedRecipes.findIndex(
                            (newSelectedRecipe) =>
                                newSelectedRecipe.uuid ==
                                prevSelectedRecipe.uuid,
                        );
                        if (recipeIndex !== -1) {
                            newSelectedRecipes[
                                recipeIndex
                            ].ingredientCheckedStatuses =
                                prevSelectedRecipe.ingredientCheckedStatuses;
                        }
                    });

                    return newSelectedRecipes;
                });
            }

            function setIngredientCheckedStatus(
                recipeUuid: string,
                ingredientIndex: number,
                newStatus: boolean,
            ) {
                handleUpdateSelectedRecipes((prevState) => {
                    const newSelectedRecipes = structuredClone(prevState);

                    const updatedRecipeIndex = prevState.findIndex(
                        (recipe) => recipe.uuid === recipeUuid,
                    );
                    if (updatedRecipeIndex === -1) {
                        alert(
                            `Error: Failed to find recipe with uuid ${recipeUuid}.`,
                        );
                        return prevState;
                    }

                    newSelectedRecipes[
                        updatedRecipeIndex
                    ].ingredientCheckedStatuses[ingredientIndex] = newStatus;

                    return newSelectedRecipes;
                });
            }

            return {
                selectedRecipes: savedSelectedRecipes
                    .map(
                        (savedSelectedRecipe) =>
                            recipes[savedSelectedRecipe.uuid],
                    )
                    .filter((recipe) => recipe !== undefined),
                setSelectedRecipeUuids,
                setIngredientCheckedStatus,
            };
        }, [recipes, savedSelectedRecipes]);

    return (
        <SelectedRecipesContext.Provider value={selectedRecipesContextValue}>
            {children}
        </SelectedRecipesContext.Provider>
    );
}

interface SelectedRecipesContextValue {
    selectedRecipes: Recipe[];
    setSelectedRecipeUuids: Dispatch<SetStateAction<string[]>>;
    setIngredientCheckedStatus: (
        recipeUuid: string,
        ingredientIndex: number,
        newStatus: boolean,
    ) => void;
}

export const SelectedRecipesContext =
    createContext<SelectedRecipesContextValue>({
        selectedRecipes: [],
        setSelectedRecipeUuids: () => null,
        setIngredientCheckedStatus: () => null,
    });

interface SavedSelectedRecipe {
    uuid: string;
    ingredientCheckedStatuses: boolean[];
}
