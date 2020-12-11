<template>
  <el-dialog 
  class="distribute-role"
  width="500px"
  :visible.sync="dialogVisible"
  :before-close="close"
  title="分配角色">
  <el-row>
    <p>用户名称：{{user.username}}</p>
  </el-row>
  <el-row>
    <p>当前角色：{{user.role_name}}</p>
  </el-row>
  <el-row :gutter="30">
    <el-col :span="10">
      <el-select v-model="seletedRoleId">
        <el-option 
        v-for="role in roleList" 
        :key="role.id"
        :label="role.roleName"
        :value="role.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="10">
      <el-button type="primary" @click="distributeRole">确定</el-button>
    </el-col>
    
  </el-row>
  </el-dialog>
</template>

<script>
import {checkResponse} from '@/utils/response.js'
export default {
  name: 'DistributeRole',
  data() {
    return {
      roleList: [],
      seletedRoleId: undefined
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async getRoleList() {
      let res = await this.$http.get('roles').catch(err => err);
      let checked = checkResponse.call(this, res, 200, '获取角色列表失败');
      if(!checked) return [];
      const filter = function( {id, roleName} ) {
        return {id, roleName};
      };
      let roles = res.data.map(filter);
      return roles;
    },
    async distributeRole() {
      if(this.seletedRoleId === undefined) {
        this.$message.warning('请选择要分配的角色');
        return false;
      }
      console.log(this.seletedRoleId);
      console.log(typeof this.seletedRoleId);
      console.log('user.id', this.user.id);
      let res = await this.$http.put(`users/${this.user.id}/role`, {
        rid: this.seletedRoleId
      });
      console.log(res);
      let checked = checkResponse.call(this, res, 200, '分配角色失败');
      if(!checked) return false;
      this.$message.success('分配角色成功');
      this.$emit('distributeRole');
    },
    async refresh() {
      this.roleList = await this.getRoleList();
    }
  },
  watch: {
    dialogVisible(newVal) {
      if(newVal) {
        this.refresh();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 20px;
  min-height: 250px;
}
.el-row {
  padding: 20px;
}
</style>>
