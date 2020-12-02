<template>
  <div class="home">
    <h2>Home</h2>
    <el-button @click="signIn">登录</el-button>
    <el-button type="primary" @click="signOut">退出登录</el-button>
    <div>{{obj.student}}</div>
  </div>
</template>

<script>
import {delUserToken} from '@/state/token'
export default {
  name: 'Home',
  data(){
    return {
      obj: {
        student: 'mz'
      }
    }
  },
  methods: {
    signIn() {
      this.$router.push('/login')
    },
    signOut() {
      if ( delUserToken() ) {
        this.$message.warning('退出登录');
        this.$router.replace('/login');
      }
    }
  }
}
</script>

<style>

</style>