<template>
  <!--重要成员情况-->
  <div>
    <h5>重要成员情况</h5>
    <el-table :data="dataForFamousEntity"
              :header-cell-style="{background:'#409EFF',color:'#ffffff'}">
      <el-table-column prop="type"
                       label="成员名称"
                       sortable></el-table-column>
      <el-table-column prop="num"
                       label="交易次数"
                       sortable></el-table-column>
      <el-table-column prop="amount"
                       label="交易金额"
                       sortable></el-table-column>
    </el-table>
    <div id="illegal_container2_3"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForFamousEntity: []
    }
  },
  props: {
    data: {}
  },
  methods: {
    paint (val) {
      this.dataForFamousEntity = []
      var array = val
      // 将形式为{{{}，{}}，{{}，{}}}
      var data = []
      for (var i in array) {
        for (var j in array[i]) {
          for (var k in array[i][j]) {
            var temp = {}
            temp['genre'] = j
            temp['type'] = k
            temp['num'] = array[i][j][k][0]
            temp['amount'] = array[i][j][k][1]
            data.push(temp)
          }
        }
      }
      //对不同数组中的数据进行加和主要是num、amount参数
      //num
      var result_num = {}
      for (i = 0; i < data.length; i++) {
        result_num[data[i].genre] = {}
      }
      for (i = 0; i < data.length; i++) {
        if (result_num[data[i].genre][data[i].type]) {
          result_num[data[i].genre][data[i].type] += data[i].num
        } else {
          result_num[data[i].genre][data[i].type] = data[i].num
        }
      }
      //amount
      var result_amount = {}
      for (i = 0; i < data.length; i++) {
        result_amount[data[i].genre] = {}
      }
      for (i = 0; i < data.length; i++) {
        if (result_amount[data[i].genre][data[i].type]) {
          result_amount[data[i].genre][data[i].type] += data[i].amount
        } else {
          result_amount[data[i].genre][data[i].type] = data[i].amount
        }
      }

      var result = []
      for (var i in result_num) {
        for (var j in result_num[i]) {
          var temp = {}
          temp['genre'] = i
          temp['type'] = j
          temp['num'] = result_num[i][j]
          temp['amount'] = result_amount[i][j]
          result.push(temp)
        }
      }
      array = result
      result = []
      for (var i in array) {
        if (array[i]['genre'] == 'pollution_entity_count_amount') {
          result.push(array[i])
        }
      }
      this.dataForFamousEntity = result
    }
  },
  watch: {
    data: function (val) {
      this.paint(val)
    }
  }
}
</script>

<style scoped>
</style>
