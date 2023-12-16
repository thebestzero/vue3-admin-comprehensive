interface BaseConf {
  baseApi: string
  mockBaseApi: string
}
interface EnvConf {
  development: BaseConf
  production: BaseConf
}
class AllConf {
  env!: keyof EnvConf
  isMock: boolean = false
  baseApi!: string
  mockBaseApi!: string
}
class EnvConfigClass {
  static envConfigClass: EnvConfigClass = new EnvConfigClass()
  readonly curEnv =
    process.env.NODE_ENV === 'development' ? 'development' : 'production'
  envConf!: EnvConf
  allConf!: AllConf
  constructor() {
    this.initConf()
    this.getAllConf()
  }
  initConf() {
    this.envConf = {
      development: {
        baseApi: process.env.VUE_APP_BASE_API,
        mockBaseApi: '',
      },
      production: {
        baseApi: process.env.VUE_APP_BASE_API,
        mockBaseApi: '',
      },
    }
  }
  getAllConf() {
    this.allConf = {
      env: this.curEnv,
      isMock: false,
      ...this.envConf[this.curEnv],
    }
  }
}

export default EnvConfigClass.envConfigClass.allConf
