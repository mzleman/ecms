<template>
  <div class="home">
    <h2>Home</h2>
    <el-button @click="signIn">登录</el-button>
    <el-button type="primary" @click="signOut">退出登录</el-button>
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    signIn() {
      this.$router.push('/login');
    },
    signOut() {
      // window.alert('退出登录');
      this.$message({
        message: '退出登录',
        type: 'success',
        duration: '800'
      });
    }
  }
}
</script>

<style>

</style>