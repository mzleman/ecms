// 校验响应数据，使用时要绑定this为Vue实例。
export function checkResponse(res, successCode, errMsg_default) {
  if(!res.meta || res.meta.status !== successCode) {
    let msg = res.meta ?
      res.meta.msg ? res.meta.msg : errMsg_default
      : errMsg_default;
    this.$message.error(msg);
    return false;
  }
  return true;
}