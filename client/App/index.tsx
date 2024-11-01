import './styles/index.css';
import AppRouter from './AppRouter';
import SelectedRecipesContextProvider from './SelectedRecipesContextProvider';

export default function App() {
    return (
        <SelectedRecipesContextProvider>
            <AppRouter />
        </SelectedRecipesContextProvider>
    );
}
