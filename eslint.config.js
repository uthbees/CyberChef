import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
        react: react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
    },
    extends: [...tseslint.configs.recommendedTypeChecked],
    rules: {
        ...react.configs.flat.recommended.rules,
        ...react.configs.flat['jsx-runtime'].rules,
        ...reactHooks.configs.recommended.rules,
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                ignoreRestSiblings: true,
            },
        ],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
            project: ['./tsconfig.vite.json', './tsconfig.app.json'],
        },
    },
});
