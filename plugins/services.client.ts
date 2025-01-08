
import { AuthService } from '~/services/auth.service';
import { RecipeService } from '~/services/recipe.service';

export default defineNuxtPlugin((nuxtApp) => {
    const authService = new AuthService();
    const recipeService = new RecipeService();
    return {
        provide: {
            authService,
            recipeService,
        },
    };
});