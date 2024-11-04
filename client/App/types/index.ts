export interface Recipe {
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
    unit: string;
}

export enum RecipeDifficulty {
    EASY = 'Easy',
    INTERMEDIATE = 'Intermediate',
    EXPERT = 'Expert',
}
