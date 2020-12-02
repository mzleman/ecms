<template>
  <div>
    <div class="mask"></div>
    <div class="info">
      <h2>当前用户：{{user}}</h2>
      <br>
      <el-button @click="signOut">退出</el-button>
    </div>
  </div>
</template>

<script>
import {getUserToken, delUserToken} from '@/state/token'
export default {
  data() {
    return {
      user: undefined
    }
  },
  methods: {
    signOut() {
      if ( delUserToken() ) {
        this.$message.warning('退出登录');
        this.$router.replace('/login');
      }
    }
  },
  created() {
    this.user = JSON.parse(getUserToken()).username;
  }
}
</script>

<style scoped lang="scss">
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
  .info {
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
  }
</style>>

