import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppFrame from './AppFrame';
import RecipeSearchPage from '../pages/RecipeSearchPage';
import RecipeCreationPage from '../pages/RecipeCreationPage';
import ReactDemoPage from '../pages/ReactDemoPage';

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
                element: <ReactDemoPage />,
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
