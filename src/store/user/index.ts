import { defineStore } from 'pinia'
import UserApi from '@/api/UserApi'
import md5 from 'md5'
import { AxiosResponse } from 'axios'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import _ from 'lodash-es'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'
interface BaseInfo {
  id: string
  title: string
}
interface UserInfo extends BaseInfo {
  username: string
  avatar: string
  role: BaseInfo[]
  permission: {
    [key: string]: string[]
  }
}
interface UserStore {
  userInfo: UserInfo
}
export const useUserStore = defineStore('userStore', {
  state: (): UserStore => {
    return {
      userInfo: {} as UserInfo,
    }
  },
  getters: {
    getUserInfo(state): UserInfo {
      const localUserInfo = _.isEmpty(getItem('userInfo'))
        ? {}
        : getItem('userInfo')
      return _.isEmpty(state.userInfo) ? localUserInfo : state.userInfo
    },
  },
  actions: {
    async login(username: string, password: string) {
      const res = await UserApi.login({
        username,
        password: md5(password),
      })
      console.log(res,'login')
      setItem('token', res.data.token)
      setTimeStamp()
    },
    async findUserInfo() {
      const res: AxiosResponse<UserInfo> = await UserApi.getUserInfo()
      this.userInfo = res.data
      setItem('userInfo', res.data)
    },
    logout() {
      this.userInfo = {} as UserInfo
      removeAllItem()
      router.push('/login')
    },
  },
})
