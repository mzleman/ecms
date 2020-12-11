<template>
  <el-dialog
  class="new-user"
  title="添加新用户"
  :visible.sync="dialogVisible"
  width="500px"
  :before-close="close">
    <!-- 表单区域 -->
    <el-form :model="formData" ref="form" :rules="rules" label-position="left" label-width="80px">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="mobile" v-model="formData.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" @click="submitNewUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as validator from '@/utils/validate.js'
export default {
  name: 'AddUser',
  data() {
    return {
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          {validator: validator.validateUser, trigger: 'blur'}
        ],
        password: [
          {validator: validator.validatePass, trigger: 'blur'}
        ],
        email: [
          {validator: validator.validateEmail, trigger: 'blur'}
        ],
        mobile: [
          {validator: validator.validateMobile, trigger: 'blur'}
        ]
      }
    }
  },
  props: {
    dialogVisible: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    cancel() {
      this.reset();
      this.$emit('close');
    },
    reset() {
      this.$refs['form'].resetFields();
    },
    async validate() {
      let result = await validator.validateForm(this.$refs['form']).catch(err => err);
      return result;
    },
    async submitNewUser() {
      // 校验表单
      let checked = await this.validate();
      if(!checked) return false;
      // 提交表单
      let res = await this.$http.post('users', this.formData).catch(err => err);
      // 处理错误响应
      if(!res.meta || res.meta.status !== 201) {
        // console.log(res);
        this.$message.error('添加新用户失败');
        return false;
      } 
      // 处理正确响应
      this.$message.success('成功添加新用户！');
      this.$emit('addUser', this.formData.username);
      this.reset();
      this.close();
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>>
