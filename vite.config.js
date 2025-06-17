import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE,
    resolve: { alias: {'@': __dirname + '/src'}},
    server: {
      port: env.VITE_PORT,
      proxy: {
        [env.VITE_SERVER_API_PREFIX]: {
          target: env.VITE_SERVER_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_SERVER_API_PREFIX), '')
        },
      },
    },

    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: env.VITE_MOCK === 'true',
        watchFiles: true,
        logger: true
      })
    ]
  }
})
