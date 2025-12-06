import { test, expect } from '@playwright/test'

test.describe('News feed page', () => {
  test('Should display, filter, paginate news', async ({ page }) => {
    await page.goto('/')

    const newsItem = page.getByRole('article')
    await expect(newsItem).toHaveCount(4)
    await expect(newsItem.first().getByRole('heading', { level: 3 }))
      .toHaveText('Ивановский роддом №4 зовет будущих мам в школу подготовки к родам')

    const paginationButton = page.getByTestId('pagination').getByRole('button')
    await expect(paginationButton.first()).toHaveText('1')
    await expect(paginationButton.last()).toHaveText('4')
    // Кликаем на последнюю страницу
    await paginationButton.last().click()
    await expect(newsItem.first().getByRole('heading', { level: 3 }))
      .toHaveText('Импакт-инвестиции, внимание фондов и господдержка: помощь социальному бизнесу и НКО на одной карте')
    await expect(page).toHaveURL('/?page=4')

    // Поиск по тексту
    const searchInput = page.getByTestId('search-input').getByRole('textbox')
    await searchInput.fill('мо')
    await expect(paginationButton.first()).toHaveText('1')
    await expect(paginationButton.last()).toHaveText('2')
    await expect(newsItem.first().getByRole('heading', { level: 3 })).toHaveText('Как проверить безопасность овощей')
    await expect(page).toHaveURL('/?search=мо')

    await paginationButton.last().click()
    await expect(page).toHaveURL('/?search=мо&page=2')

    // Изменим источник
    await page.getByTestId('source-picker').getByText('Mos.ru').click()
    await expect(paginationButton).toHaveCount(1)
    await expect(newsItem.first().getByRole('heading', { level: 3 }))
      .toHaveText('Внутри Нового года: территорию ВДНХ украсили к зимним праздникам')
    await expect(page).toHaveURL('/?source=mos&search=мо')
  })

  test('Should apply initial filters from url', async ({ page }) => {
    await page.goto('/?source=mos&search=м')

    const searchInput = page.getByTestId('search-input').getByRole('textbox')
    await expect(searchInput).toHaveValue('м')

    const mosSourceRadio = page.getByTestId('source-picker').getByText('Mos.ru').getByRole('radio')
    await expect(mosSourceRadio).toBeChecked()

    const paginationButton = page.getByTestId('pagination').getByRole('button')
    await expect(paginationButton).toHaveCount(2)

    const newsItem = page.getByRole('article')
    await expect(newsItem).toHaveCount(4)
    await expect(newsItem.first().getByRole('heading', { level: 3 }))
      .toHaveText('Собянин: Спрос на обучение в центре «Профессии будущего» вырос в 2,5 раза')
  })

  test('Should display all news when source query is invalid', async ({ page }) => {
    await page.goto('/?source=invalid')

    const allSourceRadio = page.getByTestId('source-picker').getByText('Все').getByRole('radio')
    await expect(allSourceRadio).toBeChecked()

    const newsItem = page.getByRole('article')
    await expect(newsItem).toHaveCount(4)
    await expect(newsItem.first().getByRole('heading', { level: 3 }))
      .toHaveText('Ивановский роддом №4 зовет будущих мам в школу подготовки к родам')
  })

  test('Should display error when news is unavailable', async ({ page }) => {
    await page.goto('/?source=mos')

    const newsItem = page.getByRole('article')
    await expect(newsItem).toHaveCount(4)

    await page.route('/api/ivanovo.bezformata.com/rss', async (route) => {
      console.log('wefwef')
      await route.fulfill({
        status: 404,
        contentType: 'text/plain',
        body: 'Not Found!',
      })
    })

    await page.getByTestId('source-picker').getByText('Ivanovo').click()
    await expect(page.getByRole('heading', { level: 4 })).toHaveText('Произошла ошибка при загрузке новостей')
  })

  test('Should switch news items layout grid', async ({ page }) => {
    await page.goto('/')

    const viewTypePicker = page.getByTestId('view-type-picker')
    // Дефолтный вид grid
    await expect(viewTypePicker.getByRole('radio').last()).toBeChecked()

    await viewTypePicker.locator('label').first().click()
    await expect(viewTypePicker.getByRole('radio').last()).not.toBeChecked()
    await expect(viewTypePicker.getByRole('radio').first()).toBeChecked()

    // После обновления страницы сохранилось
    await page.reload()
    await expect(viewTypePicker.getByRole('radio').first()).toBeChecked()
  })

  test('Should reload news', async ({ page }) => {
    await page.goto('/?source=ivanovo&search=%D0%BC&page=2')

    const newsItem = page.getByRole('article')
    await expect(newsItem.first().getByRole('heading', { level: 3 })).toHaveText('Время для искусства')

    const searchInput = page.getByTestId('search-input').getByRole('textbox')
    await expect(searchInput).toHaveValue('м')

    const mosSourceRadio = page.getByTestId('source-picker').getByText('Ivanovo').getByRole('radio')
    await expect(mosSourceRadio).toBeChecked()

    await page.getByTestId('reset-btn').click()
    await expect(page).toHaveURL('/')
    await expect(searchInput).toHaveValue('')
    const allSourceRadio = page.getByTestId('source-picker').getByText('Все').getByRole('radio')
    await expect(allSourceRadio).toBeChecked()
    await expect(newsItem.first().getByRole('heading', { level: 3 }))
      .toHaveText('Ивановский роддом №4 зовет будущих мам в школу подготовки к родам')
  })
})
