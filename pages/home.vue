<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRecipesStore } from '~/store/recipes.store';
import type { Meal } from '~/entities/Meal.entity';

const recipeService = useRecipeService();
const { displayedMealsGetter, isLoading, hasMore } = storeToRefs(useRecipesStore());
const sentinel = ref<HTMLDivElement | null>(null);

const loadMore = () => {
  recipeService.loadMoreRecipes();
};

const observer = ref<IntersectionObserver | null>(null);

onMounted(async () => {
  await recipeService.fetchAllRecipes();

  observer.value = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { rootMargin: '200px' }
  );
  if (sentinel.value) {
    observer.value.observe(sentinel.value);
  }
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <div class="max-w-[1200px] mx-auto py-5">
    <div>
        <filter-recipes />
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <recipe-card v-for="meal in displayedMealsGetter" :meal="meal as Meal" :key="meal.idMeal" />
    </div>
    <div ref="sentinel" class="h-10"></div>
    <p v-if="isLoading">Loading...</p>
    <p v-if="!hasMore">No more recipes to display.</p>
  </div>
  <recipe-info />
</template>
