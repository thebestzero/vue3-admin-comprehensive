import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { installSvgIcon, installElIcon } from '@/plugins'
import pinia from '@/router/pinia'
const app = createApp(App)
installSvgIcon(app)
installElIcon(app)
app.use(ElementPlus).use(pinia).use(router).mount('#app')
