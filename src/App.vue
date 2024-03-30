<template>
  <div id="app">

    <div class="topbar">
      <div class="nav" :style="loginFlag?'margin-left: 40%':'margin-left: 50%'">
        <ul>
          <li v-if="!this.$store.getters.getUser" style="margin-right: 50px">
            <el-button type="text" @click="login">登录</el-button>
            <span>|</span>
            <el-button type="text" @click="register = true">注册</el-button>
          </li>
          <li v-else>
            <el-button type="text" @click="visible = !(visible)">退出登录</el-button>
            <el-popover placement="top" width="180" v-model="visible">
              <p>确定退出登录吗？</p>
              <div style="text-align: right; margin: 10px 0 0;">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button size="mini" type="primary" @click="logout">确定</el-button>
              </div>
            </el-popover>
            <span>|</span>
            <el-button type="text" @click="toggle">切换帐号</el-button>
          </li>
          <li style="margin-right: 20px;margin-left: 150px;" @mouseover="visible1 = true" @mouseleave="visible1 = false"
            v-if="this.$store.getters.getUser">
            欢迎
            <el-button type="text">{{this.$store.getters.getUser.username}}</el-button>
            <personalCenter :visible1="visible1"></personalCenter>

          </li>
          <li>
            <span @click="goOrderList">我的订单</span>
          </li>
          <li>
            <span @click="goFav">我的收藏</span>
          </li>
          <li @click="goCart" style="margin-left: 35px;" class="top-cart">
            <i class="el-icon-shopping-cart-2"></i>
            <span>购物车<span v-if="cartNum">（{{cartNum}}）</span></span>
          </li>
        </ul>
      </div>
    </div>

    <el-container>
      <el-header>

        <div class="logo">
          <router-link to="/">
            <img src="./assets/imgs/logo.png" />
          </router-link>
        </div>

        <el-menu :default-active="activeIndex" mode="horizontal" active-text-color="#409eff">

          <el-menu-item index="/" class="top-menu">
            <router-link to="/">首页</router-link>
          </el-menu-item>
          <el-menu-item index="1" class="top-menu">
            <router-link :to="{path: '/proList', query: {category: '全部', keyword: null} }">全部商品</router-link>
          </el-menu-item>
          <el-menu-item index="2" class="top-menu">
            <router-link :to="{path: '/about' }">系统说明</router-link>
          </el-menu-item>

        </el-menu>

        <div class="search">

          <el-input placeholder="请输入内容" v-model="search">
            <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
          </el-input>

        </div>

      </el-header>

      <myLogin></myLogin>
      <myRegister :register="register" @fromChild="registerVisible"></myRegister>

      <el-main>
        <!-- <keep-alive> -->
        <router-view :key="$route.path"></router-view>
        <!-- </keep-alive> -->
      </el-main>
    </el-container>
    <el-footer style="background-color: #2f2f2f;color: white;height: 250px;">
      <div class="footer-top">
        <ul>
          <li>
            <svg t="1689152827779" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4205" width="32" height="32">
              <path
                d="M512 64l384 128v378.24a320 320 0 0 1-176.896 286.208L512 960l-207.104-103.552A320 320 0 0 1 128 570.24V192l384-128z m0 67.456L192 238.112V570.24a256 256 0 0 0 133.472 224.768l8.032 4.192L512 888.448l178.496-89.248a256 256 0 0 0 141.344-219.904L832 570.24V238.08L512 131.456z m167.68 231.712l48.64 41.664-212.16 247.488-184.16-147.328 40-49.984 135.808 108.672 171.904-200.512z"
                fill="white" p-id="4206"></path>
            </svg>
            <span>7天无理由退换货</span>
          </li>
          <li>
            <svg t="1689152827779" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4205" width="32" height="32">
              <path
                d="M512 64l384 128v378.24a320 320 0 0 1-176.896 286.208L512 960l-207.104-103.552A320 320 0 0 1 128 570.24V192l384-128z m0 67.456L192 238.112V570.24a256 256 0 0 0 133.472 224.768l8.032 4.192L512 888.448l178.496-89.248a256 256 0 0 0 141.344-219.904L832 570.24V238.08L512 131.456z m167.68 231.712l48.64 41.664-212.16 247.488-184.16-147.328 40-49.984 135.808 108.672 171.904-200.512z"
                fill="white" p-id="4206"></path>
            </svg>
            <span>满99元全场包邮</span>
          </li>
          <li>
            <svg t="1689152827779" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4205" width="32" height="32">
              <path
                d="M512 64l384 128v378.24a320 320 0 0 1-176.896 286.208L512 960l-207.104-103.552A320 320 0 0 1 128 570.24V192l384-128z m0 67.456L192 238.112V570.24a256 256 0 0 0 133.472 224.768l8.032 4.192L512 888.448l178.496-89.248a256 256 0 0 0 141.344-219.904L832 570.24V238.08L512 131.456z m167.68 231.712l48.64 41.664-212.16 247.488-184.16-147.328 40-49.984 135.808 108.672 171.904-200.512z"
                fill="white" p-id="4206"></path>
            </svg>
            <span>100%品质保证</span>
          </li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <img src="../src/assets/imgs/github.png" />
        <p>copyright 2021-2023 版权所有</p>
      </div>
    </el-footer>
  </div>
</template>

<script>
  import {
    mapActions
  } from "vuex";
  import {
    mapGetters
  } from "vuex";

  import personalCenter from '@/components/PersonalCenter.vue'
  import myLogin from '@/components/MyLogin.vue'
  import myRegister from '@/components/MyRegister.vue'

  export default {
    components: {
      personalCenter,
      myLogin,
      myRegister
    },

    name: 'App',

    beforeCreate() {
      this.activeIndex = this.$route.path;
    },

    beforeUpdate() {
      this.activeIndex = this.$route.path;
    },

    data() {
      return {
        activeIndex: "",
        visible: false,
        visible1: false,
        register: false,
        search: "",
        keyword: "",
        loginFlag: false
      }
    },

    created() {
      // console.log("this.$route.path:" + this.$route.path);
      // console.log("activeIndex:" + this.activeIndex);
      if (localStorage.getItem("user")) {
        // 如果已经登录，设置vuex登录状态
        this.loginFlag = true;
        this.setUser(JSON.parse(localStorage.getItem("user")));
        this.$axios
          .get(this.$target + '/api/cart/list?userid=' + JSON.parse(localStorage.getItem("user")).id)
          .then(res => {
            console.log("response:" + JSON.stringify(res.data.data));
            let self = this;
            self.setShoppingCart(res.data.data);
          })
          .catch(err => {
            return Promise.reject(err);
          });
        // this.initShoppingCart();
      }
    },

    computed: {
      ...mapGetters(["getUser", "getNum"]),
      cartNum: {
        get() {
          return this.$store.getters.getNum;
        }
      },
      key() {
        return this.$route.fullPath
      }
    },

    watch: {
      keyword: function(val) {
        console.log("keyword:" + val);
        if (val != null) {
          this.total = 0;
          this.currentPage = 1;
          this.start = 0;
          this.end = 12;
          this.$axios
            .get(this.$target + '/api/products/list?keyword=' + val)
            .then(res => {
              // console.log("response:" + JSON.stringify(res.data.data));
              this.$router.push({
                path: "/proList",
                query: {
                  keyword: val
                }
              })
              this.search = "";
              this.keyword = "";
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }
      }
    },

    methods: {
      ...mapActions(["setUser", "setShowLogin", "setShoppingCart", "initShoppingCart"]),
      login() {
        this.setShowLogin(true);
      },
      registerVisible(val) {
        this.register = val;
      },
      logout() {
        this.visible = false;
        localStorage.setItem("user", "");
        this.setUser("");
        this.$message({
          message: '退出成功',
          type: 'success'
        });
        setTimeout(function() {
          location.reload();
        }, 1500);
      },
      toggle() {
        this.login();
        // this.logout();
        // this.visible = false;
        // localStorage.setItem("user", "");
        // this.setUser("");
        // this.$message({
        //   message: '帐号退出成功',
        //   type: 'success'
        // });
        // setTimeout(function() {
        //   location.reload();
        //   this.login();
        // }, 2000);
      },
      goSearch() {
        this.keyword = this.search;
        this.$router.push({
          path: '/proList',
          query: {
            keyword: this.keyword
          }
        })
      },
      goFav() {
        if (!localStorage.getItem("user")) {
          this.login();
        } else {
          this.$router.push({
            path: '/proList',
            query: {
              fav: true
            }
          })
        }
      },
      goCart() {
        if (!localStorage.getItem("user")) {
          this.login();
        } else {
          this.$router.push({
            path: '/shoppingCart'
          })
        }
      },

      goOrderList() {
        if (!localStorage.getItem("user")) {
          this.login();
        } else {
          this.$router.push({
            path: '/orderList'
          })
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .el-container {
    width: 1200px;
    margin: 10px auto;
  }

  .topbar {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #3d3d3d;
    margin-bottom: 20px;
  }

  ul li {
    list-style: none;
  }

  .topbar .nav ul li {
    float: left;
    color: #b0b0b0;
    font-size: 14px;
    text-align: center;
    margin-left: 20px;
  }

  a {
    text-decoration: none;
  }

  .topbar .nav ul li a {
    color: #b0b0b0;
  }

  .el-header {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 15px;
  }

  .el-header .logo,
  .el-header .el-menu,
  .el-header .search {
    display: inline-block;
    vertical-align: middle;
  }

  .el-header .el-menu {
    width: 40%;
    margin-left: 10%;
  }

  .topbar li {
    cursor: pointer;
  }

  .top-menu a {
    display: block;
    width: 100%;
    height: 100%;
  }

  .el-main::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .el-main {
    scrollbar-width: none;
  }

  .el-footer .footer-top {
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid lightgray;
  }

  .el-footer .footer-top ul {
    margin-left: 15%;
  }

  .el-footer .footer-top li {
    display: inline-block;
    vertical-align: top;
    margin-right: 120px;
  }

  .el-footer .footer-top ul li svg,
  .el-footer .footer-top ul li span {
    display: inline-block;
    vertical-align: middle;
  }

  .el-footer .footer-bottom {
    margin-top: 50px;
  }

  .top-cart {
    padding: 0 5px;
    transition: all .2s ease-in-out;
  }

  .top-cart:hover {
    background-color: white;
  }

  .top-cart:hover i {
    color: red;
  }

  .top-cart:hover span {
    color: red;
  }
</style>