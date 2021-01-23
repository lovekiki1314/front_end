<template>
  <div class="BtcSystemDevelopmentDetail">
    <div class="block-main-body">
      <section>
        <div>
          <p align="center">比特币区块链每日发展情况统计</p>
        </div>
      </section>
      <div>
      </div>
      <div>
        <b-tabs pills
                card
                align="center">
          <b-tab title="每日比特币交易数据"
                 active
                 name="TXC"
                 @click="handleClick('TXC')">
            <Present v-if='is_TXC_Update'
                     :url_detail="'transaction_curve'"
                     :miner_search_flag="'0'"> </Present>
          </b-tab>
          <b-tab title="每日平均区块大小及区块内打包交易数量"
                 name="BKC"
                 @click="handleClick('BKC')">
            <Present v-if='is_BKC_Update'
                     :url_detail="'block_curve'"
                     :miner_search_flag="'0'"> </Present>
          </b-tab>
          <b-tab title="每日新比特币地址增长情况"
                 name="NAC"
                 @click="handleClick('NAC')">
            <Present v-if='is_NAC_Update'
                     :url_detail="'new_address_curve'"
                     :miner_search_flag="'0'"> </Present>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>

</template>

<script>
import Present from './Show'

export default {
  name: 'BtcSystemDevelopment',
  data () {
    return {
      activeName: 'second',
      is_TXC_Update: false,
      is_NAC_Update: false,
      is_MF_Update: false,
      is_BKC_Update: false,
      is_HP_Update: false
    }
  },
  mounted () { },
  methods: {
    handleClick (tabname) {
      if (tabname == 'TXC') {
        this.is_TXC_Update = true
        this.is_BKC_Update = false
        this.is_NAC_Update = false
        this.is_MF_Update = false
        this.is_HP_Update = false
      }
      if (tabname == 'BKC') {
        this.is_TXC_Update = false
        this.is_BKC_Update = true
        this.is_NAC_Update = false
        this.is_MF_Update = false
        this.is_HP_Update = false
      }
      if (tabname == 'NAC') {
        this.is_TXC_Update = false
        this.is_BKC_Update = false
        this.is_NAC_Update = true
        this.is_MF_Update = false
        this.is_HP_Update = false
      }
    }
  },
  fliters: {},
  components: {
    Present
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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