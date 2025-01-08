import { defineStore } from "pinia";
import { Meal } from "~/entities/Meal.entity";

/**
 * `useRecipesStore` manages the state for recipes, including the full dataset, 
 * displayed meals, pagination settings, and UI state like loading and availability.
 */
export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    currentMeal: null as Meal | null,
    /**
     * All meals fetched from the API.
     * Used as the full dataset for client-side pagination.
     */
    allMeals: [] as Meal[],

    /**
     * The subset of meals currently displayed to the user.
     * Updated incrementally for client-side pagination.
     */
    displayedMeals: [] as Meal[],

    /**
     * The number of meals displayed per page for pagination.
     */
    pageSize: 5,

    /**
     * The query string used for filtering meals from the API.
     */
    query: "",

    /**
     * Indicates whether a data-fetching operation is in progress.
     */
    isLoading: false,

    /**
     * Indicates whether more data is available for pagination.
     */
    hasMore: true,

    recipeInfoModalVisible: false,

    isLoadingInfo: false,
  }),
  getters: {
    /**
     * Getter for the full dataset of meals.
     * @returns {Meal[]} The complete list of meals.
     */
    allMealsGetter: (state) => state.allMeals,

    /**
     * Getter for the subset of meals currently displayed.
     * @returns {Meal[]} The displayed meals.
     */
    displayedMealsGetter: (state) => state.displayedMeals,

    /**
     * Getter for the current query string.
     * @returns {string} The query used for filtering.
     */
    queryGetter: (state) => state.query,

    recipeInfoModalVisibleGetter: (state) => state.recipeInfoModalVisible,

    currentMealGetter: (state) => state.currentMeal,
  },
  actions: {
    /**
     * Sets the full dataset of meals.
     * @param {Meal[]} meals - The full list of meals fetched from the API.
     */
    setAllMeals(meals: Meal[]) {
      this.allMeals = meals;
    },

    /**
     * Replaces the subset of displayed meals.
     * @param {Meal[]} meals - The meals to display.
     */
    setDisplayedMeals(meals: Meal[]) {
      this.displayedMeals = meals;
    },

    /**
     * Appends additional meals to the currently displayed subset.
     * Used for client-side pagination.
     * @param {Meal[]} meals - The additional meals to append.
     */
    appendDisplayedMeals(meals: Meal[]) {
      this.displayedMeals.push(...meals);
    },

    /**
     * Updates the query string for filtering meals.
     * @param {string} query - The new query string.
     */
    setQuery(query: string) {
      this.query = query;
    },

    /**
     * Updates the loading state.
     * @param {boolean} loading - Whether a data-fetching operation is in progress.
     */
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    setIsLoadingInfo(loading: boolean) {
      this.isLoadingInfo = loading;
    },

    /**
     * Updates the availability of more data for pagination.
     * @param {boolean} hasMore - Whether more data is available.
     */
    setHasMore(hasMore: boolean) {
      this.hasMore = hasMore;
    },

    setRecipeInfoModalVisible(visible: boolean) {
      this.recipeInfoModalVisible = visible;
    },

    setCurrentMeal(meal: Meal | null) {
      this.currentMeal = meal;
    },
  },
});
