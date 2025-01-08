<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRecipesStore } from "~/store/recipes.store";

const { recipeInfoModalVisibleGetter, currentMealGetter, isLoadingInfo } = storeToRefs(useRecipesStore());
const { setRecipeInfoModalVisible } = useRecipesStore();
const meal = computed(() => currentMealGetter.value);

const goBack = () => {
  useRecipeService().fetchAllRecipes();
  navigateTo({ path: "/" });
};

const modalVisible = computed({
  get: () => recipeInfoModalVisibleGetter.value,
  set: (value: boolean) => setRecipeInfoModalVisible(value),
});

</script>

<template>
  <UModal v-model="modalVisible">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header> 
        <p class="text-xl">{{ meal?.strMeal }}</p>
      </template>
      <section v-if="meal && !isLoadingInfo" class="space-y-8">
        <div class="flex space-x-5">
          <div class="flex-1 space-y-5">
            <img :src="meal?.strMealThumb" alt="" srcset="" />
            <p class="text-xl">Instructions</p>
            <p>{{ meal?.strInstructions }}</p>
          </div>
          <div class="flex-1 space-y-5">
            <p class="text-xl">Ingredients</p>
            <IngredientsList :ingredients="meal?.getIngredients()" />
          </div>
        </div>
      </section>
      <div v-else-if="isLoadingInfo">
        <div class="flex justify-center items-center h-full">
          <div class="flex flex-col items-center justify-center space-y-5">
            <UIcon name="emojione-food" class="h-12 w-12" />
            <p>Loading recipe details...</p>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end">
          <UButton
            color="primary"
            variant="ghost"
            @click="modalVisible = false"
            size="xl"
            :trailing="false"
          >
            Close details
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
