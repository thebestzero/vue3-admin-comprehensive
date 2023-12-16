import router from '@/router'
import { getItem } from '@/utils/storage'
import { useUserStore } from '@/store'
import { TOKEN } from '@/constant'
// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  const token = getItem(TOKEN)
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      const store = useUserStore()
      if (JSON.stringify(store.getUserInfo)== '{}') store.findUserInfo()
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
