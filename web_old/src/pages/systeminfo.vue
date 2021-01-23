<template>
<div>
      <Navigation />
      <div class="p">
        <div class="systeminformationtitle">
          比特币区块链数据分析平台 —— 系统简介
        </div>
        <p />
        
        <div class="systeminformation">
          <p style="text-indent: 3em">比特币系统设计匿名支付机制以保护用户交易隐私。但该匿名化特性已应用于不少非法活动，引发诸多安全风险。例如，全球最大的数字货币交<br /></p>
          <p>易所因被盗价值约5亿美元的比特币而被迫关闭。现有数据分析方法无法直接分析违法用户的匿名化交易行为，急需设计全新的智能化分析方法。为<br /></p>
          <p>此，我们开发比特币区块链数据智能分析平台，以<strong>数据驱动</strong>的方式重点分析匿名交易中用户身份及其活动目的。<br /></p><br />
          <p>本平台有三大特色功能：<br /></p>
          <p>
            <strong>一 智能化的地址关联分析。</strong>
            设计了比特币地址聚类算法挖掘地址间关系，聚类特定用户的相关地址集，成功突破系统的匿名性局限。图中展示了平<br /></p>
          <p>台对目标地址所属用户的相关地址集的分析，包括地址集间的关联强弱、各地址余额情况等。<br /></p><br />
          <p><strong>二 智能化的活动分析。</strong>创新引入比特币行业的概念，应用深度学习等技术描述比特币系统中稳定、具有代表性的模块化结构，并基于全量数据从资金<br /></p>
          <p>流动和用户迁移两个角度进行行业级宏观分析，展示比特币生态系统发展趋势。并深入分析高发非法活动（如勒索活动）的规律，如活跃时间、对各<br /></p>
          <p>行业影响等。<br /></p><br />
          <p><strong>三 智能化的资金追踪分析。</strong>平台集成主流的比特币资金追踪方法，首次以交易、地址、用户和行业四个维度全方位展示资金追踪结果。<br /></p><br />
          <button @click="topicture">Submit</button>
        </div>
      </div>
      
</div>
</template>


<script>
import Navigation from '../components/nav/Nav'
import router from '../router'
export default {
  components: {
    Navigation,
  },
  mounted() {
    
  },
  method: {
    

  }
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
.systeminformation {
  padding: 40px 10% 10px 10%;
  font-family: PingFang SC;
  font-weight: bold;
}
.systeminformationtitle {
  display: block;
  font-family: PingFang SC;
  font-size: 1.2em;
  font-weight: 900;
  margin: 20px 20px 20px 20px;
  text-align: center;

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
</style>