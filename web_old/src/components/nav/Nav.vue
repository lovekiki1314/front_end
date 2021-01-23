<template>
  <div>
    <div class="nav">
      <el-row>
        <el-col :span="1">
          <img src="../../assets/fdulogo1.png" height="40" class="img"/>
        </el-col>
        <el-col :span="11">
          <p class="projectTitle">
            {{ projectTitle }} 
          </p>
          <p class="projectTitle1">
            {{daslab}}
          </p>
        </el-col>
        <el-col :span="12">
          <el-menu :default-active="activeIndex"
                   class="el-menu-demo"
                   mode="horizontal"
                   text-color="#40a0ffce"
                   background-color="#ffffff"
                   active-text-color="#409EFF"
                   @select="handleSelect">
            <el-menu-item index="1"
                          @click="returnHomePage"
                          class="menuItem">
              <template slot="title">{{ homePage }}</template>
            </el-menu-item>
            <el-menu-item index="2"
                          @click="systeminfo">系统简介
            </el-menu-item>
            <el-menu-item index="3"
                          @click="upload">上传
            </el-menu-item>
            <el-submenu index="3"
                        class="menuItem"
                        v-if="isAdmin==0 || isAdmin==2">
              <template slot="title">{{ dataQuery }}</template>
              <el-menu-item index="3-1"
                            class="menuSubItem"
                            @click="blockQueryClick">{{ BlockQuery }}</el-menu-item>
              <el-menu-item index="3-2"
                            class="menuSubItem"
                            @click="transactionQueryClick">{{ TransactionQuery }}</el-menu-item>
              <el-menu-item index="3-3"
                            class="menuSubItem"
                            @click="adressQueryClick">{{ AdressQuery }}</el-menu-item>
              <el-menu-item index="3-4"
                            class="menuSubItem"
                            @click="bitcoinBlockchainDevelopmentClick">{{bitcoinBlockchainDevelopment}}</el-menu-item>
              <el-menu-item index="3-5"
                            class="menuSubItem"
                            @click="bitcoinSpendingStatisticClick">{{ bitcoinSpendingStatistic }}</el-menu-item>
            </el-submenu>
            <el-submenu index="3"
                        class="menuItem"
                        disabled
                        v-else>
              <template slot="title">{{ dataQuery }}</template>
              <el-menu-item index="3-1"
                            class="menuSubItem"
                            @click="blockQueryClick">{{ BlockQuery }}</el-menu-item>
              <el-menu-item index="3-2"
                            class="menuSubItem"
                            @click="transactionQueryClick">{{ TransactionQuery }}</el-menu-item>
              <el-menu-item index="3-3"
                            class="menuSubItem"
                            @click="adressQueryClick">{{ AdressQuery }}</el-menu-item>
              <el-menu-item index="3-4"
                            class="menuSubItem"
                            @click="bitcoinBlockchainDevelopmentClick">{{bitcoinBlockchainDevelopment}}</el-menu-item>
              <el-menu-item index="3-5"
                            class="menuSubItem"
                            @click="bitcoinSpendingStatisticClick">{{ bitcoinSpendingStatistic }}</el-menu-item>
            </el-submenu>
            <el-submenu index="4"
                        class="menuItem"
                        v-if="isAdmin==2">
              <template slot="title"> {{ dataAnalysis }}</template>
              <el-menu-item index="4-1"
                            @click="CommunityAnalysisClick"
                            class="menuItem">{{ communityActivityAnalysis }}
              </el-menu-item>
              <el-menu-item index="4-2"
                            @click="illegalActivitiyAnalysisClick"
                            class="menuItem">
                {{ illegalActivitiyAnalysis }}
              </el-menu-item>
              <el-menu-item index="4-3"
                            @click="FundChainTrackingClick"
                            class="menuItem">
                {{ fundChainTracking }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4"
                        class="menuItem"
                        disabled
                        v-else>
              <template slot="title"> {{ dataAnalysis }}</template>
              <el-menu-item index="4-1"
                            @click="CommunityAnalysisClick"
                            class="menuItem">
                {{ communityActivityAnalysis }}
              </el-menu-item>
              <el-menu-item index="4-2"
                            @click="illegalActivitiyAnalysisClick"
                            class="menuItem">
                {{ illegalActivitiyAnalysis }}
              </el-menu-item>
              <el-menu-item index="4-3"
                            @click="FundChainTrackingClick"
                            class="menuItem">
                {{ fundChainTracking }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5"
                        v-if="isAdmin==2">
              <template slot="title">地址关联分析</template>
              <el-menu-item index="5-1"
                            @click="singleAddressClusterClick">单地址聚类</el-menu-item>
              <el-menu-item index="5-2"
                            @click="allAddressClusterClick">全量聚类</el-menu-item>           
            </el-submenu>
            <el-submenu index="5"
                        disabled
                        v-else>
              <template slot="title">地址关联分析</template>
              <el-menu-item index="5-1"
                            @click="singleAddressClusterClick">单地址聚类</el-menu-item>
              <el-menu-item index="5-2"
                            @click="allAddressClusterClick">全量聚类</el-menu-item> 
            </el-submenu>
            <template v-if="isAdmin==2 || isAdmin==1">
              <el-menu-item index="6"
                            @click="userCenterClick"
                            class="menuItem">
                <div>
                  <label>{{UserCenter}}</label>
                </div>
              </el-menu-item>
            </template>
            <template v-else>
              <el-menu-item @click="loginClick">{{RegisteredOrLogin}}</el-menu-item>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import router from '../../router'
import store from '../../store'
import html2canvas from 'html2canvas';
export default {
  data () {
    return {
      projectTitle: '比特币区块链数据分析平台',
      homePage: '首页',
      dataQuery: '数据分析',
      BlockQuery: '区块查询',
      TransactionQuery: '交易查询',
      AdressQuery: '地址查询',
      dataStatistic: '活动智能分析',
      bitcoinBlockchainDevelopment: '比特币区块链发展情况',
      bitcoinSpendingStatistic: '比特币花费情况',
      dataAnalysis: '活动智能分析',
      communityActivityAnalysis: '行业活动分析',
      illegalActivitiyAnalysis: '非法活动分析',
      fundChainTracking: '资金链追踪',
      RegisteredOrLogin: '注册/登录',
      UserCenter: '任务中心',
      daslab: '数据分析与安全实验室'
    };
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    },
    isAdmin: function() {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    systeminfo() {
      console.log('123')
      var canvas2 = document.createElement('canvas')
      
      let _canvas = document.querySelector('div')
      var w = parseInt(window.getComputedStyle(_canvas).width);
      var h = parseInt(window.getComputedStyle(_canvas).height);
      html2canvas(document.querySelector('div'), { canvas: canvas2 }).then(function(canvas) {
        //document.body.appendChild(canvas);
        //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
        document.querySelector(".down").setAttribute('href', canvas.toDataURL());
      });
      // router.push('/systeminfo')
    },
    upload() {
      router.push('/uploadlabel')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    returnHomePage () {
      
      router.push('/')
    },
    blockQueryClick () {
      router.push('/data_query/blockQuery')
    },
    transactionQueryClick () {
      router.push('/data_query/transactionQuery')
    },
    adressQueryClick () {
      router.push('/data_query/addressQuery')
    },
    bitcoinBlockchainDevelopmentClick () {
      router.push('/data_statistics/bitcoinBlockchainDevelopment')
    },
    bitcoinSpendingStatisticClick () {
      router.push('/data_statistics/bitcoinSpendingStatistic')
    },
    CommunityAnalysisClick () {
      router.push('/data_analysis/communityAnalysis')
    },
    illegalActivitiyAnalysisClick () {
      router.push('/data_analysis/illegalActivitiyAnalysis')
    },
    FundChainTrackingClick () {
      router.push('/data_analysis/trackingModel')
    },
    singleAddressClusterClick () {
      router.push('/cluster/singleCluster')
    },
    allAddressClusterClick () {
      router.push('/cluster/allCluster')
    },
    userCenterClick () {
      var isAdmin = this.$store.state.isAdmin
      if (isAdmin == 2) {
        router.push('/userCenter')
      } else if (isAdmin == 1) {
        router.push('/Admin')
      }
    },
    loginClick () {
      sessionStorage.removeItem("userid")
      sessionStorage.removeItem("isLogin")
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("isAdmin")
      this.$store.state.isLogin = !this.$store.state.isLogin
      this.$store.state.id = null
      this.$store.state.userName = null
      this.$store.state.isAdmin = null
      console.log(this.$store.state.isLogin)
      router.push('/Login')
    }
  },
}
</script>

<style scoped>
a {
  color: #282828;
  text-decoration: none;
}
a:hover {
  color: #409eff;
  text-decoration: none;
  font-weight: bold;
}
.projectTitle {
  margin-top: 5px;
  text-indent: 5px;
  color: #409eff;
  font-size: 17px;
  margin-bottom: 2px;
}
.projectTitle1 {
  margin-top: 4px;
  text-indent: 5px;
  color: #409eff;
  font-size: 11px;
  margin-bottom: 4px;
}

.nav {
  display: block;
  font-weight: bold;
  border-bottom: solid 1px #e8e8e8;
}
.img {
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-right: #409eff solid 1px;
}

</style>