<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRecipeForm } from '../composables/useRecipeForm'
import type { Recipe, MealType } from '../../domain/entities'

const emit = defineEmits<{ submit: [recipe: Omit<Recipe, 'id'>] }>()

const { t } = useI18n()
const { name, mealType, notes, ingredients, addIngredient, removeIngredient, validate, toRecipeInput } =
  useRecipeForm()

const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Bento', 'Snack']

const errors = ref<string[]>([])

function handleSubmit() {
  errors.value = validate()
  if (errors.value.length === 0) {
    emit('submit', toRecipeInput())
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <input
        v-model="name"
        type="text"
        :placeholder="t('recipe.form.namePlaceholder')"
        class="w-full border rounded px-3 py-2 text-sm"
      />
    </div>

    <div>
      <select v-model="mealType" class="border rounded px-3 py-2 text-sm">
        <option value="">{{ t('recipe.form.mealType') }}</option>
        <option v-for="type in MEAL_TYPES" :key="type" :value="type">
          {{ t(`recipe.mealType.${type}`) }}
        </option>
      </select>
    </div>

    <div>
      <p class="text-sm font-medium mb-2">{{ t('recipe.form.ingredientsHeading') }}</p>

      <div v-for="(row, index) in ingredients" :key="row.id" class="flex gap-2 mb-2">
        <input
          v-model="row.name"
          type="text"
          :placeholder="t('recipe.form.ingredientNamePlaceholder')"
          class="flex-1 border rounded px-3 py-2 text-sm"
        />
        <input
          v-model="row.quantity"
          type="text"
          :placeholder="t('recipe.form.quantityPlaceholder')"
          class="w-28 border rounded px-3 py-2 text-sm"
        />
        <button type="button" class="text-sm text-red-500" @click="removeIngredient(index)">
          {{ t('recipe.form.removeIngredient') }}
        </button>
      </div>

      <button type="button" class="text-sm text-blue-600 mt-2" @click="addIngredient">
        + {{ t('recipe.form.addIngredient') }}
      </button>
    </div>

    <div>
      <textarea
        v-model="notes"
        :placeholder="t('recipe.form.notesPlaceholder')"
        class="w-full border rounded px-3 py-2 text-sm"
        rows="3"
      />
    </div>

    <ul v-if="errors.length" class="text-sm text-red-600 space-y-1">
      <li v-for="error in errors" :key="error">{{ t(error) }}</li>
    </ul>

    <button type="submit" class="bg-blue-600 text-white rounded px-4 py-2 text-sm">
      {{ t('recipe.form.saveButton') }}
    </button>
  </form>
</template>
