<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecipesStore } from '~/store/recipes.store';

const { allMealsGetter } = storeToRefs(useRecipesStore());
const selectedIngredient = ref('');
const ingredientsList = computed(() => {
  const ingredients = new Set<string>();
  allMealsGetter.value.forEach((meal) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal.getIngredients()[i - 1];
      if (ingredient) {
        ingredients.add(ingredient);
      }
    }
  });
  return Array.from(ingredients).sort();
});

const filteredMeals = computed(() => {
  if (!selectedIngredient.value) return allMealsGetter.value;
  return allMealsGetter.value.filter((meal) =>
    meal.getIngredients().includes(selectedIngredient.value)
  );
});

const { setDisplayedMeals } = useRecipesStore();

const handleFilter = () => {
  setDisplayedMeals(filteredMeals.value); // Update displayed meals based on the filter
};
</script>

<template>
  <div>
    <div class="mb-4">
      <label for="ingredient-filter" class="block mb-2 text-sm font-medium">Filter by Ingredient:</label>
      <select
        id="ingredient-filter"
        v-model="selectedIngredient"
        @change="handleFilter"
        class="w-full p-2 border rounded"
      >
        <option value="">All Ingredients</option>
        <option v-for="ingredient in ingredientsList" :key="ingredient" :value="ingredient">
          {{ ingredient }}
        </option>
      </select>
    </div>
  </div>
</template>
