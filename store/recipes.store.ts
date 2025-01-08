import { defineStore } from "pinia";
import { Meal } from "~/entities/Meal.entity";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    allMeals: [] as Meal[],
    displayedMeals: [] as Meal[],
    pageSize: 5,
    query: "",
    isLoading: false,
    hasMore: true,
  }),
  getters: {
    allMealsGetter: (state) => state.allMeals,
    displayedMealsGetter: (state) => state.displayedMeals,
    queryGetter: (state) => state.query,
  },
  actions: {
    setAllMeals(meals: Meal[]) {
      this.allMeals = meals;
    },
    setDisplayedMeals(meals: Meal[]) {
      this.displayedMeals = meals;
    },
    appendDisplayedMeals(meals: Meal[]) {
      this.displayedMeals.push(...meals);
    },
    setQuery(query: string) {
      this.query = query;
    },
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
    setHasMore(hasMore: boolean) {
      this.hasMore = hasMore;
    },
  },
});
