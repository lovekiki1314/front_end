<template>
  <!--受害者迁移情况-->
  <div>
    <p>受害者迁移情况</p>
    <div id="illegal_container3_1"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataG2: []
    }
  },
  props: {
    data: {}
  },
  methods: {
    paint (val) {
      document.getElementById('illegal_container3_1').innerHTML = ''
      var array = val
      for (var i in array) {
        for (var j in array[i]) {
          if (j == 'flow') {
            array[i] = array[i][j]
          }
        }
      }
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
          switch (j) {
            case 'incoming':
              temp['type'] = '转入'
              break
            case 'outgoing':
              temp['type'] = '转出'
              break
            case 'stable':
              temp['type'] = '稳定'
              break
          }
          temp['num'] = result_num[i][j]
          temp['amount'] = result_amount[i][j]
          result.push(temp)
        }
      }
      this.dataG2 = result
      console.log(result)

      const chart = new this.$Chart({
        container: 'illegal_container3_1',
        width: 800,
        height: 400
      })
      chart.data(this.dataG2)
      chart
        .interval()
        .position('genre*num')
        .color('type')
      chart.render()
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