<template>
  <div class="BtcSpentStateDetail">
    <div class="block-main-body">
      <section>
        <div>
          <p align="center">比特币花费情况统计</p>
        </div>
      </section>
      <div>
        <b-tabs pills
                card
                align="center">
          <b-tab title="比特币地址余额分布"
                 active
                 name="BD"
                 @click="handleClick('BD')">
            <Present v-if='is_BD_Update'
                     :url_detail="'balance_distribution'"
                     :miner_search_flag="'2'"> </Present>
          </b-tab>
          <b-tab title="区块平均矿工费"
                 name="MF"
                 @click="handleClick('MF')">
            <Present v-if='is_MF_Update'
                     :url_detail="'miner_fee'"
                     :miner_search_flag="'1'"> </Present>
          </b-tab>
          <b-tab title="比特币历史价格走势"
                 name="HP"
                 @click="handleClick('HP')">
            <Present v-if='is_HP_Update'
                     :url_detail="'history'"
                     :miner_search_flag="'0'"> </Present>
          </b-tab>
          <!-- <b-tab title="已花费比特币平均持有时间分布"  name="MF" @click="handleClick('MF')">
              <Present v-if='is_MF_Update' :url_detail="'holding_time_curve'" :miner_search_flag="'0'"> </Present>
            </b-tab>
            <b-tab title="长时间未花费比特币的数量分布"  name="HP" @click="handleClick('HP')">
              <Present v-if='is_HP_Update' :url_detail="'unspent_distribution'" :miner_search_flag="'0'"> </Present>
            </b-tab> -->
        </b-tabs>
      </div>
    </div>
  </div>

</template>

<script>
import Present from './Show'

export default {
  name: 'BtcSpentState',
  data () {
    return {
      info: '',
      inputData: '',
      is_BD_Update: false,
      is_MF_Update: false,
      is_HP_Update: false,
      is_FTA_Update: false
    }
  },
  mounted () { },
  methods: {
    handleClick (tabname) {
      if (tabname == 'BD') {
        this.is_BD_Update = true
        this.is_MF_Update = false
        this.is_HP_Update = false
        this.is_FTA_Update = false
      }
      if (tabname == 'FTA') {
        this.is_BD_Update = false
        this.is_MF_Update = false
        this.is_HP_Update = false
        this.is_FTA_Update = true
      }
      if (tabname == 'MF') {
        this.is_BD_Update = false
        this.is_MF_Update = true
        this.is_HP_Update = false
        this.is_FTA_Update = false
      }
      if (tabname == 'HP') {
        this.is_BD_Update = false
        this.is_MF_Update = false
        this.is_HP_Update = true
        this.is_FTA_Update = false
      }
    }
  },
  fliters: {},
  components: {
    Present
  }
}
</script>

<style scoped>
、
.block-main-body {
  position: relative;
  vertical-align: middle;
  width: 90%;
  margin: 0 auto;
}
b-card {
  width: 90%;
}
</style>