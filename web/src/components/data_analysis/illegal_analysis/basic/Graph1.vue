<template>
  <!--非法活动活跃时间段-->
  <div>
    <p>非法活动活跃时间段</p>
    <el-table :data="dataForIllegalTime"
              :header-cell-style="{background:'#67C23A',color:'#ffffff'}">
      <el-table-column prop="startTime"
                       label="开始时间"
                       sortable></el-table-column>
      <el-table-column prop="endTime"
                       label="结束时间"
                       sortable></el-table-column>
    </el-table>
    <div id="illegal_container1_1"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataForIllegalTime:[]
    }
  },
  props: {
    data: {}
  },
  methods: {
    paint (val) {
      this.dataForIllegalTime=[]
      var array = val
      for (var i in array) {
        var temp = {}
        temp['startTime'] = array[i][0]
        temp['endTime'] = array[i][1]
        this.dataForIllegalTime.push(temp)
      }
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