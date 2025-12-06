import { test, expect } from '@playwright/test'

test.describe('News feed snapshots', () => {
  // TODO: снапшоты могут отличаться от ОС, в реальности надо заворачивать в докер
  test('Should take a snapshot of news feed - grid view', async ({ page }) => {
    await page.goto('/')

    // Дождемся загрузки
    const newsItem = page.getByRole('article')
    await expect(newsItem).toHaveCount(4)

    await expect(page).toHaveScreenshot('news-feed-grid.png', { fullPage: true })
  })

  test('Should take a snapshot of news feed - list view', async ({ page }) => {
    await page.goto('/')

    const viewTypePicker = page.getByTestId('view-type-picker')
    await viewTypePicker.locator('label').first().click()
    // Дождемся загрузки
    const newsItem = page.getByRole('article')
    await expect(newsItem).toHaveCount(4)

    await expect(page).toHaveScreenshot('news-feed-list.png', { fullPage: true })
  })
})
