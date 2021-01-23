<template>
  <div>
    <Navigation />
    <div class="CommunityAnalysisMain"
         v-loading="loading">
      <p style="color:#409eff">请选择您需要的行业活动分析维度</p>
      <el-form ref="form"
               :model="form">
        <div v-show="resetShow">
          <p>活动时间</p>
          <el-form-item title="活动时间">
            <el-col :span="5">
              <el-date-picker v-model="form.startTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="开始日期">
              </el-date-picker>
            </el-col>
            <el-col :span="5">
              <el-date-picker v-model="form.endTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="结束日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <p>基本时间单位(天)</p>
          <el-form-item title="基本时间单位(天)">
            <el-input-number v-model="form.timeUnit"
                             size="small"
                             :min="1"
                             :max="10"
                             label="描述文字"></el-input-number>
          </el-form-item>
          <p>行业基础特征展示维度</p>
          <el-form-item title="行业基础特征展示维度">
            <el-checkbox-group v-model="form.basic_info">
              <el-checkbox label="1">行业用户及交易情况统计</el-checkbox>
              <el-checkbox label="2">行业结构可视化</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <p>行业活跃度分析维度</p>
          <el-form-item title="行业活跃度分析维度">
            <el-checkbox-group v-model="form.industry_active_info">
              <el-checkbox label="1">重要的行业成员情况</el-checkbox>
              <el-checkbox label="2">是否需要分析资金在行业间流动情况</el-checkbox>
              <el-checkbox label="3">是否需要分析用户在行业间迁移情况</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <p>指定比特币地址</p>
          <el-form-item title="指定比特币地址">
            <el-input type="text"
                      v-model="form.address"></el-input>
          </el-form-item>
          <p>指定交易哈希</p>
          <el-form-item title="指定交易哈希">
            <el-input type="text"
                      v-model="form.txhash"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary"
                     @click="submit">提交分析请求</el-button>
          <el-button type="danger"
                     @click="onReset">重置分析维度</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="communityGraph">
      <Graph1_1 :data="data.industry_information"
                v-show="show1_1" />
      <!-- <Graph1_2 v-show="show1_2" /> -->
      <Graph2_1 :data="data.entity_value"
                v-show="show2_1" />
      <Graph2_2 :data="data.industry_value"
                v-show="show2_2" />
      <Graph2_3 :data="data.user_flow"
                v-show="show2_3" />
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/nav/Nav'
import Graph1_1 from '../../components/data_analysis/community_analysis/basic/Graph1.vue'
import Graph1_2 from '../../components/data_analysis/community_analysis/basic/Graph2.vue'
import Graph2_1 from '../../components/data_analysis/community_analysis/active/Graph1.vue'
import Graph2_2 from '../../components/data_analysis/community_analysis/active/Graph2.vue'
import Graph2_3 from '../../components/data_analysis/community_analysis/active/Graph3.vue'
import store from '../../store'
export default {
  data () {
    return {
      resetShow: true,
      loading: false,
      show: false,
      show1_1: false,
      show1_2: false,
      show2_1: false,
      show2_2: false,
      show2_3: false,
      chart: null,
      data: [1], // 储存后端返回的数据
      dataG2: [],
      msg: '',
      form: {
        startTime: '2010-05-01', // 开始时间
        endTime: '2010-05-03', // 结束时间
        timeUnit: 2, // 基本时间单位（天）
        basic_info: [], // ⾏业基础特征展示维度
        industry_active_info: [], // ⾏业活跃度分析维度
        address: '', // 指定⽐特币地址
        txhash: '' // 指定交易hash
      }
    }
  },
  components: {
    Navigation,
    Graph1_1,
    // Graph1_2,
    Graph2_1,
    Graph2_2,
    Graph2_3
  },
  mounted () {
  },
  methods: {
    submit () {
      this.resetShow = false
      var form = {
        user_id: this.$store.state.id,
        startTime: String(this.form.startTime),
        endTime: String(this.form.endTime),
        timeUnit: this.form.timeUnit,
        basic_info: JSON.stringify(this.form.basic_info),
        industry_active_info: JSON.stringify(this.form.industry_active_info),
        address: this.form.address,
        txhash: this.form.txhash
      }
      console.log('测试')
      console.log(form)
      this.$axios.post('http://10.176.34.161:8001/api/analysis/community/add',form).then(res => {
        this.data = res.data
      })
    },
    onReset () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style scoped>
.CommunityAnalysisMain {
  padding: 0 20%;
  font-family: PingFang SC;
  font-weight: bold;
}
.communityGraph {
  width: 60%;
  margin: 10px 20%;
}
</style>
