<template>
<el-main>
  <div class="finishedTask">
    <el-main>
    <el-table :data="finishedList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              style="width: 100%"
              :header-cell-style="{background:'#67C23A',color:'#ffffff'}">
      
      <el-table-column prop="QueryItem"
                       label="已完成项目"
                       width="100">
      </el-table-column>
      <el-table-column prop="InputData"
                       label="已输入数据"
                       width="300">
      </el-table-column>
      <el-table-column prop="QueryData"
                       label="已输入数据"
                       width="400">
      </el-table-column>
      <!--
      <el-table-column prop="TaskStatus"
                       label="任务状态">
      </el-table-column> -->
      
      <el-table-column label="展示页面"
                      width="200">
        <template slot-scope="scope">
          <el-button @click="enter(scope.row)"
                     type="success">跳转</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                        width="250">
          <template slot-scope="scope">
          <el-button @click="deletetask(scope.row)"
                     type="success">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    </el-main>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   
                   :page-size="pagesize"
                   layout="total,  prev, pager, next, jumper"
                   :total="finishedList.length">
    </el-pagination>
    <!-- <el-button @click="admin()">管理员</el-button>
    <el-button @click="superAdmin()">超级管理员</el-button> -->
  </div>
</el-main>
</template>

<script>
import router from '../../../router'
import store from '../../../store'
export default {
  data () {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      finishedList: []
    }
  },
  created () {
    this.handleFinishedList()
  },
  methods: {
    admin () {
      router.push('/Admin')
    },
    superAdmin () {
      router.push('/SuperAdmin')
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) //点击第几页
    },
    handleFinishedList () {
      this.$axios
        .post('http://10.176.34.161:8001/api/userManagement/user/finishedWork', {
          id: this.$store.state.id
        })
        .then(res => {
          console.log('已完成任务')
          console.log(res.data)
          console.log(res.data.content)
          var content = res.data.content
          this.finishedList = []
          for (var i in content) {
            if (content[i] != null) {
              var temp = {}
              temp['id'] = content[i].id
              var inputDataJson = JSON.parse(content[i].params)
              switch (content[i].type) {
                case 'community':
                  temp['QueryItem'] = '行业分析'
                  var temp1 = {}
                  if (inputDataJson.startTime != '') {
                    temp1['startTime'] = '开始时间：' + inputDataJson.startTime
                  }
                  if (inputDataJson.endTime != '') {
                    temp1['endTime'] = '结束时间：' + inputDataJson.endTime
                  }
                  if (inputDataJson.timeUnit != '') {
                    temp1['timeUnit'] = '时间单元: ' + inputDataJson.timeUnit
                  }
                  if (inputDataJson.basic_info != '') {
                    temp1['basic_info'] = '基础维度：' + inputDataJson.basic_info
                  }
                  if (inputDataJson.industry_active_info != '') {
                    temp1['industry_active_info'] = '活跃维度：' + inputDataJson.industry_active_info
                  }
                  if (inputDataJson.address != '') {
                    temp1['address'] = '查询的地址：' + inputDataJson.address
                  }
                  if (inputDataJson.txhash != '') {
                    temp1['txhash'] = '查询的哈希' + inputDataJson.txhash
                  }
                  temp['InputData'] = ''
                  for (var j in temp1) {
                    temp['InputData'] += JSON.stringify(temp1[j]) + "  "
                  }
                  temp['InputData'] = temp['InputData'].replace(/\"/g, '')
                  break
                case 'illegal':
                  temp['QueryItem'] = '非法活动'
                  break
                case 'tracking':
                  temp['QueryItem'] = '资金追踪'
                  var temp1 = {}
                  if (inputDataJson.depth != '') {
                    temp1['depth'] = '查询深度：' + inputDataJson.depth
                  }
                  if (inputDataJson.method != '') {
                    temp1['method'] = '追踪方法：' + inputDataJson.method
                  }
                  if (inputDataJson.tx_hash != '') {
                    temp1['tx_hash'] = '查询的哈希：' + inputDataJson.tx_hash
                  }
                  temp['InputData'] = ''
                  for (var j in temp1) {
                    temp['InputData'] += JSON.stringify(temp1[j]) + "  "
                  }
                  temp['InputData'] = temp['InputData'].replace(/\"/g, '')
                  break
                case 'cluster':
                  temp['QueryItem'] = '聚类'
                  // if(inputDataJson.target_address!=''){
                  //   temp1['target_address'] = '目标地址：' + inputDataJson.target_address
                  // }
                  // if(inputDataJson.rule_map!=''){
                  //   temp1['rule_map'] = '选择的规则和权重：' + inputDataJson.rule_map
                  // }
                  // if(inputDataJson.rule_weight!=''){
                  //   temp1['rule_weight'] = ' 多输入规则的权重：' + inputDataJson.rule_weight
                  // }
                  // if(inputDataJson.coinbase_weight!=''){
                  //   temp1['coinbase_weight'] = '挖矿权重：' + inputDataJson.coinbase_weight
                  // }
                  // if(inputDataJson.deep!=''){
                  //   temp1['deep'] = '迭代深度' + inputDataJson.deep
                  // }
                  // temp['InputData'] = ''
                  // for (var j in temp1) {
                  //   temp['InputData'] += JSON.stringify(temp1[j]) + "  "
                  // }
                  // temp['InputData'] = temp['InputData'].replace(/\"/g, '')
                  break
              }
              // temp['QueryItem'] = content[i].type
              temp['QueryData'] = content[i].params
              temp['TaskStatus'] = content[i].status
              this.finishedList.push(temp)
            }
          }
          // var finishedTask = JSON.parse(res.data.content)
          // this.finishedList = finishedTask.info
          // console.log('列表')
          // console.log(finishedTask.info)
        })
    },
    enter (data) {
      var content = data
      console.log('用户')
      console.log(content)
      this.$axios.post('http://10.176.34.161:8001/api/getTaskResult', {
        user_id: this.$store.state.id,
        task_id: content.id,
      }).then(res => {
        console.log('后端获取结果')
        console.log(res.data)
        switch (content.QueryItem) {
          case '行业分析':
            console.log('测试')
            this.$cookies.set('task_id', content.id)
            this.$cookies.set('form', JSON.parse(content.QueryData))
            router.push('/data_analysis/communityGraph')
            break
          case '非法活动':
            this.$cookies.set('task_id', content.id)
            this.$cookies.set('illegal_form', JSON.parse(content.QueryData))
            router.push('/data_analysis/illegalGraph')
            break
          case '资金追踪':
            this.$cookies.set('tracking_form', JSON.parse(content.QueryData))
            this.$cookies.set('task_id', content.id)
            // this.$cookies.set('tracking_form', JSON.parse(content.QueryData))
            router.push('/data_analysis/trackingModelShowing')
            break
          case '聚类':
            this.$cookies.set('task_id', content.id)
            this.$cookies.set('cluster_form', JSON.parse(content.QueryData))
            router.push('/cluster/singleClusterGraph')
            break
        }
      })
    },
    deletetask (data) {
      var content = data
      console.log('删除')
      console.log(content)
      console.log(this.$store.state.id)
      this.$axios.post('http://10.176.34.161:8001/api/userManagement/user/delete_one_task',{
        task_id: content.id,
        user_id: this.$store.state.id,
        finished: 1
      }).then(res => {
        console.log(res.data.result)
        this.handleFinishedList()
      })
      
    }
  }
}
</script>

<style scoped>
.el-table {
  background-color: white;
}
.finishedTask {
  white-space: pre;
}
</style>
