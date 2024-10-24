import { Link } from 'react-router-dom';
import { AppBar, Stack, Typography } from '@mui/material';

export default function AppHeader() {
    return (
        <AppBar position="sticky">
            <Stack direction="row" spacing={1} style={{ alignItems: 'center' }}>
                <Typography
                    component="span"
                    style={{ fontSize: 30, padding: 10, paddingRight: 20 }}
                >
                    CyberChef
                </Typography>
                <AppHeaderLink name="Browse Recipes" to="/recipes" />
                <AppHeaderLink name="Create Recipe" to="/recipes/create" />
            </Stack>
        </AppBar>
    );
}

function AppHeaderLink({ name, to }: { name: string; to: string }) {
    return (
        <Link to={to} className="appHeaderLink">
            <Typography>{name}</Typography>
        </Link>
    );
}
