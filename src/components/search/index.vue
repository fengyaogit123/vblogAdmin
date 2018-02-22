<template>
    <div class="fy-search">
        <Input @on-change="onChange" v-model="text" placeholder="请搜索" class="fy-input" size="large" type="text"></Input>
        <Button @click="$emit('submit',text)" size="large" type="primary">搜索</Button>
    </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    value: String
  },
  data() {
    return {
      text: this.value
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.text);
    }
  }
};
</script>

<style lang="less">
.fy-search {
  text-align: center;
  padding: 15px;
  font-size: 0;
  .fy-input {
    display: inline-block;
    width: 400px;
    input {
      border-radius: 3px 0 0 3px;
    }
  }
  .ivu-btn {
    border-radius: 0 3px 3px 0;
  }
}
</style>
