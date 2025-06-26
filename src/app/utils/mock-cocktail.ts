import { CocktailItem, GetCocktailsDto } from "../@types/dto/get-cocktails";
import { Cocktail } from "../@types/internal/cocktails";

export const COCKTAIL: Cocktail = {
    id: "1",
    name: 'Mojito',
    liked: false,
    isAlcoholic: true,
    imageUrl: 'https://example.com/mojito.jpg',
    ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
    instructions: 'Mix all ingredients and serve chilled.'
};

export const COCKTAIL_ITEM: CocktailItem = {
    id: "my-id",
    name: 'Mojito',
    isAlcoholic: true,
    imageUrl: 'https://example.com/mojito.jpg',
    ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
    instructions: 'Mix all ingredients and serve chilled.'
};

export const COCKTAILS_DTO: GetCocktailsDto = [
    {
        id: "1",
        name: 'Mojito',
        isAlcoholic: true,
        imageUrl: 'https://example.com/mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Rum', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
    },
    {
        id: "2",
        name: 'Virgin Mojito',
        isAlcoholic: false,
        imageUrl: 'https://example.com/virgin-mojito.jpg',
        ingredients: ['Mint', 'Lime', 'Sugar', 'Soda Water'],
        instructions: 'Mix all ingredients and serve chilled.'
    }
];

