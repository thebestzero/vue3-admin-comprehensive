import pinia from '@/router/pinia'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import {useThemeStore} from '@/store'

export default class LayoutService{
  static userStore = useUserStore(pinia)
  static userStoreRef = storeToRefs(this.userStore)
  static themeStore = storeToRefs(useThemeStore())
  static logout = () => {
      this.userStore.logout()
  }
}
