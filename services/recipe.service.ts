import { Meal } from "~/entities/Meal.entity";
import { useEndpoints } from "../composables/useEndpoints";
import { useRecipesStore } from "../store/recipes.store";
import type { Pinia } from "pinia";

export class RecipeService {
  private readonly http = useHttp().http;

  private get store() {
    const nuxtApp = useNuxtApp();
    return useRecipesStore(nuxtApp.$pinia as Pinia);
  }

  public async fetchAllRecipes() {
    if (this.store.isLoading) return;

    this.store.setLoading(true);
    try {
      const query = this.store.queryGetter || '';
      const response = await this.http.get(useEndpoints().getAllRecipes(query));
      const meals = response.data.meals.map((meal: any) => Meal.build(meal));
      this.store.setAllMeals(meals);
      this.store.setDisplayedMeals(meals.slice(0, this.store.pageSize));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      this.store.setLoading(false);
    }
  }

  public loadMoreRecipes() {
    if (this.store.isLoading || !this.store.hasMore) return;

    const start = this.store.displayedMealsGetter.length;
    const end = start + this.store.pageSize;

    const moreMeals = this.store.allMealsGetter.slice(start, end);
    if (moreMeals.length === 0) {
      this.store.setHasMore(false); // No more meals to load
    } else {
      this.store.appendDisplayedMeals(moreMeals);
    }
  }

  public async getMealById(id: string) {
    const response = await this.http.get(useEndpoints().getMealById(id));
    return response.data;
  }
}
