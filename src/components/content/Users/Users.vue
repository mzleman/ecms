<template>
  <div class="users">
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6" class="search-col">
          <div class="search-box">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable></el-input>
            <el-button type="primary" @click="getUsers">
              <i class="el-icon-search"></i>
              <span>搜索</span>
            </el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button @click="toAddUser">添加新用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="users" border stripe>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" min-width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" min-width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" min-width="180"></el-table-column>
        <el-table-column label="状态" min-width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-text="开启"
              inactive-text="关闭"
              @change="hangleUserStateChange(scope.row)">       
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <!-- 用于修改用户数据的按钮 -->
            <el-button size="mini" type="primary" @click="toUpdateUser(scope.row.id)">
              <i class="el-icon-edit"></i>
            </el-button>
            <!-- 用于删除用户的按钮 -->
            <el-button size="mini" type="danger" @click="toDeleteUser(scope.row.id)">
              <i class="el-icon-delete"></i>
            </el-button>
            <!-- 用于为用户分配角色的按钮 -->
            <el-tooltip content="分配角色" placement="top" :enterable="false" :hide-after="700">
              <el-button size="mini" type="warning"><i class="el-icon-setting"></i></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalUserCount">
      </el-pagination>
    </el-card>
    <!-- 弹出对话框 -->
    <div class="dialog">
      <add-user :dialogVisible="showDialog.add" @close="closeDialog('add')" @addUser="handleNewUser"/>
      <update-user :dialogVisible="showDialog.update" :userId="unstableUserId" @close="closeDialog('update')" @updateUser="handleUpdatedUser"/>
      <delete-user v-if="showDialog.delete" :userId="unstableUserId" @close="closeDialog('delete')" @deleteUser="handleDeletedUser"/>
    </div>
  </div>
</template>

<!---->
<script>
import AddUser from './NewUser'
import UpdateUser from './UpdateUser'
import DeleteUser from './DeleteUser'

export default {
  name: 'Users',
  components: {
    AddUser,
    UpdateUser,
    DeleteUser
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      users: [],
      totalUserCount: 0,
      unstableUserId: NaN,
      showDialog: {
        add: false,
        update: false,
        delete: false
      }
    }
  },
  methods: {
    // 根据查询字符串、页码以及单页大小获取当前页用户列表，同时更新总的用户个数
    async getUsers() {
      let res;
      try {
        res = await this.$http.get('users', {
          params: this.queryInfo
        });
      } catch {
        return this.$message.error('请求用户列表失败');
      }
      if (!res.meta || res.meta.status !== 200) {
        return this.$message.error('请求用户列表失败');
      }
      this.users = res.data.users;
      this.totalUserCount = res.data.total;
      // console.log(res);
    },
    // 当一页中可见的用户数量发生变化，进行相应处理
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getUsers();
    },
    // 当页码发生变化，进行相应处理
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getUsers();
    },
    // 处理更新用户的状态
    async hangleUserStateChange(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      if (!res.meta || res.meta.status !== 200) {
        user.mg_state = !user.mg_state;
        return this.$message.error('更改用户状态失败');
      };
      this.$message.success({
        message: '更改用户状态成功',
        duration: 800
      });
    },
    // 用户点击新增用户按钮
    toAddUser(){
      this.showDialog.add = true;
    },
    handleNewUser(userName) {
      this.queryInfo.query = userName;
      this.getUsers();
    },
    // 用户点击编辑某个用户的数据
    toUpdateUser(userId) {
      this.showDialog.update = true;
      this.unstableUserId = userId;
    },
    handleUpdatedUser(userName) {
      this.queryInfo.query = userName;
      this.getUsers();
    },
    toDeleteUser(userId) {
      this.unstableUserId = userId;
      this.showDialog.delete = true;
    },
    handleDeletedUser() {
      this.getUsers();
    },
    // 根据键值关闭对话框
    closeDialog(key) {
      this.showDialog[key] = false;
      if(!isNaN(this.unstableUserId)) {
        this.unstableUserId = NaN; // 将刚才编辑的用户id重置为空
      }
    },
  },
  created() {
    this.getUsers();
  }
}
</script>

<!-- -->
<style lang="scss" scoped>
@import '@css/mixin.scss';
.users {
  padding: 20px;
  box-sizing: border-box;
}

.el-card {
  margin-top: 20px;
  @include el-card-style;
}

.search-box {
  $radius: 4px;
  display: flex;
  /deep/ input {
    border-radius: $radius 0 0 $radius;
  }
  /deep/ button {
    border-radius: 0 $radius $radius 0;
  }
}

.el-table {
  margin-top: 15px;
  /deep/ th {
    font-weight: bold;
  }
}

.el-pagination {
  margin-top: 15px;
  /deep/ li.number:not(.active) {
    color: #bbb
  }
}

</style>