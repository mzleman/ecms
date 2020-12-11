// 校验用户名输入框，不得为空
export const validateUser = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    callback();
  }
};

// 校验密码输入框，不得为空，长度不小于6
export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (value.length < 6) {
      callback(new Error('密码长度不小于6'));
    }
    callback();
  }
};

// 校验邮箱
export const validateEmail = (rule, value, callback) => {
  if (value === '') 
    return callback(new Error('请输入邮箱地址'));
  let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); // 正则表达式
  if(!reg.test(value)) 
    return callback(new Error('请输入有效的邮箱地址'));
  callback();
}

// 校验手机号
export const validateMobile = (rule, value, callback) => {
  if (value === '') 
    return callback(new Error('请输入手机号'));
  let reg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$"); // 手机号匹配的正则表达式
  if(!reg.test(value)) 
    return callback(new Error('请输入有效的手机号'));
  callback();
}

// 表单项不得为空
export const validateNotEmpty = (rule, value, callback) => {
  if(value === '') {
    return callback('请填写此内容')
  }
  callback();
}

// 登录时验证表单
export const validateForm = function (elForm) {
  return new Promise( (resolve, reject) => {
    elForm.validate( valid => {
      if(valid) resolve(true);
      else reject(false);
    });
  });
}

