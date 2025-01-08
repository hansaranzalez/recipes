import { Meal } from "~/entities/Meal.entity";
import { useEndpoints } from "../composables/useEndpoints";
import { useRecipesStore } from "../store/recipes.store";
import type { Pinia } from "pinia";
/**
 * RecipeService manages recipe-related operations, including fetching all recipes,
 * handling client-side pagination, and retrieving details for specific meals.
 */
export class RecipeService {
  // HTTP client for making API requests
  private readonly http = useHttp().http;

  /**
   * Retrieves the Pinia store instance for managing recipe-related state and actions.
   */
  private get store() {
    const nuxtApp = useNuxtApp();
    return useRecipesStore(nuxtApp.$pinia as Pinia);
  }


   /**
   * Fetches all recipes from the API and initializes client-side pagination.
   *
   * - Stores the full list of recipes in the `allMeals` store state.
   * - Initializes the first batch of recipes in the `displayedMeals` store state.
   *
   * @returns {Promise<void>}
   */
  public async fetchAllRecipes(): Promise<void> {
    if (this.store.isLoading) return;

    this.store.setLoading(true);
    this.store.setDisplayedMeals([]);
    this.store.setAllMeals([]);
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


  /**
   * Loads the next batch of recipes for client-side pagination and appends them to the displayed list.
   *
   * - Calculates the range for the next batch based on the current number of displayed recipes.
   * - Stops pagination when no more recipes are available.
   *
   * @returns {void}
   */
  public loadMoreRecipes(): void {
    if (this.store.isLoading || !this.store.hasMore) return;

    const start = this.store.displayedMealsGetter.length;
    const end = start + this.store.pageSize;

    const moreMeals = this.store.allMealsGetter.slice(start, end);
    if (moreMeals.length === 0) {
      this.store.setHasMore(false);
    } else {
      this.store.appendDisplayedMeals(moreMeals as Meal[]);
    }
  }


  /**
   * Fetches details for a specific meal by its ID.
   *
   * @param {string} id - The unique identifier of the meal.
   * @returns {Promise<any>} The details of the meal.
   */
  public async getMealById(id: string): Promise<Meal> {
    const response = await this.http.get(useEndpoints().getMealById(id));
    return Meal.build(response.data.meals[0]);
  }
}
