<template>
  <div class="roles">
    <breadcrumb first-level="权限管理" second-level="角色列表"/>
    <el-card>
      <el-row>
        <el-button type="primary" @click="toAddNewRole">添加新角色</el-button>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <el-table-column class="expand" type="expand">
          <rights-tree slot-scope="scope" :rights="scope.row.children"/>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <!-- 用于修改用户数据的按钮 -->
            <el-button size="small" type="primary">
              <i class="el-icon-edit" @click="edit"> 编辑 </i>
            </el-button>
            <!-- 用于删除用户的按钮 -->
            <el-button size="small" type="danger" @click="toDeleteRole(scope.row.id)">
              <i class="el-icon-delete"> 删除 </i>
            </el-button>
            <!-- 用于为用户分配角色的按钮 -->
            <el-button size="small" type="warning" @click="toDisTributeRights(scope.row.id)">
              <i class="el-icon-setting"> 重新分配权限</i>
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加新角色对话框 -->
    <div class="dialogs">
      <new-role 
      :dialogVisible="showDialog.newRole" 
      @close="closeDialog('newRole')"
      @newRole="handleNewRole">
      </new-role>
      <!-- 删除角色对话框 -->
      <delete-role 
      v-if="showDialog.delete"
      :roleId="unstableId"
      @close="closeDialog('delete')"
      @deleteRole="handleDeletedRole">
      </delete-role>
      <distribute-rights
      :dialogVisible="showDialog.distribute"
      @close="closeDialog('distribute')"
      @distributeRights="handleDistributedRights"
      :roleId="unstableId"
      >
      </distribute-rights>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@components/common/Breadcrumb';
import RightsTree from './RigthsTree';
import NewRole from './NewRole';
import DeleteRole from './DeleteRole';
import DistributeRights from './DistributeRights';
import {checkResponse} from '@/utils/response.js'

export default {
  name: 'Roles',
  components: {
    Breadcrumb,
    RightsTree,
    NewRole,
    DeleteRole,
    DistributeRights
  },
  // 数据
  data() {
    return {
      rolesList: [],
      showDialog: {
        newRole: false,
        distribute: false,
        delete: false
      },
      unstableId: ''
    }
  },
  // 方法
  methods: {
    async getRolesList() {
      let res = await this.$http.get('roles').catch(err => err);
      const successCode = 200;
      let checked = checkResponse.call(this, res, successCode, '获取角色列表失败');
      if(!checked) return [];
      return res.data;
    },
    async refresh() {
      this.rolesList = await this.getRolesList();
    },
    closeDialog(key) {
      this.showDialog[key] = false;
      if(this.unstableId) {
        this.unstableId = '';
      }
    },
    toAddNewRole() {
      this.showDialog.newRole = true;
    },
    async handleNewRole() {
      this.refresh();
    },
    toDeleteRole(roleId) {
      this.unstableId = roleId;
      this.showDialog.delete = true;
    },
    async handleDeletedRole() {
      this.refresh();
    },
    toDisTributeRights(id) {
      this.showDialog.distribute = true;
      this.unstableId = id;
    },
    async handleDistributedRights() {
      this.refresh();
    },
    edit() {
      this.$message.info('没实现该功能');
    }
  },
  // 生命周期
  async created() {
    // 初始化时获取角色列表
    this.rolesList = await this.getRolesList();
  }
}
</script>

<style scoped lang="scss">
@import '@css/mixin.scss';
.roles {
  padding: 20px;
  box-sizing: border-box;
}
.el-card {
  margin-top: 15px;
  @include el-card-style;
}
.el-table {
  margin-top: 15px;
  // 修改表格下拉框内边距
  /deep/ td.el-table__expanded-cell {
    padding-top: 5px;
    padding-bottom: 5px;
  }
}
</style>