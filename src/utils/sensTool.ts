import { AxiosRequestConfig } from 'axios'
import { useAppStore } from '@/store'
import { ElMessage } from 'element-plus'
type Field = {
  fieldCode: string
  fieldDesc: string
  [key: string]: any
}

interface ReqData {
  ispec: string
  [key: string]: any
}

interface ConfigData {
  method: string
  reqData: ReqData
}

class AuthTool {
  static authTool: AuthTool = new AuthTool()
  private _validateStatus: Map<string, boolean> = new Map()

  interceptor(config:AxiosRequestConfig<ConfigData>){
    const validateRes = this.validate(config)
    if (!validateRes){
      ElMessage.error('密文状态下不能执行此操作！')
    }
  }
  /*status*/
  updateStatus(page: string) {
    this._validateStatus.set(page, true)
  }
  resetStatus(response: any) {
    if (!response.config.url.includes('query')) return
    const ispec = response.data.ispec || ''
    const page = ispec.toUpperCase()
    const sensBtnArr = useAppStore().sensBtnArr
    if (!sensBtnArr.includes(page)) return
    const data = response.data.reqData
    const result = Object.values(data).some((item) => {
      return typeof item === 'string' && item.includes('*')
    })
    if (result) {
      this._validateStatus.set(page, false)
    }
  }

  validate(config: AxiosRequestConfig<ConfigData>) {
    const method = config.data?.method
    const url = config.url
    if (typeof url === 'undefined' || typeof method === 'undefined') return true
    if (method.includes('query') || url.includes('query')) return true
    if (url.includes('/user')) return true
    if (url.includes('/dataDictionary')) return true
    /*
     * 1. 检查是否已授权
     * 2. 是 --> true
     * 3. 检查是否有敏感字段
     * */
    const reqData: ReqData = config.data!.reqData
    const page = reqData?.ispec
    if (typeof page === 'undefined') return true
    return this.checkStatus(page) || !this.requireValidate(page)
  }
  // 检查是否点击过明文按钮
  checkStatus(page: string) {
    const sensBtnArr = useAppStore().sensBtnArr
    if (!sensBtnArr.includes(page)) return true
    const pageStatus = this._validateStatus.get(page) ?? true
    return pageStatus
  }
  // 检查是否含有敏感字段
  requireValidate(config: AxiosRequestConfig<ConfigData>) {
    const data = config.data!.reqData
    const result = Object.values(data).some((item) => {
      return typeof item === 'string' && item.includes('*')
    })
    return result
  }
}
