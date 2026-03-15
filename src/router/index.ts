import { createRouter, createWebHistory } from 'vue-router'
import RecipesView from '../ui/views/RecipesView.vue'
import PantryView from '../ui/views/PantryView.vue'
import SuggestionsView from '../ui/views/SuggestionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/recipes' },
    { path: '/recipes', component: RecipesView },
    { path: '/pantry', component: PantryView },
    { path: '/suggestions', component: SuggestionsView },
  ],
})

export default router
