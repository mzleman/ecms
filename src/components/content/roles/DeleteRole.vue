<template>
  <div class="delete-role">
  </div>
</template>

<script>
import {checkResponse} from '@/utils/response.js';
export default {
  name: 'DeleteRole',
  data() {
    return {
      rolename: ''
    }
  },
  props: {
    roleId: {
      type: Number,
      required: true,
      default: NaN
    }
  },
  methods: {
    async delete() {
      let res = await this.$http.delete(`roles/${this.roleId}`).catch(err => err);
      const successCode = 200;
      if(!res.meta || res.meta.status !== successCode) {
        const default_msg = '无法删除用户';
        const msg = res.meta? 
                    res.meta.msg? res.meta.msg : default_msg
                    :default_msg;
        return this.$message.error(msg);
      }
      this.$message.success('成功删除用户');
      this.$emit('deleteRole');
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
    async getRolename() {
      let res = await this.$http.get(`roles/${this.roleId}`).catch(err => err);
      const successCode = 200;
      let checked = checkResponse.call(this, res, successCode, '删除角色失败');
      if(!checked) return false;
      this.roleName = res.data.roleName;
      return true;
    },
    confirm() {
        this.$confirm(`此操作将永久删除角色： ${this.roleName} ，是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( _ => this.delete() )
        .catch( _ => this.cancel() );          
      }
  },
  async mounted() {
    let res = await this.getRolename();
    if(!res) {
      this.cancel();
      this.$message.error('出错啦~');
    }
    this.confirm();
  }
}
</script>

<style>

</style>