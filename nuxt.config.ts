// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const isTest = process.env.TEST === 'true'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  // Обойдем CORS (только если не тестовый режим)
  routeRules: isTest
    ? {}
    : {
        '/api/mos.ru/rss': {
          proxy: {
            to: 'https://mos.ru/rss',
          },
        },
        '/api/ivanovo.bezformata.com/rss': {
          proxy: {
            to: 'https://ivanovo.bezformata.com/rss.xml',
          },
        },
      },
  // В тестовом режиме добавляем mock-server routes
  nitro: {
    scanDirs: isTest ? ['../mock-server'] : [],
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2, // отступы: 2 пробела
        quotes: 'single', // одинарные кавычки
        semi: false, // без точки с запятой
        commaDangle: 'always-multiline', // запятая в многострочных
      },
    },
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
    customCollections: [
      {
        prefix: 'inv',
        dir: './app/assets/icons',
      },
    ],
  },
  image: {
    quality: 80,
    format: ['avif', 'webp'],
  },
})
