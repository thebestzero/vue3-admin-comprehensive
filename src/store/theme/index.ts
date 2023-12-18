import { defineStore } from 'pinia'
import variables from '@/styles/variables.module.scss'
export const useThemeStore = defineStore('themeStore', {
  state: () => {
    return {
      variables
    }
  },
  getters: {
    cssVar:(state) => {
      return state.variables
    }
  },
  actions: {},
})
