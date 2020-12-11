<template>
  <el-dialog 
  class="distribute-rights" 
  :visible.sync="dialogVisible" 
  :beforeClose="close"
  title="角色权限分配"
  width="600px"
  >
    <el-row>
      <el-col :span="10">
        <span>当前角色：</span>
        <el-tag type="success">{{roleName}}</el-tag>
      </el-col>
      <el-col :span="14">
        <el-button :disabled="!rightsChanged" @click="saveChange" size="small" type="primary">
          保存修改
        </el-button>
      </el-col>
    </el-row>
    <el-tree 
    ref="tree"
    :data="rightsTree" 
    :props="treeOptions" 
    node-key="id"
    show-checkbox
    default-expand-all
    :default-checked-keys="leafRightIds"
    @check="rightsChanged = true"
    >
    </el-tree>
  </el-dialog>

</template>
 
<script>
import {checkResponse} from '@/utils/response.js';

export default {
  name: 'DistributeRights',
  data() {
    return {
      rightsTree: [],
      role: null,
      treeOptions: {
        label: 'authName',
        children: 'children',
      },
      seletedRightIds: [],
      rightsChanged: false
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    }, 
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
      this.rightsTree = [];
      this.role = null;
      this.rightsChanged = false;
    },
    // 获取当前用户的所有权限
    async getRoleById(id) {
      let res = await this.$http.get('roles').catch(err => err);
      const successCode = 200;
      let checked = checkResponse.call(this, res, successCode, '获取角色列表失败');
      if(!checked) return [];
      // 查找根据id查询角色的权限
      let role = res.data.find( role => role.id === id );
      if(!role) {
        return null;
      } else {
        return role;
      }
    },
    // 获取权限树
    async getRightsTree() {
      let res = await this.$http.get('rights/tree').catch(err => err);
      const successCode = 200;
      let checked = checkResponse.call(this, res, successCode, '获取权限树失败');
      if(!checked) return [];
      return res.data;
    },
    getSelectedRights() {
      if(this.dialogVisible) {
        this.seletedRightIds = this.$refs['tree'].getCheckedNodes(false, true).map(right => right.id);
      }
    },
    // 更新权限树与当前用户的权限
    async updateData() {
      this.rightsTree = await this.getRightsTree();
      if(this.roleId) {
        this.role = await this.getRoleById(this.roleId);
      }
    },
    async saveChange() {
      this.getSelectedRights();
      // console.log(this.seletedRightIds);
      let res = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: this.seletedRightIds.join(',')
      });
      const successCode = 200;
      let checked = checkResponse.call(this, res, successCode, '保存失败');
      if(!checked) return false;
      this.$message.success(res.meta.msg);
      this.$emit('distributeRights');
    }
  },
  computed: {
    roleRights() {
      if(!this.role) return [];
      return this.role.children;
    },
    roleName() {
      if(!this.role) return '';
      return this.role.roleName;
    },
    // 获取当前用户的三级权限，在权限树上展示为已分配的权限。
    leafRightIds() {
      let level2s = this.roleRights.map(level1 => level1.children).flat();
      let level3s = level2s.map(level2 => level2.children).flat();
      return level3s.map(item => item.id);
    },
  },
  created() {
    this.updateData();
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      if(newVal) {
          this.updateData();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  span {
    font: {
      size: 16px;
      // weight: bold;
    }
  }
}
.el-tree {
  max-height: 600px;
  overflow: auto;
      &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      // background: rgba(255, 99, 71, .3);
      background-color: rgba(#323744, 0.4);
      // background-color: #fff;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(#323744, 0.8);
      // background: rgba(255, 99, 71, .9);
      border-radius: 5px;
    }
}
// .distribute-rights {
//   /deep/ .el-dialog__body {
//     max-height: 600px;
//     overflow: auto;
//   }
// }
</style>