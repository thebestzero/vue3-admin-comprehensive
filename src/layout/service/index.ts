import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import pinia from '@/router/pinia'
export default class LayoutService{
  static userStore = useUserStore(pinia)
  static userStoreRef = storeToRefs(this.userStore)

  static logout = () => {
      this.userStore.logout()
  }
}
