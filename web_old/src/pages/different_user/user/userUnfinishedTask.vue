<template>
<el-main>
  <div>
    <el-table :data="unfinishedList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              style="width: 100%"
              :header-cell-style="{background:'#E6A23C',color:'#ffffff'}">
      <el-table-column prop="QueryItem"
                       label="未完成项目"
                       width="180">
      </el-table-column>
      <el-table-column prop="InputData"
                       label="已输入数据"
                       width="250">
      </el-table-column>
      <el-table-column prop="QueryData"
                       label="已输入数据"
                       width="180">
      </el-table-column>
      <el-table-column prop="TaskStatus"
                       label="任务状态">
      </el-table-column>
    </el-table>
    <el-pagination 
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="pagesize"
                   layout="total, prev, pager, next, jumper"
                   :total="unfinishedList.length">
    </el-pagination>
  </div>
</el-main>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      unfinishedList: []
    }
  },
  created () {
    this.handleUnfinishedList()
  },
  methods: {
    // 初始页currentPage和数据data
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) //点击第几页
    },
    handleUnfinishedList () {
      this.$axios
        .post('http://10.176.34.161:8001/api/userManagement/user/unfinishedWork', {
          id: this.$store.state.id
        })
        .then(res => {
          console.log('未完成任务')
          console.log(res.data)
          var content = res.data.content
          this.unfinishedList = []
          for (var i in content) {
            if (content[i] != null) {
              var temp = {}
              switch (content[i].type) {
                case 'community':
                  temp['QueryItem'] = '行业分析'
                  break
                case 'illegal':
                  temp['QueryItem'] = '非法活动'
                  break
                case 'tracking':
                  temp['QueryItem'] = '资金追踪'
                  break
                case 'cluster':
                  temp['QueryItem'] = '聚类'
                  break
              }
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
                  console.log(temp1)
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
                  // if (inputDataJson.target_address != '') {
                  //   temp1['target_address'] = '目标地址：' + inputDataJson.target_address
                  // }
                  // if (inputDataJson.rule_map != '') {
                  //   temp1['rule_map'] = '选择的规则和权重：' + inputDataJson.rule_map
                  // }
                  // if (inputDataJson.rule_weight != '') {
                  //   temp1['rule_weight'] = ' 多输入规则的权重：' + inputDataJson.rule_weight
                  // }
                  // if (inputDataJson.coinbase_weight != '') {
                  //   temp1['coinbase_weight'] = '挖矿权重：' + inputDataJson.coinbase_weight
                  // }
                  // if (inputDataJson.deep != '') {
                  //   temp1['deep'] = '迭代深度' + inputDataJson.deep
                  // }
                  // temp['InputData'] = ''
                  // for (var j in temp1) {
                  //   temp['InputData'] += JSON.stringify(temp1[j]) + "  "
                  // }
                  // temp['InputData'] = temp['InputData'].replace(/\"/g, '')
                  break
              }
              temp['QueryData'] = content[i].params
              switch(content[i].status){
                case 0:
                  temp['TaskStatus'] = '任务等待中'
                  break
                case 1:
                  temp['TaskStatus'] = '任务等待中'
                  break
                case 2:
                  temp['TaskStatus'] = '任务进行中'
                  break
                case 3:
                  temp['TaskStatus'] = '任务异常'
                  break
              }

              
              this.unfinishedList.push(temp)
            }
          }
        })
    }
  }
}
</script>
