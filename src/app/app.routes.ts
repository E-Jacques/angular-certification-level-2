import { Routes } from '@angular/router';
import { cocktailResolver } from './resolvers/cocktail.resolver';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./pages/cocktail-list/cocktail-list.component").then(m => m.CocktailListComponent)
    },
    {
        path: "cocktails/:id",
        loadComponent: () => import("./pages/cocktail-detail/cocktail-detail.component").then(m => m.CocktailDetailComponent),
        resolve: {
            cocktail: cocktailResolver
        }
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    }
];
