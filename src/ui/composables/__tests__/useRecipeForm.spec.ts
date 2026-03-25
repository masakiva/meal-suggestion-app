import { describe, it, expect } from 'vitest'
import { useRecipeForm } from '../useRecipeForm'

describe('useRecipeForm', () => {
  describe('validate', () => {
    it('should return name-required error when name is empty', () => {
      const { validate } = useRecipeForm()
      expect(validate()).toContain('recipe.form.validation.nameRequired')
    })

    it('should return ingredient-required error when no ingredients are added', () => {
      const { name, validate } = useRecipeForm()
      name.value = 'Pasta'
      expect(validate()).toContain('recipe.form.validation.ingredientRequired')
    })

    it('should return no errors when name and at least one ingredient are provided', () => {
      const { name, ingredients, validate } = useRecipeForm()
      name.value = 'Pasta'
      ingredients.value = [{ id: '1', name: 'Pasta', quantity: '' }]
      expect(validate()).toHaveLength(0)
    })
  })

  describe('addIngredient', () => {
    it('should append an empty ingredient row', () => {
      const { ingredients, addIngredient } = useRecipeForm()
      addIngredient()
      expect(ingredients.value).toHaveLength(1)
      expect(ingredients.value[0]!.name).toBe('')
      expect(ingredients.value[0]!.quantity).toBe('')
    })
  })

  describe('removeIngredient', () => {
    it('should remove the ingredient row at the given index', () => {
      const { ingredients, addIngredient, removeIngredient } = useRecipeForm()
      addIngredient()
      addIngredient()
      ingredients.value[0]!.name = 'first'
      ingredients.value[1]!.name = 'second'
      removeIngredient(0)
      expect(ingredients.value).toHaveLength(1)
      expect(ingredients.value[0]!.name).toBe('second')
    })
  })

  describe('toRecipeInput', () => {
    it('should map form state to recipe domain shape', () => {
      const { name, mealType, notes, ingredients, toRecipeInput } = useRecipeForm()
      name.value = 'Pasta Bake'
      mealType.value = 'Dinner'
      notes.value = 'Add cheese'
      ingredients.value = [{ id: 'x', name: 'Pasta', quantity: '200g' }]
      expect(toRecipeInput()).toEqual({
        name: 'Pasta Bake',
        mealType: 'Dinner',
        notes: 'Add cheese',
        ingredients: [{ name: 'Pasta', quantity: '200g' }],
      })
    })

    it('should omit quantity from ingredient when it is empty', () => {
      const { name, ingredients, toRecipeInput } = useRecipeForm()
      name.value = 'Rice'
      ingredients.value = [{ id: 'y', name: 'Rice', quantity: '' }]
      const recipe = toRecipeInput()
      expect(recipe.ingredients).toHaveLength(1)
      expect(recipe.ingredients[0]!).toEqual({ name: 'Rice' })
    })

    it('should omit mealType from output when not selected', () => {
      const { name, ingredients, toRecipeInput } = useRecipeForm()
      name.value = 'Rice'
      ingredients.value = [{ id: 'z', name: 'Rice', quantity: '' }]
      expect(toRecipeInput().mealType).toBeUndefined()
    })
  })
})
