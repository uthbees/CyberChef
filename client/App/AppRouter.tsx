import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppFrame from './AppFrame';
import RecipeSearchPage from '../pages/RecipeSearchPage';
import RecipeCreationPage from '../pages/RecipeCreationPage';
import HomePage from '../pages/HomePage';

export default function AppRouter() {
    return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppFrame />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/recipes',
                element: <RecipeSearchPage />,
            },
            {
                path: '/recipes/create',
                element: <RecipeCreationPage />,
            },
        ],
    },
]);
