import i18n from '@/i18n'
import { watch } from 'vue'
import { useThemeStore } from '@/store/theme'
export function generateTitle(title: string) {
  return i18n.global.t('msg.route.' + title)
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
type CB = (...args: any[]) => any
const themeStore = useThemeStore()
export function watchSwitchLang(...cbs: CB[]) {
  watch(
    () => themeStore.language,
    () => {
      cbs.forEach((cb) => cb(themeStore.language))
    },
  )
}
