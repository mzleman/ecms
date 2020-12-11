<template>
  <div class="rights">
    <breadcrumb first-level="权限管理" second-level="权限列表"/>
    <el-card>
      <el-table :data="userRights" border stripe>
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限说明"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag :type="tagClassMap.get(scope.row.level)"> 
              {{ levelMap.get(scope.row.level) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@components/common/Breadcrumb.vue';
export default {
  name: 'Rights',
  data() {
    return {
      userRights: [],
      levelMap: new Map([
        ['0', '一级权限'],
        ['1', '二级权限'],
        ['2', '三级权限']]
      ),
      tagClassMap: new Map([
        ['0', ''],
        ['1', 'success'],
        ['2', 'warning']
      ])
    }
  },
  methods: {
    async getRightsList() {
      let res = await this.$http.get('rights/list').catch(err => err);
      if (!res.meta || res.meta.status !== 200) {
        let default_msg = '获取用户列表失败';
        let msg = res.meta ?
          res.meta.msg ? res.meta.msg : default_msg 
          : default_msg;
        this.$message.error(msg);
        return [];
      }
      // console.log(res.data);
      return res.data;
    }
  },
  components: {
    Breadcrumb
  },
  async created() {
    let rights = await this.getRightsList();
    // if(!rights) return;
    this.userRights = rights;
  }
}
</script>

<style lang="scss" scoped>
@import '@css/mixin.scss';
.rights {
  padding: 20px;
  box-sizing: border-box;
}
.el-card {
  margin-top: 15px;
  // box-sizing: border-box;
  overflow: auto;
  @include el-card-style;
}
.el-table {
  padding-bottom: 20px;
  /deep/ th {
    font-weight: bold;
    color: rgb(95, 158, 160);
  }
}
</style>>

