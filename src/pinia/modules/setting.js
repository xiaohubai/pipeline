import { defineStore } from 'pinia'
import { getSetting, updateSetting } from '@/api/setting'
import { ElMessage } from 'element-plus'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        lang: 'zh',
        sideModeColor: 'dark',
        collapse: false, //侧边栏折叠
        breadcrumb: true,//面包屑
        defaultRouter: '',//默认路由
        activeTextColor: '',//点击文本颜色
        activeBackgroundColor: ''//点击文本背景色
    }),
    persist: true,
    getters: {
    },
    actions: {
        async getSetting() {
            const res = await getSetting()
            if (res.code === 0) {
                this.$state = res.data
                return true
            }
            ElMessage({ type: 'error', message: '获取配置失败' })
            return false
        },
        async updateSetting(name, val) {
            const data = {
                'lang': this.$state.lang,
                'sideModeColor': this.$state.sideModeColor,
                'collapse': this.$state.collapse,
                'breadcrumb': this.$state.breadcrumb,
                'defaultRouter': this.$state.defaultRouter,
                'activeTextColor': this.$state.activeTextColor,
                'activeBackgroundColor': this.$state.activeBackgroundColor
            }
            data[name] = val
            const res = await updateSetting(data)
            this.$state[name] = val
            return true
        }
    }
})