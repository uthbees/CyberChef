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
                    <div className="appHeaderIcon appHeaderButton">
                        <ShoppingListButton />
                    </div>
                </div>
            </Stack>
        </AppBar>
    );
}

// TODO: Figure out how to make the mui buttons work with links so that the app
//  header links can be consistent with the icon
function AppHeaderLink({ name, to }: { name: string; to: string }) {
    return (
        <Button
            component={Link}
            to={to}
            className="appHeaderLink appHeaderButton"
        >
            <Typography>{name}</Typography>
        </Button>
    );
}
