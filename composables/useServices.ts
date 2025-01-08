import type { RecipeService } from "~/services/recipe.service";

export const useRecipeService = () => {
    const nuxtApp = useNuxtApp();
    return nuxtApp.$recipeService as RecipeService;
}