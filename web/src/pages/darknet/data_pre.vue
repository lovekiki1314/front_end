<template>
  <div>
    <Nav />
    <div>
      <div class="tag11">
        <el-tag
          style="margin-right: 5px"
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-button v-if="dynamicTags == ''" class="button-new-tag" size="small" type="text"
          >请选择要查询的暗网市场</el-button
        >
        <el-button
          v-else
          class="button-new-tag"
          :loading="loadshow"
          @click="onSubmit"
          type="primary"
          style="margin-left: 15px"
          size="small"
        >
          确定</el-button
        >
      </div>
      <div class="boxgroup">
        <el-checkbox-group
          v-model="checkboxGroup"
          size="medium"
          @change="testchange"
          border
        >
          <el-checkbox label="AbraxasMarket" border></el-checkbox>
          <el-checkbox label="AgoraMarket" border></el-checkbox>
          <el-checkbox label="BabylonMarket" border></el-checkbox>
          <el-checkbox label="BlackBankMarket" border></el-checkbox>
          <el-checkbox label="BlueSkyMarketplace" border></el-checkbox>
          <el-checkbox label="CannabisRoadMarket" border></el-checkbox>
          <el-checkbox label="EvolutionMarket" border></el-checkbox>
          <el-checkbox label="MiddleEarthMarketplace" border></el-checkbox>
          <el-checkbox label="PandoraOpenMarket" border></el-checkbox>
          <el-checkbox label="SheepMarketplace" border></el-checkbox>
          <el-checkbox label="SilkRoad2Market" border></el-checkbox>
          <el-checkbox label="SilkRoadMarketplace" border></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div v-if="loadfirst" class="alist">
      <a-list
        class="demo-loadmore-list"
        bordered
        :grid="{ gutter: 16, column: 3 }"
        :loading="loading"
        item-layout="horizontal"
        :data-source="data"
      >
        <div
          v-if="showLoadingMore"
          slot="loadMore"
          :style="{
            textAlign: 'center',
            marginTop: '12px',
            marginBottom: '24px',
            height: '32px',
            lineHeight: '32px',
          }"
        >
          <a-spin v-if="loadingMore" />
          <label v-else @click="onLoadMore"> 点击加载更多... </label>
        </div>
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card
            :title="item.address"
            :hoverable="true"
            style="width: 80%; margin-top: 2%"
            :headStyle="{
              color: 'white',
              backgroundColor: '#50a6fc',
            }"
            :bodyStyle="{
              color: '#50a6fc',
              fontsize: '10px',
            }"
          >
            所属市场： {{ item.market }}
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/nav/Nav";
export default {
  data() {
    return {
      loadfirst: false,
      loading: false,
      loadingMore: false,
      showLoadingMore: false,
      data: [],
      cntt: 0,
      form: {
        market: [],
        cnt: 0,
      },
      loadshow: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      checkboxGroup: [],
    };
  },
  components: {
    Nav,
  },
  methods: {
    onLoadMore() {
      this.loadingMore = true;
      var url = "http://10.176.34.161:8000/api/darknet/marketdata";
      this.cntt += 1;
      this.loadingMore = true;
      var form = {
        market: JSON.stringify(this.dynamicTags),
        cnt: this.cntt,
      };
      console.log(form);
      this.$axios.post(url, form).then((res) => {
        this.data = this.data.concat(res.data.message);
        console.log(this.data);
        this.loadingMore = false;
        this.$nextTick(() => {
          console.log(res.data);
          if (res.data.result == true) {
            this.loadingMore = false;
          }
          window.dispatchEvent(new Event("resize"));
        });
      });
    },
    onSubmit() {
      var url = "http://10.176.34.161:8000/api/darknet/marketdata";
      this.loadshow = true;
      this.loading = true;

      this.form.market = this.dynamicTags;
      this.form.cnt = this.cntt;
      var form = {
        market: JSON.stringify(this.dynamicTags),
        cnt: this.cntt,
      };
      console.log(form);
      this.$axios.post(url, form).then((res) => {
        console.log(res.data);
        this.data = res.data.message;
        if (res.data.result == true) {
          this.loading = false;
          this.loadfirst = true;
          this.loadshow = false;
          this.showLoadingMore = true;
        }
      });
    },
    testchange() {
      this.dynamicTags = this.checkboxGroup;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
.alist {
  margin-top: 3%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 3%;
}
.tag11 {
  margin-left: 2%;
  padding-top: 10%;
}

.boxgroup {
  margin-left: 2%;
  margin-top: 1%;
}
.button-new-tag {
  width: 90px;
  height: 1%;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>