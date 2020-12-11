<template>
  <el-dialog
  class="new-role"
  title="添加新角色"
  :visible.sync="dialogVisible"
  width="500px"
  :before-close="close">
    <!-- 表单区域 -->
    <el-form :model="formData" ref="form" :rules="rules" label-position="left" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input  v-model="formData.roleDesc"></el-input>
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
import {checkResponse} from '@/utils/response.js'
import {validateNotEmpty, validateForm} from '@/utils/validate.js'
export default {
  name: 'NewRole',
  data() {
    return {
      formData: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          {validator: validateNotEmpty, trigger: 'blur'}
        ],
        roleDesc: [
          {validator: validateNotEmpty, trigger: 'blur'}
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
      let result = await validateForm(this.$refs['form']).catch(err => err);
      return result;
    },
    async submitNewUser() {
      // 校验表单
      let checked = await this.validate();
      if(!checked) return false;
      // 提交表单
      let res = await this.$http.post('roles', this.formData).catch(err => err);
      // 处理错误响应
      const successCode = 201;
      checked = checkResponse.call(this, res, successCode, '添加新角色失败');
      if(!checked) return false;
      // 处理成功响应
      this.$message.success('成功添加新角色！');
      this.$emit('newRole');
      this.reset();
      this.close();
      return true;
    }
  }
}
</script>

<style>

</style>