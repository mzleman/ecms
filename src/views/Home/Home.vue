<template>
  <el-container class="home">
    <el-header height="60px">
      <header class="">
        <img src="~@images/ecms.png" alt="" height="50px">
        <h1>电商管理系统</h1>
      </header>
      <div>
        <el-button @click="toUserInfo">用户</el-button>
        <el-button type="primary" @click="signOut">
          退出登录
        </el-button>
      </div>
    </el-header>
    <el-container class="aside main">
      <el-aside width="245px">
        <el-menu  active-text-color="#26A59A" unique-opened>
          <el-submenu v-for="main in menuInfo" :key="main.id" :index="main.id + ''" @click.native="menuClick(main)"> 
            <template slot="title">
              {{ main.authName }}
            </template>
            <el-menu-item v-for="sub in main.children" :key="sub.id" :index="sub.id + ''">
              <template slot="title">
              {{ sub.authName }}
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
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
    toUserInfo() {
      this.$router.push('/user')
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
    },
    menuClick(item) {
      this.$router.push(item.path);
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
  .el-container.aside.main {
    height: 100%;
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

  .el-main {
    box-sizing: border-box;
    height: 100%;
    padding: 0;
    // background-color: cadetblue;
    background-color: #fff;
    position: relative;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 99, 71, .3);
      // background-color: #fff;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 99, 71, .9);
      border-radius: 2px;
    }
  }
</style>>
