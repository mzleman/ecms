<template>
  <div class="login">
    <div class="mask"></div>
    <div class="form-container">
      <div class="login-logo">
        <img src="@images/logo.png" alt="">
      </div>
      <el-form class="login-form" ref="login-form" :model="loginData" :rules="rules" label-width="50px" label-position="top">
          <el-form-item label="用户" prop="username">
            <el-input type="text" v-model="loginData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginData.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login"> 提交 </el-button>
            <el-button @click="resetForm('login-form')"> 重置 </el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {validateUser, validatePass} from './validate'
import {login} from './funcs'
import {getUserToken} from '@/state/token'
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
    login,
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    if(getUserToken()) {
      this.$router.replace('/user');
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
