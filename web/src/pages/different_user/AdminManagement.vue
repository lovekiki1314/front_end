<template>
<el-main>
  <div>
    <Navigation/>
    <div>
    <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              style="width: 100%">
      <el-table-column prop="userid"
                       label="user_id"
                       width="200">
      </el-table-column>
      <el-table-column prop="username"
                       label="账号">
      </el-table-column>
      <el-table-column prop="useradmin"
                       label="账号权限">
      </el-table-column>
      <el-table-column fixed="right"
                       label="管理员权限"
                       width="250">
        <template slot-scope="scope">
          <el-switch v-model="userList[scope.$index].isadmin"
                     active-text="开"
                     inactive-text="关"
                     inactive-color="#909399"
                     active-color="#13ce66"
                     @change="changeSwitch(userList[scope.$index])">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[2, 5, 10, 20]"
                   :page-size="pagesize"
                   layout="total, prev, pager, next, jumper"
                   :total="userList.length">
    </el-pagination>
    </div>
  </div>
</el-main>
</template>
<script>
import axios from 'axios'
import Navigation from '../../components/nav/Nav'
import router from '../../router'
axios.defaults.baseURL = 'http://localhost:3000'
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 100, //    每页的数据
      userList: []
    }
  },
  mounted() {
    this.handleUserList()
    if(this.$store.state.isLogin == false) {
        console.log('未登录')
        router.push('/')
      }
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) //点击第几页
    },
    handleUserList() {
      axios.get('http://10.176.34.161:8001/api/userManagement/user/get_user_info_for_admin').then(res => {
        var content = res.data.content
        console.log(content)
        for(var i in content) {
          var temp1 = content[i]
          var temp = {}
          temp['userid'] = temp1[0]
          temp['username'] = temp1[1]
          switch(temp1[2]) {
            case 0:
              temp['useradmin'] = '普通用户'
              break
            case 1:
              temp['useradmin'] = '管理员'
              break
            case 2:
              temp['useradmin'] = 'vip用户'
              break
          }
          temp['isadmin'] = temp1[2]==2
          this.userList.push(temp)
        }
        console.log(this.userList)

      })
    },
    QueryHistoricalOperations() {
      router.push('/User/UserFinishedTask')
    },
    changeSwitch(data) {
      console.log(data.isadmin)
      var changeadmin = 0
      if (data.isadmin) {
        alert('授予该用户管理员权限')
        this.$message({
          message: '授予该用户管理员权限',
          type: 'success'
        })
        data.useradmin = 'vip用户'
        changeadmin = 2
      } else {
        alert('取消该用户管理员权限')
        this.$message({
          message: '取消该用户管理员权限'
        })
        data.useradmin = '普通用户'
        changeadmin = 0
      }
      console.log(data.userid)
      console.log(data.useradmin)
      axios
        .post('http://10.176.34.161:8001/api/userManagement/user/modify_previlege', {
          user_id: data.userid,
          modify: changeadmin
        })
        .then(Response => {
          console.log(Response.data.modify)
        })
        handleUserList()
    }
  }
}
</script>
