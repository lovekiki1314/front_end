<template>
  <div>
    <div class="nav">
      <el-row>
        <el-col :span="13">
          <p class="projectTitle">{{ projectTitle }}</p>
        </el-col>
        <el-col :span="11">
          <el-menu :default-active="activeIndex"
                   class="el-menu"
                   mode="horizontal"
                   text-color="#40a0ffce"
                   background-color="#ffffff"
                   active-text-color="#409EFF">
            <el-menu-item index="1"
                          @click="returnHomePage"
                          class="menuItem">
              {{ homePage }}
            </el-menu-item>
            <el-submenu index="2"
                        class="menuItem"
                        v-if="isLogin">
              <template slot="title">{{ dataQuery }}</template>
              <el-menu-item index="2-1"
                            class="menuSubItem"
                            @click="blockQueryClick">{{ BlockQuery }}</el-menu-item>
              <el-menu-item index="2-2"
                            class="menuSubItem"
                            @click="transactionQueryClick">{{ TransactionQuery }}</el-menu-item>
              <el-menu-item index="2-3"
                            class="menuSubItem"
                            @click="adressQueryClick">{{ AdressQuery }}</el-menu-item>
            </el-submenu>
            <el-submenu index="2"
                        class="menuItem"
                        disabled
                        v-else>
              <template slot="title">{{ dataQuery }}</template>
              <el-menu-item index="2-1"
                            class="menuSubItem"
                            @click="blockQueryClick">{{ BlockQuery }}</el-menu-item>
              <el-menu-item index="2-2"
                            class="menuSubItem"
                            @click="transactionQueryClick">{{ TransactionQuery }}</el-menu-item>
              <el-menu-item index="2-3"
                            class="menuSubItem"
                            @click="adressQueryClick">{{ AdressQuery }}</el-menu-item>
            </el-submenu>
            <el-submenu index="3"
                        class="menuItem"
                        v-if="isLogin">
              <template slot="title"> {{ dataStatistic }}</template>
              <el-menu-item index="3-1"
                            class="menuSubItem"
                            @click="bitcoinBlockchainDevelopmentClick">{{
          bitcoinBlockchainDevelopment
        }}</el-menu-item>
              <el-menu-item index="3-2"
                            class="menuSubItem"
                            @click="bitcoinSpendingStatisticClick">{{ bitcoinSpendingStatistic }}</el-menu-item>
            </el-submenu>
            <el-submenu index="3"
                        class="menuItem"
                        disabled
                        v-else>
              <template slot="title"> {{ dataStatistic }}</template>
              <el-menu-item index="3-1"
                            class="menuSubItem"
                            @click="bitcoinBlockchainDevelopmentClick">{{
          bitcoinBlockchainDevelopment
        }}</el-menu-item>
              <el-menu-item index="3-2"
                            class="menuSubItem"
                            @click="bitcoinSpendingStatisticClick">{{ bitcoinSpendingStatistic }}</el-menu-item>
            </el-submenu>
            <el-submenu index="4"
                        class="menuItem"
                        v-if="isLogin">
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
            <el-submenu index="5"
                        v-if="isLogin">
              <template slot="title">地址聚类</template>
              <el-menu-item index="5-1"
                            @click="singleAddressClusterClick">单地址聚类</el-menu-item>
            </el-submenu>
            <el-submenu index="5"
                        disabled
                        v-else>
              <template slot="title">地址聚类</template>
              <el-menu-item index="5-1"
                            @click="singleAddressClusterClick">单地址聚类</el-menu-item>
            </el-submenu>
            <template v-if="isLogin">
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
export default {
  data () {
    return {
      activeIndex: 1,
      projectTitle: '比特币区块链数据分析平台',
      homePage: '首页',
      dataQuery: '数据查询',
      BlockQuery: '区块查询',
      TransactionQuery: '交易查询',
      AdressQuery: '地址查询',
      dataStatistic: '数据统计',
      bitcoinBlockchainDevelopment: '比特币区块链发展情况',
      bitcoinSpendingStatistic: '比特币花费情况',
      dataAnalysis: '数据分析',
      communityActivityAnalysis: '行业活动分析',
      illegalActivitiyAnalysis: '非法活动分析',
      fundChainTracking: '资金链追踪',
      RegisteredOrLogin: '注册/登录',
      UserCenter: '个人中心',
    };
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  methods: {
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
    singleAddressClusterClick () {
      router.push('/cluster/singleCluster')
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
    userCenterClick () {
      var isAdmin = this.$store.state.isAdmin
      if (isAdmin == 0) {
        router.push('/userCenter')
      } else if (isAdmin == 1) {
        router.push('/Admin')
      }
    },
    loginClick () {
      router.push('/Login')
    }
  }
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
  margin-top: 20px;
  text-indent: 20px;
  color: #409eff;
}
.nav {
  display: block;
  font-weight: bold;
  border-bottom: solid 1px #e8e8e8;
}
</style>