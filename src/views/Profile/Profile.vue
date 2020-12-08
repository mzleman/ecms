<template>
  <div>
    <div class="mask"></div>
    <div class="info">
      <h2>当前用户：{{user.username}}</h2>
      <br>
      <!-- <h2>{{meta.index}}</h2> -->
      <!-- <el-button type="primary" @click="add">点击</el-button> -->
      <el-button @click="back">返回</el-button>
      <el-button @click="signOut">退出</el-button>
    </div>
  </div>
</template>

<script>
import {getUserToken, delUserToken} from '@/state/token'
export default {
  data() {
    return {
      user: undefined,
      meta: {
        index: 0
      }
    }
  },
  methods: {
    signOut() {
      if ( delUserToken() ) {
        this.$message.warning('退出登录');
        this.$router.replace('/login');
      }
    },
    back() {
      this.$router.back();
    },
    add() {
      this.meta.index++;
    }
  },
  created() {
    const user = JSON.parse(getUserToken());
    if(user && user.username) {
      this.user = user;
    } else {
      this.$router.replace('/login');
    }
  },
  watch: {
    ['meta.index']: function(newVal, oldVal) {
      alert(oldVal);
    }
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

