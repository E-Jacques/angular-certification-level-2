/**
 * The cocktail object used internally.
 */
export interface Cocktail {
    id: string;
    name: string;
    liked: boolean;
    isAlcoholic: boolean;
    imageUrl: string;
    ingredients: string[];
    instructions: string;
}