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

// 登录时验证表单
export const validateForm = function (elForm) {
  return new Promise( (resolve, reject) => {
    elForm.validate( valid => {
      if(valid) resolve();
      else reject();
    });
  });
}