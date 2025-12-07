## Запуск

```bash
npm install
npm run dev
```

## Тестирование

### E2E тесты (Playwright)

> ⚠️ **Важно:** E2E тесты не полностью протестированы. Скриншот-снапшоты могут не совпадать из-за разницы в ОС (шрифты, рендеринг). В реальном проекте тесты нужно запускать в Docker для консистентности.

Для запуска e2e тестов нужен mock-сервер:

```bash
# 1. Собрать приложение в тестовом режиме
npm run build:test

# 2. Запустить preview сервер
npm run preview:test

# 3. В другом терминале запустить тесты
npm run test:e2e
```

Или одной командой (preview должен быть запущен):

```bash
npm run test:e2e
```

### Unit тесты (Vitest)

Несколько unit тестов добавлены в качестве примера:

- `test/nuxt/components/` — тесты компонентов
- `test/nuxt/composables/` — тесты composables
- `test/nuxt/stores/` — тесты Pinia stores

```bash
npm run test:unit
```
