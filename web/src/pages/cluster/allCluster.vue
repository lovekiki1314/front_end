<template>
  <div>
    <Navigation />
    <div class="homeBody_Single">
      <el-form ref="form"
               :model="form"
               :inline=true>
        <p class="homeBody_Single_Title">全量聚类</p>
        <el-form-item label="待查询的地址">
          <el-input type="text"
                    v-model="form.blockHash"
                    style="width:680px"
                    placeholder="待查询的地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
        <div v-show="fullcluster" class="TransactionTable">
            <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      :header-cell-style="{background:'#50a6fc',color:'#ffffff'}"
                      class="table">
                <el-table-column
                       prop="address"
                       label="聚类结果"
                       width="600">
                       <template slot-scope="scope">
                          <router-link :to="{ name: 'addressQuery', params: { msgKey: scope.row.address}}"
                          >{{scope.row.address}}</router-link>
                        </template>
            </el-table-column>
            <el-table-column  prop="lable"
                              label="标签">
            </el-table-column>
            </el-table>
            <el-pagination 
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="pagesize"
                   layout="total, prev, pager, next, jumper"
                   :total="list.length">
            </el-pagination>
        </div>    
  </div>
</template>



<script>
import Navigation from '../../components/nav/Nav.vue'
import store from '../../store'
import router from '../../router'
export default {
    data(){
        return{
            currentPage: 1, //初始页
            pagesize: 20, //    每页的数据
            list : [],
            form: {
                blockHash: ''
            },
            info: '',
            fullcluster : false
        }
    },
    components: {
        Navigation
    },
    mounted() {
      if(this.$store.state.isLogin == false) {
        console.log('未登录')
        router.push('/')
      }
    },
    methods:{
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage
            console.log(this.currentPage) //点击第几页
            var form = {
                address : this.form.blockHash,
                page : this.currentPage,
                user_id : this.$store.state.id
            }
            this.$axios
                .post('http://10.176.34.161:8001/api/analysis/address_full_cluster', form).then(res => {
                    if(res.data.result){
                        var content = res.data.content
                        console.log(res.data)
                        this.list = []
                        for(var i in content){
                            if(content[i]!=null){
                                var temp = {}
                                var inputdata = content[i]
                                temp['address'] = inputdata[0]
                                temp['lable'] = inputdata[1]
                                this.list.push(temp)
                            }
                        }
                        this.fullcluster = true
                    }
                    
                })
        },
        onSubmit(){
            var form = {
                address : this.form.blockHash,
                page : this.currentPage,
                user_id : this.$store.state.id
            }
            this.$axios
                .post('http://10.176.34.161:8001/api/analysis/address_full_cluster', form).then(res => {
                    if(res.data.result){
                        var content = res.data.content
                        console.log(this.currentPage) //点击第几页
                        console.log(res.data)
                        console.log(content)
                        this.list = []
                        for(var i in content){
                            if(content[i]!=null){
                                var temp = {}
                                var inputdata = content[i]
                                temp['address'] = inputdata[0]
                                temp['lable'] = inputdata[1]
                                this.list.push(temp)
                            }
                        }
                        this.fullcluster = true
                    }
                    
                })
        }
    }
}
</script>


<style scoped>
.FundChainTrackingMain {
  padding: 10px 20%;
  font-family: PingFang SC;
  font-weight: bold;
}
.AdressTable {
  border-collapse: collapse;
  width: 60%;
  margin: 0 20%;
  border: 1px solid #50a6fc;
  text-indent: 10px;
}
.AdressTable td {
  border: 1px solid gray;
  height: 40px;
}
.AdressTable th {
  height: 40px;
  background-color: #50a6fc;
  color: white;
  text-align: left;
  border: none;
}
.TransactionTable {
  margin: 0 20%;
  table-layout: fixed;
  padding: 10px;
}
.homeBody_Single {
  margin: 30px 20% 0 20%;
  font-weight: bold;
}
.homeBody_Single_Title {
  text-align: center;
  font-size: 18px;
}
ul {
  list-style: none;
  text-indent: -30px;
}
.background {
  background: #e5e9f2;
  padding: 5px;
  color: #409eff;
}
table {
  border-collapse: collapse;
  width: 60%;
  margin: 0 20%;
  border: 1px solid #50a6fc;
  text-indent: 10px;
}
</style>