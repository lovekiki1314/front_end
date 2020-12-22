<template>
  <div class="Main">
    <Navigation/>
      <DevelopmentTab/>
  </div>
</template>
<script>
import Navigation from '../../components/nav/Nav'
import DevelopmentTab from '../../components/data_statistics/drawing/BtcDevelopmentTab'
import router from '../../router'
export default {
  data() {
    return {
      blockChainDevelopmentRadio: '比特币地址余额分布',
      form: {},
    }
  },
  components: {
      DevelopmentTab,
      Navigation
  },
  mounted() {
    if(this.$store.state.isLogin == false) {
      console.log('未登录')
      router.push('/')
    }
  }
}
</script>

<style scoped>
.Main {
  font-family: PingFang SC;
  font-weight: bold;
}
</style>
