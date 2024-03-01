import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { App, reactive } from 'vue'
import EIcon from '@/components/EIcon/index.vue'
export default (app: App<Element>) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.component('e-icon', EIcon)
}

const formData = reactive({
  formItems:[
    {type:'Text',label:'1',prop:'test1'},
    {type:'Text',label:'2',prop:'test2'},
    {type:'Text',label:'3',prop:'test3'},
    {type:'Text',label:'4',prop:'test4'},
    {type:'Text',label:'5',prop:'test5'},
  ]
})

