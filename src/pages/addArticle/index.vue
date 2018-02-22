<template>
    <FyLayout id="addArticle" bgColor="#fff">
        <div class="clearfix">
            <ButtonGroup class="pull-right">
                <Button type="primary" @click="submit">提交</Button>
                <Button type="primary">预览</Button>
            </ButtonGroup>
        </div>
        <Row>
            <Col class="addart-title" :xs="24" :sm="12" :md="10">
            <Input v-model="forms.title" size="large" placeholder="请填写标题"></Input>
            </Col>
        </Row>
        <Row>
            <Col class="addart-title" :xs="24" :sm="12" :md="10">
            <FyUpload :maxFile="1" v-model="forms.homeImage" isLoadImg/>
            </Col>
        </Row>
        <Row>
            <Editor :defaultBody="forms.html" ref="editor" />
        </Row>
    </FyLayout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddArticle",
  data() {
    return {
      isEdit: false,
      forms: {
        id: "",
        title: "",
        homeImage: [],
        loading: false,
        html: ""
      }
    };
  },
  computed: mapState({
    userId: state => (state.users ? state.users.id : "")
  }),
  created() {
    let item = this.$route.query.item;
    if (item) {
      item = JSON.parse(item);
      this.isEdit = true;
      this.forms = { ...this.forms, ...item };
      if (item.homeImage) {
        this.forms.homeImage = [
          {
            url: item.homeImage
          }
        ];
      }
    }
  },
  methods: {
    async submit() {
      if (!this.forms.title) return this.$Message.info("请填写标题!");
      if (this.loading) return;
      let url, method, message;
      if (this.isEdit) {
        url = this.$Inter.ART_PUT(this.forms.id);
        method = "put";
        message = "修改成功!";
      } else {
        url = this.$Inter.ART_ADD;
        method = "get";
        message = "添加成功!";
      }
      this.loading = true;
      this.forms.html = this.$refs.editor.html();
      try {
        const { data } = await this.$http({
          url,
          method,
          data: {
            ...this.forms,
            homeImage: this.forms.homeImage.map(({ url }) => url).join("")
          }
        });
        this.loading = false;
        this.$Message.success(message);
        this.$router.push({ name: "Article" });
      } catch (e) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less">
#addArticle {
  .addart-title {
    float: none;
    margin: 0 auto;
    margin-bottom: 30px;
  }
}
</style>
