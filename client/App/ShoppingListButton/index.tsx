import { Drawer, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ShoppingList from './ShoppingList';
import { Close } from '@mui/icons-material';
import ShoppingListIcon from './ShoppingListIcon';

export default function ShoppingListButton() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <IconButton
                onClick={() => setDrawerOpen((prevState) => !prevState)}
            >
                <ShoppingListIcon />
            </IconButton>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <div
                    style={{
                        width: '35vw',
                        overflowX: 'auto',
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="h4"
                            style={{
                                marginLeft: 32,
                                marginTop: 16,
                                marginBottom: 16,
                            }}
                        >
                            Shopping list
                        </Typography>
                        <div style={{ marginTop: 8, marginRight: 8 }}>
                            <IconButton onClick={() => setDrawerOpen(false)}>
                                <Close />
                            </IconButton>
                        </div>
                    </Stack>
                    <ShoppingList />
                </div>
            </Drawer>
        </>
    );
}
