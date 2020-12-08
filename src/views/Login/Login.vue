<template>
  <div class="login" @keydown="ifEnterDown">
    <div class="mask"></div>
    <div class="form-container">
      <div class="login-logo">
        <a href="#/home">
          <img src="@images/logo.png" alt="">
        </a>
      </div>
      <el-form class="login-form" ref="login-form" :model="loginData" :rules="rules" label-width="50px" label-position="top">
          <el-form-item label="用户" prop="username">
            <el-input type="text" v-model="loginData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginData.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login"> 登录 </el-button>
            <el-button @click="resetForm('login-form')"> 重置 </el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {validateUser, validatePass, validateForm} from '@/utils/validate.js'
// import {login} from './funcs'
import {getUserToken, saveUserToken} from '@/state/token'
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      }, 
      rules: {
        username: [
          {validator: validateUser, trigger: 'blur'}],
        password: [
          {validator: validatePass, trigger: 'blur'}]
      }
    }
  },
  methods: {
    // 登录按钮单击响应函数
    async login() {
      const isValidUser = (res) => {return res.meta.status === 200 && res.data && res.data.token};
      let res;
      try {
        await validateForm(this.$refs['login-form']);
      } catch (e) {
        return this.$message.error('请输入正确的登录信息');
      }
      try {
        res = await this.$http.get('login', {
          params: this.loginData
        })
      } catch (e) {
        return this.$message.error('网络波动，请稍后再试');
      }
      if (isValidUser(res)) {
        this.$message.success({
          message: '登陆成功',
          duration: 1000
        });
        saveUserToken(res.data);
        this.$router.replace('/home');
      } else {
        this.$message.error('用户名或密码错误');
      }
    },
    // 重置按钮单击响应函数
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
    },
    // 在组件内敲击enter键进行登录
    ifEnterDown(event) {
      if(event.key === 'Enter') {
        this.login();
      }
    }
  },
  activated() {
    // 如果本地存在token则跳转至用户信息页面
    if(getUserToken()) {
      this.$router.replace('/profile');
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    position: relative;
  }

  .mask {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url('~@images/bare_bears.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }

  .form-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 300px;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba($color: #fff, $alpha: 0.9);
    border-radius: 10px;
    .login-logo {
      position:absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: translateY(-50%);
      margin: 0 auto;
      background-color: darkblue;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 5px;
      border: 5px solid #eee;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        display: inline-block;
        vertical-align: bottom;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>>
