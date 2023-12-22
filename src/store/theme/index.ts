import { defineStore } from 'pinia'
import variables from '@/styles/variables.module.scss'
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
interface ThemeStore {
  //主题色
  variables: typeof variables
  //菜单伸缩
  sidebarOpened: boolean
  language: 'zh' | 'en'
}
export const useThemeStore = defineStore('themeStore', {
  state: ():ThemeStore => {
    return {
      //主题色
      variables,
      //菜单伸缩
      sidebarOpened: true,
      language: 'zh',
    }
  },
  getters: {
    cssVar: (state) => {
      return state.variables
    },
    getSidebarOpened: (state): boolean => {
      return state.sidebarOpened
    },
    getLanguage(state): 'zh' | 'en' {
      return state.language || getItem(LANG)
    },
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    setLanguage(lang: 'zh' | 'en') {
      setItem(LANG, lang)
      this.language = lang
    },
  },
})
