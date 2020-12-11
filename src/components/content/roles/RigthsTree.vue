<template>
  <div class="rights-tree">
    <el-row  class="level1" :class="{firstone: i ===0 }" v-for="(level1, i) in rights" :key="level1.id" >
      <el-col :span="5" >
        <el-tag>
          {{ level1.authName }}
        </el-tag>
      </el-col>
      <el-col :span="19">
        <el-row v-for="(level2, j) in level1.children" :key="level2.id" class="level2" :class="{firstone: j===0}">
          <el-col :span="8">
            <el-tag type="success">{{ level2.authName }}</el-tag>
          </el-col>
          <el-col :span="11">
            <el-tag class="level3" type="warning" v-for="level3 in level2.children" :key="level3.id">
              {{ level3.authName }}
            </el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="empty-info" v-if="!rights.length"> 此角色暂未分配权限 </p>
  </div>
</template>

<script>
export default {
  name: 'RightsTree',
  props: {
    rights: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  display: flex;
  align-items: center;
  &:not(.firstone) {
    border-top: 1px solid rgba(#ddd, 0.4);
  }
  &.level2, &.level1{
    padding: 5px;
  }
  
}
.level3 {
  margin: 10px;
}
.el-row.firtone .level3 {
  margin: 0 10px;
}
.empty-info {
  color: rgb(202, 156, 56);
}
</style>