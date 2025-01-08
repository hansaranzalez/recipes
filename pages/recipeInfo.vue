<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Meal } from '~/entities/Meal.entity';

const route = useRoute();
const meal = ref<Meal | null>(null);

onMounted(async () => {
  const idMeal = route.params.id || route.query.id;
  if (idMeal) {
    const response = await useRecipeService().getMealById(idMeal as string);
    console.log(response);
    meal.value = Meal.build(response.meals[0]);
  }
});
</script>

<template>
  <section v-if="meal" class="max-w-[1200px] mx-auto">
    <div class="flex space-x-5">
      <div class="flex-1 space-y-5">
        <img :src="meal?.strMealThumb" alt="" srcset="" />
        <p class="text-lg">{{ meal?.strMeal }}</p>
        <p>{{ meal?.strInstructions }}</p>
      </div>
      <div class="flex-1 space-y-5">
        <p class="text-lg">Ingredients</p>
        <IngredientsList :ingredients="meal?.getIngredients()" />
      </div>
    </div>
  </section>
</template>