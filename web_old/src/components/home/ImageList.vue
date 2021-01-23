<template>
  <div>
    <el-carousel :interval="4000" type="card" height="350px" width="300px" class="imageList">
      <el-carousel-item
        ><img src="../../assets/photo/bitcoin1.jpg" width="100%" height="100%"
      /></el-carousel-item>
      <el-carousel-item
        ><img src="../../assets/photo/bitcoin2.jpg" width="100%" height="100%"
      /></el-carousel-item>
      <el-carousel-item
        ><img src="../../assets/photo/bitcoin3.jpg" width="100%" height="100%"
      /></el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.imageList{
  margin-top: 30px;
}
</style>
