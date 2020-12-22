<template>
  <div class="page">
    <el-form :model="registeredForm"
             :rules="fieldRules"
             ref="registeredForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-container"
             method="post">
      <h3 class="title">用户注册</h3>
      <el-form-item prop="character">
      </el-form-item>
      <el-form-item prop="userName">
        <el-input type="text"
                  v-model="registeredForm.userName"
                  auto-complete="off"
                  name="nm"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="registeredForm.password"
                  auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="passwordRepeat">
        <el-input type="password"
                  v-model="registeredForm.passwordRepeat"
                  auto-complete="off"
                  placeholder="确认密码"></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:98%"
                   @click.native.prevent="confirm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from '../../../router/index'
import store from '../../../store/index'
import axios from 'axios'
// import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    return {
      value: '选项1',
      registeredForm: {
        userName: '',
        password: '',
        passwordRepeat: ''
      },
      fieldRules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        passwordRepeat: [
          { required: true, message: '确认密码', trigger: 'blur' }
        ]
      },
      checked: true,
      isLogin: true
    }
  },
  methods: {
    confirm() {
      if (this.registeredForm.userName != '') {
        this.$axios
          .post(
            'http://10.176.34.161:8001/api/userManagement/user/checkRegistered',
            {
              userName: this.registeredForm.userName
            }
          )
          .then(res => {
            if (res.data.check === null) {
              if (
                this.registeredForm.userName === '' ||
                this.registeredForm.password === ''
              ) {
                alert('账号或密码不能为空')
                console.log(1)
              } else if (this.registeredForm.passwordRepeat === '') {
                alert('请再次输入密码进行确认')
                console.log(2)
              } else if (
                this.registeredForm.passwordRepeat !=
                this.registeredForm.password
              ) {
                alert('确认密码不一致')
              } else {
                var temp = {
                  userName: this.registeredForm.userName,
                  password: this.registeredForm.password,
                  isAdmin: false,
                  userNoteInformation: '',
                  finishedTask:[],
                  unfinishedTask:[]
                }
                var str = JSON.stringify(temp)
                console.log(str)
                this.$axios.post(
                  'http://10.176.34.161:8001/api/userManagement/user/insertUser',
                  {
                    user_info_form: str
                  }
                )
                router.push('/Login')
              }
            } else {
              alert('用户名已被注册')
            }
          })
      }
    }
  }
}
</script>

<style>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>
