<template>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{firstLevel}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{secondLevel}}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    firstLevel: {
      type: String,
      default: ''
    },
    secondLevel: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>