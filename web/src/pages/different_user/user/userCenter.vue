<template>
  <div>
    <Navigation/>
    <el-container>
      <el-aside width="200px"
                style="background-color: rgb(238, 241, 246)">
        <el-menu router='true'>
          <el-menu-item @click="userFinishedTaskClick">
            <i class="el-icon-circle-check"></i>已完成任务
          </el-menu-item>
          <el-menu-item @click="userUnfinishedTaskClick">
            <i class="el-icon-edit-outline"></i>正在进行的任务
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
import Navigation from '../../../components/nav/Nav'
import router from '../../../router'
export default {
  name: 'AdminIndex',
  data() {
    return {}
  },
  components: {
    Navigation
  },
  mounted() {
    if(this.$store.state.isLogin == false) {
        console.log('未登录')
        router.push('/')
    }
  },
  methods: {
    userFinishedTaskClick() {
      router.push('/userCenter/userFinishedTask')
    //   axios.get('http://localhost:3000/User/1').then(response => {
    //       console.log(response.data)
    //   })
    },
    userUnfinishedTaskClick() {
      router.push('/userCenter/userUnfinishedTask')
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

<style>
.el-aside {
  color: #333;
}
.elProgress {
  padding: 20px 200px 20px 10px;
}
</style>
