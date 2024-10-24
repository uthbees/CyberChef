import { IconButton } from '@mui/material';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ShoppingListButton() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setModalOpen((prevState) => !prevState)}>
                <ShoppingCartIcon htmlColor="white" />
            </IconButton>
        </>
    );
}
