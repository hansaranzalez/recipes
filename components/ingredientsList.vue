 <script lang="ts" setup>
 defineProps({
   ingredients: Array as PropType<string[]>,
 });
 </script>
 
 <template>
    <section>
        <div class=" grid grid-cols-2 gap-2">
            <div v-for="ingredient in ingredients" class="flex space-x-2">
                <UIcon name="emojione-cooking" class="h-6 w-6" />
                <p>{{ ingredient }}</p>
            </div>
        </div>
    </section>
 </template>
 