<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, type SupportedLocale } from '../i18n'

const { t, locale } = useI18n()

const displayNames: Record<SupportedLocale, string> = {
  en: 'English',
  ja: '日本語',
  fr: 'Français',
}
</script>

<template>
  <div class="flex items-center gap-2">
    <label for="language-select" class="text-sm">{{ t('language.label') }}</label>
    <select id="language-select" v-model="locale" class="text-sm border rounded px-2 py-1">
      <option v-for="code in SUPPORTED_LOCALES" :key="code" :value="code">
        {{ displayNames[code] }}
      </option>
    </select>
  </div>
</template>
