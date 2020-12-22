<template>
  <div>
    <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              style="width: 100%">
      <el-table-column prop="userName"
                       label="用户名"
                       width="180">
      </el-table-column>
      <el-table-column prop="account"
                       label="账号">
      </el-table-column>
      <el-table-column prop="userNoteInformation"
                       label="备注信息">
      </el-table-column>
      <el-table-column fixed="right"
                       prop="notAdmin"
                       label="是否授予管理员权限"
                       width="250">
        <template slot-scope="scope">
          <el-switch v-model="userList[scope.$index].notAdmin"
                     inactive-text="否"
                     active-text="是"
                     active-color="#13ce66"
                     inactive-color="#909399"
                     @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="信息维护"
                       width="250">
        <template>
          <el-button @click="QueryHistoricalOperations"
                     type="primary"
                     size="small">查询历史操作</el-button>
          <el-button type="danger"
                     size="small">更改密码</el-button>
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
  </div>
</template>
<script>
import router from '../../../router/index'
import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000'
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      userList: [
        {
          id: 0,
          userName: 'xiaoxiaoming',
          userNoteInformation: '备注1',
          account: 10001,
          password: 123456,
          notAdmin: false,
          finishedTask: [
            {
              id: 0,
              QueryItem: '查询项目xiaoming',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 1,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 2,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 3,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 4,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            }
          ],
          unfinishedTask: [
            {
              id: 0,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 1,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 2,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 3,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 4,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            }
          ]
        },
        {
          id: 1,
          userName: 'wang',
          userNoteInformation: '备注2',
          account: 10002,
          password: 123456,
          notAdmin: false,
          finishedTask: [
            {
              id: 0,
              QueryItem: '查询项目wang',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 1,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 2,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 3,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 4,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            }
          ],
          unfinishedTask: [
            {
              id: 0,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 1,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 2,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 3,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            },
            {
              id: 4,
              QueryItem: '查询项目',
              QueryData: '输入的数据',
              TaskStatus: 1
            }
          ]
        }
      ]
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
      axios.get('http://localhost:3000/User').then(response => {
        this.userList = response.data
      })
    },
    QueryHistoricalOperations() {
      router.push('/User/UserFinishedTask')
    }
    // changeSwitch(row) {
    //   console.log(row.notAdmin)
    //   axios
    //     .patch('/User/' + row.id, {
    //       notAdmin: !row.notAdmin
    //     })
    //     .then(Response => {
    //       console.log(Response.data)
    //     })
    // }
  }
}
// axios.get('/User').then(response => {
//   tableData = response.data
//   console.log(tableData)
// })
</script>
