import { Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function AppFrame() {
    return (
        <>
            <Stack direction="row" spacing={1}>
                <Link to="/">React demo page</Link>
                <Link to="/recipes">Search recipes</Link>
                <Link to="/recipes/create">Create recipe</Link>
            </Stack>
            <Outlet />
        </>
    );
}
