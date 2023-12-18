import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { App } from 'vue'
import EIcon from '@/components/EIcon/index.vue'
export default (app: App<Element>) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.component('e-icon', EIcon)
}
