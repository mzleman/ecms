<template>
  <el-container class="home">
    <el-header>
      <header class="">
        <img src="~@images/ecms.png" alt="" height="50px">
        <h1>电商管理系统</h1>
      </header>
      <div>
        <el-button @click="signIn">登录</el-button>
        <el-button type="primary" @click="signOut">
          退出登录
        </el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="245px">
        <el-menu active-text-color="red" unique-opened>
          <el-submenu v-for="main in menuInfo" :key="main.id" :index="main.id + ''"> 
            <template slot="title">
              {{ main.authName }}
            </template>
            <el-menu-item v-for="sub in main.children" :key="sub.id">
              <template slot="title">
              {{ sub.authName }}
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import {delUserToken} from '@/state/token'

export default {
  name: 'Home',
  data() {
    return {
      menuInfo: []
    }
  },
  methods: {
    signIn() {
      this.$router.push('/login')
    },
    signOut() {
      if (delUserToken()) {
        this.$message.warning('退出登录');
        this.$router.replace('/login');
      }
    },
    async getMenuList() {
      let menuInfo, res;
      try {
        res = await this.$http.get('/menus');
      } catch {
        this.$message.error('请求menus失败');
      }
      if(res.meta.status === 200) {
        this.menuInfo = res.data;
        console.log(this.menuInfo);
      }
    }
  },
  created() {
    this.getMenuList();
  }
}
</script>


<style lang="scss" scoped>
  .home {
    height: 100%;
  }
  .el-header {
    background-color: aquamarine;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373C41;
    color: #fff;
    font-size: 20px;
    padding: 0;
    padding-right: 20px;
    header {
      box-sizing: border-box;
      padding: 10px;
      min-width: 245px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .el-aside {
    background-color: bisque;
    background-color: #323744;
  }
  /deep/ .el-menu {
    background-color: transparent;
    border: none;
    * {
      color: #fff;
      background-color: transparent;
    }
  }
  // /deep/ .el-submenu {
  //     background-color: transparent;
  //     div.el-submenu__title {
  //       background-color: transparent;
  //     }
  // }

  .el-main {
    background-color: cadetblue;
  }
</style>>
