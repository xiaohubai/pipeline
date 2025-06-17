import { defineStore } from 'pinia'
import router from '@/router'
import { login } from '@/api/user'

export const useUserStore = defineStore('user', {
	state: () => ({
		userId: '',
		userName: '',
		roleId: '0',
		roleName: '',
		token: '',
	}),
	persist: true,
	getters: {
	},
	actions: {
		LoginOut() {
			sessionStorage.clear()
			localStorage.clear()
			router.push({ name: 'login', replace: true })
			window.location.reload()
		},
		setUserInfo(data) {
			this.$state = data
		},
		async LoginIn(data) {
			const res = await login(data)
			if (res.code === 0) {
				this.$state = res.data
				return true
			}
			return false
		},
	}
})