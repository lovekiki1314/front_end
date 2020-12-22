<template>
  <div>
    <el-container>
      <el-aside width="200px"
                style="background-color: rgb(238, 241, 246)">
        <el-menu router='true'>
          <el-menu-item @click="superUserManagementClick">
            <i class="el-icon-user"></i>用户管理
          </el-menu-item>
          <el-menu-item @click="adminManagementClick">
            <i class="el-icon-s-check"></i>管理员管理
          </el-menu-item>
          <el-menu-item @click="BlockchainInformationUpdateClick">
            <i class="el-icon-edit-outline"></i>区块链信息更新
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import router from '../../../router/index'
export default {
  data() {
    return {}
  },
  methods: {
    superUserManagementClick() {
      router.push('/SuperAdmin/SuperAdminUserManagement')
    },
    adminManagementClick() {
      router.push('/SuperAdmin/AdminManagement')
    },
    BlockchainInformationUpdateClick() {
      router.push('/SuperAdmin/BlockchainInformationUpdate')
    }
  }
}
</script>
<style scoped>
</style>
