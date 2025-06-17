import { createApp } from 'vue'
import App from '@/App.vue'
import pinia from '@/pinia'
import router from '@/router'
import ElementPlus from 'element-plus'
import '@/filter'
import '@/style/index.scss'
import * as ElIcons from '@element-plus/icons-vue'

const app = createApp(App)

for (const iconName in ElIcons) {
    app.component(iconName, ElIcons[iconName])
}

app.use(pinia).use(router).use(ElementPlus)
app.mount('#app')

