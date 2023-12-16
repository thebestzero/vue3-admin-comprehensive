import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

export default class LayoutService{
  static userStore = useUserStore()
  static userStoreRef = storeToRefs(this.userStore)

  static logout = () => {
      this.userStore.logout()
  }
}
