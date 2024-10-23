import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function AppHeader() {
    return (
        <Stack
            direction="row"
            spacing={1}
            style={{ borderBottom: '1px solid black', height: '50px' }}
        >
            <Link to="/">React demo page</Link>
            <Link to="/recipes">Search recipes</Link>
            <Link to="/recipes/create">Create recipe</Link>
        </Stack>
    );
}
