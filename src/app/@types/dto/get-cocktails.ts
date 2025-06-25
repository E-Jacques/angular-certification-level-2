/**
 * The interface representing a cocktail.
 * 
 * @see GetCocktailsDto
 */
export interface CocktailItem {
    id: string;
    name: string;
    isAlcoholic: boolean;
    imageUrl: string;
    ingredients: string[];
    instructions: string;
}

/**
 * Data Transfer Object for fetching a list of cocktails. This object may be returned by the `GET /cocktails` api.
 */
export type GetCocktailsDto = CocktailItem[];