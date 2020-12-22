<template>
  <div>
    <Navigation/>
    <el-container>
      <el-aside width="200px"
                style="background-color: rgb(238, 241, 246)">
        <el-menu router='true'>
          <el-menu-item @click="userManagementClick">
            <i class="el-icon-user"></i>用户管理
          </el-menu-item>
          <el-menu-item @click="BlockchainInformationUpdateClick">
            <i class="el-icon-edit-outline"></i>区块链信息更新
          </el-menu-item>
          <el-menu-item @click="logout">
            <template>
              <el-button>退出账号</el-button>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
        <router-view />
    </el-container>
  </div>
</template>

<script>
import Navigation from '../../components/nav/Nav'
import router from '../../router'
export default {
  data() {
    return {
      tableData: [
        {
          UserName: '001',
          Account: '123564354',
          UserNoteInformation: '备注信息'
        },
        {
          UserName: '002',
          Account: '56764343',
          UserNoteInformation: '备注信息'
        },
        {
          UserName: '003',
          Account: '23456776543',
          UserNoteInformation: '备注信息'
        },
        {
          UserName: '004',
          Account: '3456765432',
          UserNoteInformation: '备注信息'
        },
        {
          UserName: '005',
          Account: '8765434567',
          UserNoteInformation: '备注信息'
        },
        {
          UserName: '006',
          Account: 'iuy54345ty',
          UserNoteInformation: '备注信息'
        }
      ]
    }
  },
  components: {
    Navigation
  },
  methods: {
    QueryHistoricalOperations() {
      router.push('/User/UserFinishedTask')
    },
    userManagementClick() {
      router.push('/AdminManagement')
    },
    BlockchainInformationUpdateClick() {
      router.push('/Admin/BlockchainInformationUpdate')
    },
    logout() {
      sessionStorage.removeItem("userid")
      sessionStorage.removeItem("isLogin")
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("isAdmin")
      this.$store.state.isLogin = !this.$store.state.isLogin
      this.$store.state.id = null
      this.$store.state.userName = null
      this.$store.state.isAdmin = null
      console.log(this.$store.state.isLogin)
      alert("退出成功")
      router.push('/')
    }
  }
}
</script>
