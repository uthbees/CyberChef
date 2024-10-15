import './styles/index.css';
import { Link, Stack } from '@mui/material';
import AppRouter from './AppRouter';

export default function App() {
    return (
        <>
            <Stack direction="row" spacing={1}>
                {/* TODO: create router, swap links with those from react-router so that they don't reload the page */}
                <Link href="/">React demo page</Link>
                <Link href="/recipes">Search recipes</Link>
                <Link href="/recipes/create">Create recipe</Link>
            </Stack>
            <AppRouter />
        </>
    );
}
