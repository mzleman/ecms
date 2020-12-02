import {validateForm} from './validate'
import {userLogin} from '@/network/user'
import {saveUserToken} from '@/state/token'

function isValidUser(res) {
  if (res.meta.status === 200 && res.data && res.data.token) {
    return true;
  }
}

export async function login() {
  let res;
  try {
    await validateForm(this.$refs['login-form']);
  } catch (e) {
    return this.$message.error('请输入正确的登录信息');
  }
  try {
    res = await userLogin(this.loginData);
  } catch (e) {
    return this.$message.error('网络波动，请稍后再试');
  } 
  if(isValidUser(res)) {
    this.$message.success( {message: '登陆成功', duration: 1000} );
    saveUserToken(res.data);
    this.$router.replace('/home');
  } else {
    this.$message.error('用户名或密码错误');
  }
}