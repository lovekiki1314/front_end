<template>
  <div>
    <div class="main">
      <el-form ref="form"
               :model="form">
        <p>新增比特币区块链链上数据</p>
        <el-form-item title="新增比特币区块链链上数据">
          <el-input type="text"
                    v-model="form.type1"></el-input>
        </el-form-item>
        <el-button type="danger"
                   @click="onSubmit">新增</el-button>
        <p>新增地址的聚类数据</p>
        <el-form-item title="新增地址的聚类数据">
          <el-input type="text"
                    v-model="form.type1"></el-input>
        </el-form-item>
        <el-button type="warning"
                   @click="onSubmit">新增</el-button>
        <p>新增链下标签数据</p>
        <el-form-item title="新增链下标签数据">
          <el-input type="text"
                    v-model="form.type1"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  }
}
</script>

<style scoped>
.main {
  padding: 10px;
  font-family: PingFang SC;
  font-weight: bold;
}
</style>
