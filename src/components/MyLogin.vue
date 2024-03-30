<template>
  <div id="myLogin">
    <el-dialog title="登录" width="300px" center :visible.sync="loginVisible">
      <el-form :model="loginUser" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="loginUser.username"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input prefix-icon="el-icon-view" type="password" placeholder="请输入密码" v-model="loginUser.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="submitForm" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {
    mapActions
  } from "vuex";

  export default {
    name: "MyLogin",
    data() {
      // 用户名的校验方法
      let validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入用户名"));
        }
        return callback();
        // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
        // const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        // if (userNameRule.test(value)) {
        //   this.$refs.ruleForm.validateField("checkPass");
        //   return callback();
        // } else {
        //   return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
        // }
      };
      // 密码的校验方法
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          return callback(new Error("请输入密码"));
        }
        return callback();
        // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
        // const passwordRule = /^[a-zA-Z]\w{5,17}$/;
        // if (passwordRule.test(value)) {
        //   this.$refs.ruleForm.validateField("checkPass");
        //   return callback();
        // } else {
        //   return callback(
        //     new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        //   );
        // }
      };
      return {
        loginUser: {
          username: "lisi",
          pwd: "654321"
        },
        // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
        rules: {
          username: [{
            validator: validateName,
            trigger: "blur"
          }],
          pwd: [{
            validator: validatePass,
            trigger: "blur"
          }]
        }
      };
    },
    computed: {
      loginVisible: {
        get() {
          return this.$store.getters.getLoginVisible;
        },
        set(val) {
          this.$refs["ruleForm"].resetFields();
          this.setShowLogin(val);
        }
      }
    },
    methods: {
      ...mapActions(["setUser", "setShowLogin"]),
      submitForm() {
        this.$refs["ruleForm"].validate((valid) => {
          console.log("valid:" + valid);
          if (valid) {
            console.log("submit!");
            this.$axios({
              method: 'post',
              url: this.$target + '/api/user/login',
              data: {
                username: this.loginUser.username,
                pwd: this.loginUser.pwd
              }
            }).then((response) => {
              // console.log("请求已发送");
              // console.log("response:" + JSON.stringify(response));
              if (!response.data.errno) {
                this.loginVisible = false;
                // 登录信息存到本地
                let user = JSON.stringify(response.data.data);
                localStorage.setItem("user", user);
                // 登录信息存到vuex
                this.setUser(response.data.data);
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                setTimeout(function() {
                  location.reload();
                },1000);
              } else {
                this.$message({
                  message: '用户名或密码错误，请重新输入',
                  type: 'error'
                });
              }
            }).catch(err => {
              return Promise.reject(err);
              console.log("err:" + err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  #myLogin .el-dialog {
    width: 300px !important;
  }

  #myLogin .el-form-item__content {
    margin-left: 0 !important;
  }

  #myLogin .el-button {
    width: 100%;
  }
</style>
