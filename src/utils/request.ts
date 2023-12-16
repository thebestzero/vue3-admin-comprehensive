import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
} from 'axios'
import { ElMessage } from 'element-plus'
import config from '@/config'
import { useUserStore } from '@/store'
import { getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { isCheckTimeout } from '@/utils/auth'

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock: boolean
}
interface RequestFun {
  (url: string, isMock?: boolean, data?: any): Promise<AxiosResponse<any>>
}
interface Request {
  get: RequestFun
  post: RequestFun
  put: RequestFun
  delete: RequestFun
  patch: RequestFun
}
const SERVER_ERR = '请求服务器的网址错误或网络连接失败'
const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch']

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: Request
  constructor() {
    this.request = {
      get: (): any => {},
      post: (): any => {},
      put: (): any => {},
      delete: (): any => {},
      patch: (): any => {},
    }
    this.createAxiosInstance()
    this.beforeReqIntercpt()
    this.beforeResponseIntercpt()
    this.reqPrepare()
  }

  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 5000 })
  }
  //  1. 请求拦截器
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request) => {
      const token = getItem(TOKEN)
      const headers = request.headers!
      if (!headers.hasAuthorization() && token)
        headers.setAuthorization(`Bearer ${token}`)
      if (isCheckTimeout()) {
        const userStore = useUserStore()

        userStore.logout()
        throw new Error('TOKEN TIMEOUT')
      }
      return request
    })
  }
  //  2. 响应拦截器
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const { data, msg, code } = response.data
        if (code === 200) return response.data
        // else if (msg === 'invalid token') {
        //   // storage.set('token', null)
        //   // router.push({ name: 'login' })
        //   ElMessage.error(msg)
        //   throw new Error(msg)
        // } else if (code === 500) return ElMessage.error(`${msg}`)
        else return ElMessage.error('服务器出现了未知错误')
      },
      (error) => {
        // 处理 token 超时问题
        if (
          error.response &&
          error.response.data &&
          error.response.data.code === 401
        ) {
          // token超时
          const userStore = useUserStore()
          userStore.logout()
        }
        return ElMessage.error(`${SERVER_ERR}${error}`)
      },
    )
  }
  //  3. 发送请求给服务器
  sendRequest(option: AxiosRequestConfig_) {
    if (config.env === 'production') {
      this.axiosInstance.defaults.baseURL = config.baseApi
    } else {
      const isMock = option.isMock || config.isMock
      this.axiosInstance.defaults.baseURL = isMock
        ? config.mockBaseApi
        : config.baseApi
    }
    return this.axiosInstance(option)
  }
  //  4.深入灵活应用 TS 完成请求method类型自动提示
  reqPrepare() {
    methods.forEach((method) => {
      this.request[method] = (url, isMock = false, data) => {
        return this.sendRequest({
          url,
          isMock,
          data,
          method,
        })
      }
    })
  }
}

export default AxiosUtil.axiosUtil.request
