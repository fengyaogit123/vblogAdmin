<template>
    <FyLayout id="article" bgColor="transparent">
        <Row class="article-Search">
            <Search v-model="text" @submit="search" />
        </Row>
        <Row class="arts-box" :gutter="16">
            <Col :xs="12" :sm="8" :md="6" :lg="6" v-for="item in list" :key="item.id">
            <div @click="clickItem(item)" class="art-item">
                <div class="art-img">
                    <img :class="{'defult-src':!!defultSrc}" :src="item.homeImage?item.homeImage:defultSrc" alt="" height="154">
                </div>
                <div class="art-body">
                    <p class="art-title font-warp">{{item.title}}</p>
                    <p class="art-content">{{item.html | toText}}</p>
                    <p class="art-sub">{{item.createdAt | toDate}}</p>
                </div>
            </div>
            </Col>
        </Row>
        <Block  align="center">
            <Page @on-change="pageChange" :current="params.pageNo+1" :page-size="params.size" :total="count" simple></Page>
        </Block>
    </FyLayout>
</template>

<script>
import defultSrc from "../../../static/imgs/img-bg.svg";
import { mapState } from "vuex";
export default {
  name: "Article",
  data() {
    return {
      text: "",
      defultSrc,
      list: [],
      count: 0,
      params: {
        pageNo: 0,
        size: 20,
        title: ""
      }
    };
  },
  computed: mapState({
    userId: state => (state.users ? state.users.users.id : "")
  }),
  created() {
    this.getList();
  },
  methods: {
    search(text) {
      this.params.pageNo = 0;
      this.params.title = text; //xss sql
      this.getList();
    },
    pageChange(page) {
      this.params.pageNo = page - 1;
    },
    async getList() {
      const { data } = await this.$http({
        url: this.$Inter.ART_BY_USER(this.userId),
        params: this.params
      });
      const { rows = [], pageNo, size, count } = data;
      this.list = rows;
      this.params.pageNo = pageNo;
      this.params.size = size;
      this.count = count;
      this.$Message.success("加载成功！");
    },
    clickItem(item) {
      item = JSON.stringify(item);
      this.$router.push({ name: "AddArticle", query: { item } });
    }
  }
};
</script>

<style lang="less">
@import "./style.less";
</style>
