<template>
  <div class="p">
    <div class="cardDivTitle">
      比特币区块链数据分析平台 —— 数据概貌介绍
    </div>
    <div>
      <div class="cardDiv">
        比特币链上数据源:
      </div>
      <p />
      <p>比特币区块链的数据，包括区块数据、交易数据和地址数据。<br /></p>
      <p>当前，链上数据源已成功实现了2009年1月至今的链上数据进行了同步、解析和规范化存储。<br /></p>
      <p>共计，本平台收集了超过60万的区块数据，超过5亿的交易数据，超过6亿的地址数据。<br /></p>
    </div>
    <div>
      <div class="cardDiv">
        比特币链下数据源:
      </div>
      <p />
      <p>公开的比特币区块链标签数据，包括比特币地址所属标签的数据、非法活动交易数据、比特币实时币价数据等。 <br /></p>
      <p>链下数据的来源主要包括公开平台WalletExplorer、Bitcoin Talk和Blockchain以及高质量文献。 <br /></p>
      <p>本平台经过合理的数据清洗，最终收集到了382个著名实体超过2千万的比特币地址及其标签信息。<br /></p>
      <p>其实体类型覆盖了暗网、交易所、赌博、矿工和服务商五类，为用户提供了距今数据量最大、类型最全面的已知身份标签-比特币地址的映射信息。<br /></p>
      <p>此外，链下数据源也收集了超过4百万的非法活动相关的交易数据和比特币地址数据，囊括勒索软件、庞氏骗局、比特币偷盗等多种非法活动类型。 <br /></p>
    </div>
    <div>
    <div class="cardDiv">实时区块数据反馈</div>
      <!-- <table class="table">
        <tbody>
          <tr>
            <th>区块高度</th>
            <th>区块大小(字节)</th>
            <th>时间</th>
            <th>区块哈希</th>
          </tr>
          <tr>
            <td>632212</td>
            <td>1311173</td>
            <td>10分钟前</td>
            <td>00000000000000e</td>
          </tr>
          <tr>
            <td>632210</td>
            <td>13113</td>
            <td>15分钟前</td>
            <td>000000000000a</td>
          </tr>
        </tbody>
      </table> -->
      <div class="BlockList" ref="test2">
        <el-table :data="blockList"
                  :header-cell-style="{background:'#dddddd',color:'#000000'}">
          <el-table-column label="区块高度"
                           prop="height"
                           width="200">
                          <template slot-scope="scope">
                            <router-link :to="{ name: 'blockQuery', params: { msgKey: scope.row.height }}">
                              {{scope.row.height}}
                            </router-link>
                          </template></el-table-column>
          <el-table-column label="区块大小"
                           prop="size"
                           width="200"></el-table-column>
          <el-table-column label="时间"
                           prop="time"
                           width="250"></el-table-column>
          <el-table-column label="区块哈希"
                           prop="hash"
                           ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// import ImageList from './ImageList'

export default {
  data () {
    return {
      blockList: []
    }
  },
  components: {
    // ImageList
  },
  created () {
    this.$axios.post('http://10.176.34.161:8000/api/statistics/everyday/stats/btc/block/realtime').then(res => {
      // alert(res.data.content[0])
      this.blockList = []
      var array = res.data.content
      console.log(res.data)
      console.log(array)
      for (var i in array) {
        var temp = {}
        temp['height'] = array[i][0]
        temp['size'] = array[i][1]
        temp['time'] = array[i][2]
        temp['hash'] = array[i][3]
        this.blockList.push(temp)
      }
    })
  },
}
</script>

<style scoped>
.p p {
  font-family: PingFang SC;
  font-weight: 500;
  text-indent: 20px;
  padding: 0px 20px 0px 20px;
}
.cardDiv {
  font-family: PingFang SC;
  font-size: 1.2em;
  font-weight: 700;
  padding: 0px 20px 0px 20px;
}
.cardDivTitle {
  display: block;
  font-family: PingFang SC;
  font-size: 1.2em;
  font-weight: 900;
  margin: 20px 20px 20px 20px;
  text-align: center;
}
.cardDiv p {
  color: white;
  padding: 40px 40px 20px 40px;
}
.card {
  display: inline-block;
  vertical-align: middle;
  background-color: #40a0ffce;
  border-radius: 10px;
  width: 32%;
  height: 300px;
}
.card:nth-child(2) {
  width: 31%;
  margin: 0 2%;
}
.card p {
  line-height: 150%;
  text-indent: 2em;
  color: white;
  font-style: inherit;
  margin: 30px 20px 10px 20px;
}
.BlockList {
  width: 86%;
  margin: 10px 30px 10px 30px;

}
</style>
