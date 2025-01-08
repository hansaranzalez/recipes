<script lang="ts" setup>
import { Meal } from "~/entities/Meal.entity";
import { useRecipesStore } from "~/store/recipes.store";
const { setRecipeInfoModalVisible, setCurrentMeal } = useRecipesStore();
const recipeService = useRecipeService();
const router = useRouter();

const props = defineProps({
  meal: Object as PropType<Meal>,
});

const image = computed(() => {
  return props.meal?.strMealThumb ?? "";
});

const navigateToRecipe = () => {
  recipeService.getMealById(props.meal?.idMeal as string);
  setRecipeInfoModalVisible(true);
};
</script>

<template>
  <UCard>
    <img :src="image" @click="navigateToRecipe" />

    <template #footer>
      <div class="space-y-2 cursor-pointer" @click="navigateToRecipe">
        <p class="text-lg">{{ props.meal?.strMeal }}</p>
        <p class="line-clamp-3">{{ props.meal?.strInstructions }}</p>
      </div>
    </template>
  </UCard>
</template>
