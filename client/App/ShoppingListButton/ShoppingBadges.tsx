import { useState } from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SelectedRecipesContext } from '../SelectedRecipesContextProvider';
import { useContext } from 'react';

const StyleBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 5px',
    },
}));

export default function ShoppingBadges() {
    const { selectedRecipes, setSelectedRecipes } = useContext(
        SelectedRecipesContext,
    );
    return (
        <IconButton aria-label="cart">
            <StyleBadge badgeContent={3} color="secondary">
                <ShoppingCartIcon />
            </StyleBadge>
        </IconButton>
    );
}
