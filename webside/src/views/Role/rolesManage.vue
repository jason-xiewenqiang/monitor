<template>
  <div>
    <el-card class="card-ctrl">
      <el-row>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="onCreate">新增</el-button>
          <el-button type="success" icon="el-icon-refresh" size="small" @click="onRefresh">刷新</el-button>
        </el-col>
      </el-row>
      <br />
      <el-table v-loading="loading" :data="data" stripe class="table">
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="state" label="角色状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.state === 0" size="mini" type="info"><i class="ic ic-lock"></i> 锁定</el-tag>
            <el-tag v-else-if="scope.row.state === 1" size="mini" type="success">正常</el-tag>
            <el-tag v-else size="mini" type="danger">未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-tooltip class="item" effect="dark" content="菜单授权" placement="bottom">
              <el-button circle plain type="primary" icon="el-icon-edit" size="small" @click="onEdit(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <el-button v-if="scope.row.state != 0" circle plain type="danger" icon="el-icon-minus" size="small" @click="onDelete(scope.$index, scope.row)"> </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="param.page"
          :page-size="param.limit"
          layout="sizes,prev,pager,next,total"
          :page-sizes="[5, 10, 20]"
          :total="total"
          background
          @current-change="onCurrentChange"
          @size-change="onSizeChange"
        >
        </el-pagination>
      </div>
    </el-card>

    <el-dialog v-model="edit_visible" center :title="posted.role.roleName">
      <role-edit :current-role="posted" @success="onEditSuccess"></role-edit>
    </el-dialog>
    <el-dialog v-model="add_visible" title="新增角色">
      <role-new @success="onCreateSuccess"></role-new>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import RoleEdit from './rolesEdit.vue'
import RoleNew from './rolesNew.vue'

const useConfirmDelete = (index: any) => {
  console.log(index)
  ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 此处执行接口异步删除角色
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
export default defineComponent({
  name: 'RoleManage',
  components: {
    RoleEdit,
    RoleNew
  },
  setup() {
    const state = reactive({
      url: {
        c: '/role/add',
        r: '/role/list',
        u: '/role/update',
        d: '/role/delete'
      },
      param: {
        limit: 10,
        page: 1
      },
      data: [
        { roleName: '超级管理员', state: 1 },
        { roleName: '管理员', state: 1 }
      ],
      loading: false,
      is_search: false,
      add_visible: false,
      edit_visible: false,
      detail_visible: false,
      posted: {
        role: {
          roleName: '',
          state: 1
        }
      }
    })
    // 动态计算total;
    const total = computed(() => state.data.length)
    /**
     * @description 请求接口获取当前设置角色，默认始终有超级管理员角色
     */
    const fetchData = () => {}
    const onCurrentChange = () => {
      fetchData()
    }
    const onSizeChange = (val: number) => {
      state.param.limit = val
      fetchData()
    }
    const onCreate = () => {
      state.add_visible = true
    }
    const onCreateSuccess = (val: any) => {
      console.log(val)
      const newRole = { roleName: val.roleName, state: 1 }
      state.data.push(newRole)
      state.add_visible = false
      fetchData()
    }
    const onEditSuccess = () => {
      state.edit_visible = false
      fetchData()
    }
    const onRefresh = () => {
      state.is_search = false
      fetchData()
    }
    const onEdit = (index: any, row: any) => {
      // this.$set(this.posted, 'role', row);
      console.log('row', row)
      state.posted.role = row
      console.log(index, row)
      state.edit_visible = true
    }
    const onDelete = (index: any, row: any) => {
      console.log(index, row)
      useConfirmDelete(index)
    }
    return {
      ...toRefs(state),
      total,
      onCurrentChange,
      onSizeChange,
      onCreate,
      onCreateSuccess,
      onEditSuccess,
      onRefresh,
      onEdit,
      onDelete
    }
  }
})
</script>
<style lang="stylus" scoped></style>
