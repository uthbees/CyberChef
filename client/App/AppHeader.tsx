import { Link } from 'react-router-dom';
import { AppBar, Button, Stack, Typography } from '@mui/material';
import ShoppingListButton from './ShoppingListButton';

export default function AppHeader() {
    return (
        <AppBar position="sticky" style={{ padding: 10 }}>
            <Stack direction="row" spacing={1} style={{ alignItems: 'center' }}>
                <Typography
                    component="span"
                    style={{ fontSize: 30, paddingRight: 20 }}
                >
                    CyberChef
                </Typography>
                <AppHeaderLink name="Browse Recipes" to="/recipes" />
                <AppHeaderLink name="Create Recipe" to="/recipes/create" />
                <div style={{ marginLeft: 'auto' }}>
                    <ShoppingListButton />
                </div>
            </Stack>
        </AppBar>
    );
}

function AppHeaderLink({ name, to }: { name: string; to: string }) {
    return (
        <Button
            component={Link}
            to={to}
            style={{ color: 'white' }}
            variant="outlined"
        >
            <Typography>{name}</Typography>
        </Button>
    );
}
