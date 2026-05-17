<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './ui/components/LanguageSwitcher.vue'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b px-4 py-3 flex items-center justify-between">
      <h1 class="text-lg font-semibold">{{ t('app.name') }}</h1>
      <LanguageSwitcher />
    </header>

    <nav class="bg-white border-b px-4 flex gap-1">
      <RouterLink
        v-for="{ to, label } in [
          { to: '/recipes', label: t('nav.recipes') },
          { to: '/pantry', label: t('nav.pantry') },
          { to: '/suggestions', label: t('nav.suggestions') },
        ]"
        :key="to"
        :to="to"
        class="px-4 py-3 text-sm text-gray-600"
        active-class="border-b-2 border-blue-600 text-blue-600"
      >
        {{ label }}
      </RouterLink>
    </nav>

    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>
