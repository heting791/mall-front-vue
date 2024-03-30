<template>
  <div id="myRegister">
    <el-dialog title="注册" :visible.sync="registerVisible">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input type="text" prefix-icon="el-icon-user-solid" v-model="ruleForm.name" autocomplete="off"
            placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" prefix-icon="el-icon-view" placeholder="请输入密码" v-model="ruleForm.pass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" prefix-icon="el-icon-view" placeholder="请再次输入密码" v-model="ruleForm.checkPass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "myRegister",
    props: ['register'],
    data() {
      let validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入用户名"));
        }
        // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
        const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        if (userNameRule.test(value)) {
          //判断数据库中是否已经存在该用户名
          this.$axios
            .get(this.$target + "/api/user/find?username=" + this.ruleForm.name)
            .then(res => {
              // “001”代表用户名不存在，可以注册
              if (!res.data.errno) {
                this.$refs.ruleForm.validateField("checkPass");
                return callback();
              } else {
                return callback(new Error("用户名已存在，请重新输入"));
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        const passwordRule = /^[a-zA-Z]\w{5,17}$/;
        if (passwordRule.test(value)) {
          this.$refs.ruleForm.validateField("checkPass");
          return callback();
        } else {
          return callback(
            new Error("字母开头,长度6-18之间,允许字母数字和下划线")
          );
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerVisible: false,
        ruleForm: {
          name: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      };
    },
    watch: {
      register: function(val) {
        if (val) {
          this.registerVisible = val;
        }
      },
      registerVisible: function(val) {
        if (!val) {
          this.$refs["ruleForm"].resetFields();
          this.$emit("fromChild", val);
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = this.$target + '/api/user/register';
            var postData = {
              username: this.ruleForm.name,
              pwd: this.ruleForm.pass
            }
            console.log("postData:" + this.$qs.stringify(postData));
            this.$axios
              .post(url, this.$qs.stringify(postData))
              .then(res => {
                console.log("res:" + JSON.stringify(res));
                if (!res.data.errno) {
                  this.registerVisible = false;
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '注册失败，请稍后再试',
                    type: 'error'
                  });
                }
              })
              .catch(err => {
                return Promise.reject(err);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  #myRegister .el-dialog {
    width: 300px !important;
  }

  #myRegister .el-form-item__content {
    margin-left: 0 !important;
  }

  #myRegister .el-button {
    width: 100%;
  }
</style>
