import { useContext } from 'react';
import { AllRecipesContext } from '../App/AllRecipesContextProvider';

export default function RecipeSearchPage() {
    const { recipes } = useContext(AllRecipesContext);

    return Object.values(recipes).map((r, index) => (
        <p key={index}>{r.name}</p>
    ));
}
