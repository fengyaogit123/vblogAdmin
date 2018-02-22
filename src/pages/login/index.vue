<template>
    <div id="login">
        <div class="login-mask"></div>
        <div class="form-wrap">
            <p>
                <span>Admin Login</span>
            </p>
            <Form ref="forms" :model="forms" :rules="rules">
                <FormItem prop="username">
                    <Input v-model.trim="forms.username" size="large" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem prop="password" class="form-margin">
                    <Input v-model.trim="forms.password" type="password" size="large" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem class="form-margin">
                    <Checkbox size="large" :value="true">
                        自动登录
                    </Checkbox>
                </FormItem>
                <FormItem class="form-margin">
                    <Button @click="submit" :loading="loading" size="large" long type="primary">登录</Button>
                </FormItem>
            </Form>

            <Row class="form-sub">
                <span class="font-14">其他登录方式</span>
                <i class="iconfont icon-weibo-copy"></i>
            </Row>
        </div>
    </div>
</template>

<script>
import sha256 from "js-sha256";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      forms: {
        username: "",
        password: ""
      },
      rules: {
        username: {
          required: true,
          message: "The username cannot be empty",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "The password cannot be empty",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    Sha256(message) {
      return sha256(message);
    },
    async submit() {
      let result = await this.$refs.forms.validate();
      if (!result) return;
      this.loading = true;
      let username = this.forms.username;
      let password = this.Sha256(this.forms.password);
      try {
        let { data } = await this.$http({
          url: this.$Inter.LOGIN,
          method: "post",
          data: {
            username,
            password
          }
        });
        this.loading = false;
        this.$Message.success('登录成功');
        this.$store.commit("users/users", data.data);
        this.$store.commit("users/token", data.token);
        this.$router.replace({ name: "Article" });
      } catch (e) {
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="less">
#login {
  height: 100%;
  background: url(../../../static/imgs/login-bg.jpg) center center;
  background-size: cover;
  .login-mask {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
  }
  .form-sub {
    .icon {
      vertical-align: middle;
      margin-left: 16px;
      font-size: 30px;
      color: rgba(0, 0, 0, 0.2);
      transition: all 0.5s;
      cursor: pointer;
    }
    i.icon-weibo-copy {
      .icon;
      &:hover {
        color: rgba(230, 22, 45, 0.7);
      }
    }
  }
  .form-wrap {
    h1 {
      text-align: center;
      padding-bottom: 15px;
      font-size: 33px;
    }
    p {
      text-align: center;
      padding: 15px 0;
      span {
        padding: 0 10px;
        padding-bottom: 10px;
        font-size: 18px;
        display: inline-block;
      }
    }
    width: 380px;
    background-color: #fff;
    padding: 15px 30px;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
  }
  .form-margin {
    margin-bottom: 15px;
  }
  @media screen and(max-width:678px) {
    .form-wrap {
      width: 90%;
      margin-left: 0;
    }
  }
}
</style>
