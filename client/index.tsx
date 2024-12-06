import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';

const themeOptions = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { display: 'none' },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                asterisk: { display: 'none' },
            },
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={themeOptions}>
            <App />
        </ThemeProvider>
    </StrictMode>,
);
