<template>
  <div class="delete-user">
  </div>
</template>

<script>
import {checkResponse} from '@/utils/response.js';

export default {
  name: 'DeleteUser',
  data() {
    return {
      username: ''
    }
  },
  props: {
    userId: {
      type: Number,
      required: true,
      default: NaN
    }
  },
  methods: {
    async delete() {
      let res = await this.$http.delete(`users/${this.userId}`).catch(err => err);
      const successCode = 200;
      // 处理错误请求
      let checked = checkResponse.call(this, res, successCode, '无法删除用户');
      if(!checked) return false;
      // 处理成功请求
      this.$message.success('成功删除用户');
      this.$emit('deleteUser');
      this.$emit('close');
      return true;
    },
    cancel() {
      this.$emit('close');
    },
    async getUsername() {
      let res = await this.$http.get(`users/${this.userId}`).catch(err => err);
      const successCode = 200;
      if(!res.meta || res.meta.status !== successCode) {
        return false;
      }
      this.username = res.data.username;
      return true;
    },
    confirm() {
        this.$confirm(`此操作将永久删除用户： ${this.username} ，是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( _ => this.delete() )
        .catch( _ => this.cancel() );          
      }
  },
  async mounted() {
    let res = await this.getUsername();
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