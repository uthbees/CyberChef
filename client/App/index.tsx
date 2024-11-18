import './styles/index.css';
import AppRouter from './AppRouter';
import SelectedRecipesContextProvider from './SelectedRecipesContextProvider';
import AllRecipesContextProvider from './AllRecipesContextProvider';

export default function App() {
    return (
        <AllRecipesContextProvider>
            <SelectedRecipesContextProvider>
                <AppRouter />
            </SelectedRecipesContextProvider>
        </AllRecipesContextProvider>
    );
}
