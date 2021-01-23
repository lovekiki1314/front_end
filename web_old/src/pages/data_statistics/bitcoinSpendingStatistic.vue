<template>
  <div>
    <Navigation/>
    <div class="Main">
        <SpendingTab/>
    </div>
  </div>
</template>
<script>
import Navigation from '../../components/nav/Nav'
import SpendingTab from '../../components/data_statistics/drawing/BtcSpendTab'
import router from '../../router'
export default {
  data() {
    return {
    }
  },
  components: {
      SpendingTab,
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
