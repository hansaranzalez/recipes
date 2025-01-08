import type { AuthService } from "~/services/auth.service";
import type { RecipeService } from "~/services/recipe.service";

export const useAuthService = () => {
    const nuxtApp = useNuxtApp();
    return nuxtApp.$authService as AuthService;
}

export const useRecipeService = () => {
    const nuxtApp = useNuxtApp();
    return nuxtApp.$recipeService as RecipeService;
}