<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Meal } from "~/entities/Meal.entity";

const route = useRoute();
const meal = ref<Meal | null>(null);

const goBack = () => {
  useRecipeService().fetchAllRecipes();
  navigateTo({ path: "/" });
};

onMounted(async () => {
  const idMeal = route.params.id || route.query.id;
  if (idMeal) {
    const response = await useRecipeService().getMealById(idMeal as string);
    meal.value = response;
  }
});
</script>

<template>
  <UModal>
    <template #content>
      <section v-if="meal" class="max-w-[1200px] mx-auto py-5 space-y-8">
        <div>
          <UButton variant="ghost" label="Go back" @click="goBack" />
        </div>
        <div class="flex space-x-5">
          <div class="flex-1 space-y-5">
            <p class="text-xl">{{ meal?.strMeal }}</p>
            <img :src="meal?.strMealThumb" alt="" srcset="" />
            <p>{{ meal?.strInstructions }}</p>
          </div>
          <div class="flex-1 space-y-5">
            <p class="text-xl">Ingredients</p>
            <IngredientsList :ingredients="meal?.getIngredients()" />
          </div>
        </div>
      </section>
    </template>
  </UModal>
</template>
