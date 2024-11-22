export interface Recipe {
    uuid: string;
    name: string;
    description: string;
    difficulty: RecipeDifficulty;
    prepTimeMin: number;
    cookTimeMin: number;
    ingredients: Ingredient[];
    instructions: string[];
    note: string;
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit?: string;
    // Whether the checkbox in the UI is checked.
    uiChecked?: boolean;
}

export type RecipeDifficulty = 'Easy' | 'Intermediate' | 'Expert';
