<template>
  <div>
    <Navigation />
    <ImageList/>
    <Card/>
  </div>
</template>

<script>
import Navigation from '../../components/nav/Nav'
import ImageList from '../../components/home/ImageList'
import Card from '../../components/home/Card'
export default {
  components: {
    Navigation,
    ImageList,
    Card
  },
  mounted(){
    this.$axios.get()
    if(sessionStorage.getItem("userid") && sessionStorage.getItem("isLogin")){
      console.log('保留登录信息')
      this.$store.state.isLogin = sessionStorage.getItem("isLogin")
      this.$store.state.id = sessionStorage.getItem("userid")
      this.$store.state.userName = sessionStorage.getItem("username")
      this.$store.state.isAdmin = sessionStorage.getItem("isAdmin")
      router.push('/')
    }
    else{
      console.log('未登录')
      router.push('/Login')
    }
  },
  methods: {

  }
}
</script>

<style>
</style>