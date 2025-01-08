
import { RecipeService } from '~/services/recipe.service';

export default defineNuxtPlugin((nuxtApp) => {
    const recipeService = new RecipeService();
    return {
        provide: {
            recipeService,
        },
    };
});