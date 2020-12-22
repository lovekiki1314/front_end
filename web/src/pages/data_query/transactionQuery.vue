<template>
  <div class="TransactionDetail">
    <Navigation />
    <div >
      <el-form ref="form"
               :model="form"
               :inline="true"
               class="transaction-main-body1">
        <p v-show="input">交易信息查询</p>
        <el-form-item title="请输入待查询的指定交易哈希"
                      v-show="input">
          <el-input type="text"
                    v-model="form.blockHash"
                    style="width:800px"
                    @input="change($event)"
                    placeholder="请输入待查询的指定交易哈希"></el-input>
        </el-form-item>
        <el-form-item v-show="input">
          <el-button type="primary"
                     @click="onSubmit">提交</el-button>       
        </el-form-item>
        
      </el-form>
      <div v-show="show" class="transaction-main-body">
         <table class="table">
          <tbody>
            <tr>
              <th colspan="2">交易详细信息 <el-button size="mini" type="primary" @click="showInfo">展开详细信息</el-button> 
              <el-button type="danger" @click="onReset">继续查询</el-button></th>              
            </tr>

            <tr>
              <td colspan="2">
                <p v-for="(item,index) in vin"
                   :key="item" >{{[index]}}<router-link :to="{ name: 'addressQuery', params: { msgKey: item.address }}">{{item.address}}</router-link>
                   {{item.value}}BTC
                </p>

              </td>
              <td><img align="center"
                     src="../../../public/arrow_right.png"></td>
              <td colspan="2">
                <p v-for="(item,index) in vout"
                   :key="item">{{[index]}}<router-link :to="{ name: 'addressQuery', params: { msgKey: item.address }}">{{item.address}}</router-link>
                    {{item.value}} BTC
                </p>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="th">交易总览</th>
              <th colspan="2" class="th">输入&输出信息</th>
            </tr>
            <tr>
              <td>交易大小（字节）</td>
              <td>{{info.size}}</td>
              <td>输入笔数</td>
              <td>{{info.n_in}}</td>
            </tr>
            <tr>
              <td>锁定时间</td>
              <td>{{info.locktime}}</td>
              <td>输入总金额</td>
              <td>{{amount_in}} BTC</td>

            </tr>
            <tr>
              <td>时间</td>
              <td>{{info.timestamp}}</td>
              <td>输出笔数</td>
              <td>{{info.n_out}}</td>
            </tr>
            <tr>
              <td>版本</td>
              <td>{{info.version}}</td>
              <td>输出总金额</td>
              <td>{{amount_out}} BTC</td>
            </tr>
          </tbody>
        </table>
        <table v-show="show1">
          <tbody>
            <tr>
              <th>输入脚本</th>
            </tr>
            <tr>
              <td>{{script_in}}</td>
            </tr>
            <tr>
              <th>输出脚本</th>
            </tr>
            <tr>
              <td>{{script_out}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/nav/Nav'
import router from '../../router'
export default {
  data () {
    return {
      input: true,
      info: '',
      vin: '',
      vout: '',
      amount_in: 0,
      amount_out: 0,
      script_in: [],
      script_out: [],
      display: false,
      show1:false,
      form: {
        blockHash: ''
      },
      loading: true,
      errored: false,
      show: false
    }
  },
  components: {
    Navigation
  },
  mounted () {
    if(this.$store.state.isLogin == false) {
      console.log('未登录')
      router.push('/')
    }
    if (this.$route.params.msgKey) {
      this.form.blockHash = this.$route.params.msgKey
      console.log('交易test')
      console.log(this.form.blockHash)
      this.onSubmit()
    }
  },
  methods: {
    change (e) {
      this.$forceUpdate()
    },
    onSubmit () {
      this.sendGet(this.form.blockHash)
      this.form.blockHash = ''
    },
    sendGet (url_parmas) {
      var url = 'http://10.176.34.161:8001/api/basicquery/transaction'
      this.loading = true
      this.errored = false
      var form = {
        user_id : this.$store.state.id,
        transaction : this.form.blockHash
      }
      this.$axios
        .post(url,form)
        .then(res => {
          this.input = false
          this.display = true
          if (res.data.result) {
            this.info = res.data
            this.vin = JSON.parse(this.info['vin'])
            this.vout = JSON.parse(this.info['vout'])
            var temp = this.info.timestamp
            this.info.timestamp = new Date(parseInt(temp) * 1000)
              .toLocaleString()
              .replace(/:\d{1,2}$/, ' ')
            var vin = this.vin
            for (var i in vin) {
              this.script_in.push(vin[i]['address'] + ': ' + vin[i]['scriptSig'])
              this.amount_in += vin[i]['value']
            }
            var vout = this.vout
            for (var i in vout) {
              this.script_out.push(vout[i]['address'] + ': ' + vout[i]['pubkeyhash'])
              this.amount_out += vout[i]['value']
            }
            this.show = true
          } else {
            this.errored = true
          }
        })
        .catch(error => {
          this.errored = true
        })
        .finally(() => (this.loading = false))
    },
    onReset () {
      Object.assign(this.$data, this.$options.data())
    },
    showInfo(){
      this.show1 = !this.show1
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

/* ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
} */

a {
  color: #42b983;
}
table {
  table-layout: fixed;
  padding: 10px;
  width: 700;
}
td {
  word-break: break-all;
  word-wrap: break-word;
}


.transaction-main-body1 {
  padding: 10px 20% 10px 20%;
  font-family: PingFang SC;
  font-weight: bold;
}

.transaction-main-body {
  position: relative;
  top: 70px; /* 距离窗口顶部距离 */
  /*vertical-align: middle;*/
  width: 80%;
  margin: 0 10%;
}
</style>
