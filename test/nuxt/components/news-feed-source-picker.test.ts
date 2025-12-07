import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NewsFeedSourcePicker from '~/components/news-feed/NewsFeedSourcePicker.vue'

describe('NewsFeedSourcePicker', () => {
  it('Should render all source options', async () => {
    const wrapper = await mountSuspended(NewsFeedSourcePicker)

    const labels = wrapper.findAll('label')
    expect(labels).toHaveLength(3)

    expect(labels[0].text()).toBe('Все')
    expect(labels[1].text()).toBe('Mos.ru')
    expect(labels[2].text()).toBe('Ivanovo')
  })

  it('Should emit update:modelValue when clicking on item', async () => {
    const wrapper = await mountSuspended(NewsFeedSourcePicker, {
      props: {
        modelValue: undefined,
      },
    })

    const labels = wrapper.findAll('label')
    const radios = wrapper.findAll('input[type="radio"]')

    await labels[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['mos'])
    expect((radios[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('Should have correct values for radio inputs', async () => {
    const wrapper = await mountSuspended(NewsFeedSourcePicker)

    const radios = wrapper.findAll('input[type="radio"]')

    expect(radios[0].attributes('value')).toBeUndefined()
    expect(radios[1].attributes('value')).toBe('mos')
    expect(radios[2].attributes('value')).toBe('ivanovo')
  })

  it('Should have checked radio based on modelValue', async () => {
    const wrapper = await mountSuspended(NewsFeedSourcePicker, {
      props: {
        modelValue: 'mos',
      },
    })

    const radios = wrapper.findAll('input[type="radio"]')

    expect((radios[0].element as HTMLInputElement).checked).toBe(false)
    expect((radios[1].element as HTMLInputElement).checked).toBe(true)
    expect((radios[2].element as HTMLInputElement).checked).toBe(false)
  })
})
