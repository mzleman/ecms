<template>
  <el-dialog
  title="编辑用户信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="close">
    <el-form v-if="userId" :model="formData" ref="form" :rules="rules" label-position="left" label-width="80px">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="formData.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="mobile" v-model="formData.mobile"></el-input>
      </el-form-item>
    </el-form>
    <p v-else>出错啦~~</p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import * as validator from '@/utils/validate.js'
export default {
  name: 'UpdateUser',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        email: [
          {validator: validator.validateEmail, trigger: 'blur'}
        ],
        mobile: [
          {validator: validator.validateMobile, trigger: 'blur'}
        ]
      }
    }
  },
  props:{
    dialogVisible: {
      required: true,
      type: Boolean,
      default: false
    },
    userId: {
      required: true,
      type: [Number, String],
      default: NaN
    }
  },
  methods: {
    reset() {
      this.$refs['form'].resetFields();
    },
    close() {
      this.$emit('close');
      this.reset();
    },    
    validate() {
      return validator.validateForm(this.$refs['form']).catch(err => err);
    },
    putContent() {
      return this.$http.put(`users/${this.userId}`, this.formData).catch(err => err);
    },
    async submit() {
      // 校验表单
      let checked = await this.validate();
      if(!checked) return false;
      // 提交表单
      let res = await this.putContent();
      // 处理错误响应
      const successCode = 200;
      if(!res.meta || res.meta.status !== successCode) {
        console.log(res);
        this.$message.error('更新用户信息失败');
        return false;
      } 
      // 处理正确响应
      this.$message.success('成功更新用户信息！');
      this.$emit('updateUser', this.formData.username);
      this.close();
      return true;
    }
  },
  watch: {
    async dialogVisible(newVal, oldVal) {
      if(!this.dialogVisible || isNaN(this.userId)){
        return false;
      }
      let res = await this.$http.get(`users/${this.userId}`).catch(err => err);
      // console.log(res);
      const successCode = 200;
      if(!res.meta || res.meta.status !== successCode) {
        this.$message.error('出错啦~');
        return false;
      }
      const keys = ['username', 'email', 'mobile'];
      keys.forEach(key => this.formData[key] = res.data[key]);
      return true;
    }
  }
}
</script>

<style>

</style>