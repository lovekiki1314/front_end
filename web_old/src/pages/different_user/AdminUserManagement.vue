<template>
  <div>
    <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              style="width: 100%">
      <el-table-column prop="userName"
                       label="用户名"
                       width="180">
      </el-table-column>
      <el-table-column prop="userNoteInformation"
                       label="备注信息">
      </el-table-column>
      <el-table-column fixed="right"
                       label="信息维护"
                       width="250">
        <template slot-scope="scope">
          <el-button @click="QueryHistoricalOperations(scope.row.id)"
                     type="primary"
                     size="small"
                     prop="id">查询历史操作</el-button>
          <!-- <el-button type="danger"
                     size="small"
                     prop="id">更改密码</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[2, 5, 10, 20]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="userList.length">
    </el-pagination>
    <el-collapse-transition>
      <div v-show="show">
        <el-table :data="dataForQueryUserTask">
          <el-table-column prop="QueryItem"
                           label="已完成项目"
                           width="250">
          </el-table-column>
          <el-table-column prop="QueryData"
                           label="已输入数据"
                           width="250">
          </el-table-column>
          <el-table-column prop="TaskStatus"
                           label="任务状态">
          </el-table-column>
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import router from '../../../router/index'
import axios from 'axios'
export default {
  data() {
    return {
      show: false,
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      userList: [],
      dataForQueryUserTask: []
    }
  },
  created() {
    this.handleUserList()
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
      this.$axios
        .get('http://10.176.34.161:8001/api/userManagement/user/getUser')
        .then(res => {
          console.log(res.data.userList)
          var userList = res.data.userList
          this.userList = userList
          //   console.log(res.data)
          //   var array = res.data['idList']
          //   var idList = []
          //   for (var i = 0; i < array.length; i++) {
          //     idList[i] = array[i]['id']
          //   }
          //   console.log(idList)
        })
      //   axios.get('http://localhost:3000/User').then(response => {
      //     this.userList = response.data
      //   })
    },
    QueryHistoricalOperations(id) {
      var userList = this.userList
      var length = userList.length
      for (var i = 0; i < length; i++) {
        if (userList[i].id === id) {
          //   this.dataForQueryUserTask = userList[i].finishedTask
          var finishedTask = JSON.parse(userList[i].finishedTask)
          this.dataForQueryUserTask = finishedTask.info
        }
        // console.log(this.dataForQueryUserTask)
      }
      this.show = true
    }
  }
}
</script>
