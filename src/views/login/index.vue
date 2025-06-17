<template>
  <div id="login">
    <div class="panel">
      <div class="left">
        <div class="left-logo">
          <img class="left-logo-img" :src="logo.img">
          <p class="left-logo-title">
            {{ logo.name }}
          </p>
        </div>
        <div class="left-form">
          <el-form ref="ruleFormRef" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="form.username" size="large" placeholder="请输入用户名" suffix-icon="user" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" show-password size="large" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item prop="captcha">
              <div class="left-form-captcha">
                <el-input v-model="form.captcha" placeholder="请输入验证码" size="large"
                  style="flex:1;padding-right: 20px;" />
                <div class="left-form-captcha-img">
                  <img :src="captchaImg" alt="请输入验证码" @click="getCaptcha()">
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 46%" size="large" @click="register">
                注 册
              </el-button>
              <el-button type="primary" size="large" style="width: 46%; margin-left: 8%"
                @click="submitLoginForm(ruleFormRef)">
                登 录
              </el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
      <div class="right" />
    </div>
  </div>
</template>

<script setup name="login">
import { ref, reactive } from 'vue'
import { captcha } from '@/api/user'
import { useUserStore } from '@/pinia/modules/user'
// pinia
const userStore = useUserStore()

// 变量
const logo = {
  img: import.meta.env.VITE_LOGO_IMG,
  name: import.meta.env.VITE_LOGO_NAME
}
const captchaImg = ref('')
const form = ref({
  username: 'admin',
  password: '123456',
  captcha: '',
  captchaID: ''
})


const rules = reactive({
  username: [{ required: true, message: '必填', trigger: 'blur' }],
  password: [{ required: true, message: '必填', trigger: 'blur' }],
  captcha: [{ required: true, message: '必填', trigger: 'blur' }]
})

const getCaptcha = async () => {
  const res = await captcha()
  if (res.code == 0) {
    captchaImg.value = res.data.picPath
    form.value.captchaID = res.data.captchaID
  }
}

const submitLoginForm = async () => {
  if (!formEl) return
  let valid = await formEl.validate((valid) => { return valid })
  if (!valid) {
    getCaptcha()
    return
  }
  const ok = await userStore.LoginIn(form.value)
  if (!ok) {
    getCaptcha()
    return false
  }
  return true
}


const register = () => {
}

// 调用
getCaptcha()

</script>

<style lang="scss" scoped>
#login {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-image: url("@/assets/login_background.jpg");

  .panel {
    display: flex;
    width: 96%;
    height: 94%;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .8);
    justify-content: space-around;
    align-items: center;


    .left {
      display: flex;
      width: 500px;
      height: 500px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgba(0, 0, 0, .2);
      flex-direction: column;

      .left-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90px;
        margin-top: 100px;
        margin-bottom: 30px;

        .left-logo-img {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 90px;
        }

        .left-logo-title {
          margin-left: 16px;
          justify-content: center;
          align-items: center;
          display: flex;
          height: 90px;
          font-size: 40px;

        }
      }

      .left-form {
        display: flex;
        justify-content: center;
        align-items: center;


        .left-form-captcha {
          display: flex;
          justify-content: space-between;

          .left-form-captcha-img {
            width: 33%;
            height: 38px;
            background: #ccc;

            img {
              width: 100%;
              height: 100%;
              vertical-align: middle;
            }
          }
        }

      }
    }

    .right {
      display: flex;
      background-size: cover;
      width: 40%;
      height: 60%;
      background-image: url("@/assets/right.svg");
    }
  }

}
</style>