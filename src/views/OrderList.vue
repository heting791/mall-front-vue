<template>
  <div id="order-list" class="order-list">
    <!-- <div class="order-list-title">
      <p>我的订单</p>
    </div> -->
    <div class="order-list-cate">
      <ul>
        <li :class="active==-1?'active':''" @click="changeCate(-1)">全部订单</li>
        <li :class="active==0?'active':''" @click="changeCate(0)">待付款</li>
        <li :class="active==1?'active':''" @click="changeCate(1)">待发货</li>
        <li :class="active==2?'active':''" @click="changeCate(2)">待收货</li>
        <li :class="active==3?'active':''" @click="changeCate(3)">待评价</li>
      </ul>
    </div>
    <div class="order-list-container">
      <div class="order-list-container-title">
        <ul>
          <li>订单详情</li>
          <li>收货人</li>
          <li>金额</li>
          <li>交易状态</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="order-list-box">
        <router-link :to="{path: '/orderDetails', query: { orderid: item.id, statusStr: item.status } }"
          v-for="item in orderList" :key="item.id">
          <div class="order-list-item">
            <div class="order-list-item-title">
              <span class="bolder">{{item.createtime}}</span>&emsp;&emsp;
              <span>订单号：<span class="bolder">{{item.orderid}}</span></span>
            </div>
            <div class="order-list-item-info">
              <div class="order-list-item-details">
                <div class="pro-img">
                  <img :src="item.image" />
                </div>
                <div class="pro-title">
                  <p>{{item.title}}</p>
                </div>
                <div class="pro-count">
                  <span>X{{item.count}}</span>
                </div>
              </div>
              <div class="order-list-item-info-other">
                <div class="pro-consignee">
                  <span>{{item.name}}</span>
                </div>
                <div class="pro-price">
                  <span style="font-weight: bolder;">￥{{item.ttprice}}</span>
                </div>
                <div class="order-states">
                  <span>{{item.status}}</span>
                </div>
                <div class="order-operate">
                  <el-button type="primary" plain :disabled="btndisabled">删除</el-button>
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <el-empty v-if="orderList.length<1">
          <el-button type="primary" @click="goShopping">去购物</el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderList: [],
        active: -1,
        btndisabled: true
      }
    },
    created() {
      if (!localStorage.getItem("user")) {
        this.$message({
          message: '未登录，请先登录',
          type: 'warning'
        });
        this.$router.push({
          path: '/'
        })
      } else {
        if (!this.$route.query.status) {
          let userid = JSON.parse(localStorage.getItem("user")).id;
          this.$axios
            .get(this.$target + '/api/order/list?userid=' + userid)
            .then(res => {
              // console.log("response:" + JSON.stringify(res.data.data));
              this.orderList = res.data.data;
              this.handleDefault();
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          this.changeCate(this.$route.query.status);
        }
      }
    },
    methods: {
      handleDefault() {
        for (var i = 0; i < this.orderList.length; i++) {
          let createTime = this.orderList[i].createtime;
          let string = createTime.slice(0, 4) + "-" + createTime.slice(4, 6) + "-" + createTime.slice(6, 8) + " " +
            createTime.slice(8, 10) + ":" + createTime.slice(10, 12);
          this.orderList[i].createtime = string;
          let orderStatus = this.orderList[i].status;
          let statusStr = "";
          switch (orderStatus) {
            case 0: {
              statusStr = "待支付";
              break;
            }
            case 1: {
              statusStr = "待发货";
              break;
            }
            case 2: {
              statusStr = "待收货";
              break;
            }
            case 3: {
              statusStr = "待评价";
              break;
            }
            case 4: {
              statusStr = "已完成";
              break;
            }
          }
          this.orderList[i].status = statusStr;
        }
      },
      changeCate(num) {
        this.active = num;
        if (num != -1) {
          let userid = JSON.parse(localStorage.getItem("user")).id;
          this.$axios
            .get(this.$target + '/api/order/list?userid=' + userid + '&status=' + num)
            .then(res => {
              // console.log("response:" + JSON.stringify(res.data.data));
              this.orderList = res.data.data;
              this.handleDefault();
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          let userid = JSON.parse(localStorage.getItem("user")).id;
          this.$axios
            .get(this.$target + '/api/order/list?userid=' + userid)
            .then(res => {
              // console.log("response:" + JSON.stringify(res.data.data));
              this.orderList = res.data.data;
              this.handleDefault();
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }
      },
      goShopping() {
        this.$router.push({
          path: '/proList',
          query: {
            category: '全部',
            keyword: null
          }
        })
      }
    }
  }
</script>

<style scoped>
  #order-list {
    width: 90%;
    margin: 0 auto;
    text-align: left;
  }

  #order-list ul {
    margin: 0;
    padding: 0;
  }

  #order-list ul li {
    display: inline-block;
    vertical-align: top;
  }

  #order-list .order-list-title {
    background-color: #F3F8FE;
    color: rgb(1, 77, 127);
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }

  #order-list .order-list-cate {
    margin-top: 20px;
  }

  #order-list .order-list-cate ul {
    height: 40px;
    line-height: 40px;
    /* background-color: whitesmoke; */
    border-bottom: 1px solid red;
  }

  #order-list .order-list-cate ul li {
    width: 120px;
    text-align: center;
    cursor: pointer;
  }

  #order-list .order-list-cate ul li.active {
    background-color: #e4393c;
    color: white;
  }

  #order-list .order-list-container {
    margin-top: 20px;
  }

  #order-list .order-list-container .order-list-container-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f3f3f3;
  }

  #order-list .order-list-container .order-list-container-title ul li {
    width: 12%;
    text-align: center;
    font-size: 14px;
  }

  #order-list .order-list-container .order-list-container-title ul li:first-child {
    width: 50%;
  }

  #order-list .order-list-box {
    margin-top: 20px;
  }

  #order-list .order-list-box .order-list-item {
    margin-bottom: 20px;
    border: 1px solid #eaf8ff;
  }

  #order-list .order-list-box a {
    color: black;
  }

  #order-list .order-list-box .order-list-item p {
    margin: 0;
    padding: 0;
  }

  #order-list .order-list-box .order-list-item .order-list-item-title {
    width: calc(100% - 10px);
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background-color: #eaf8ff;
    font-size: 14px;
  }

  #order-list .order-list-box .order-list-item .order-list-item-title span.bolder {
    font-weight: bolder;
  }

  #order-list .order-list-box .order-list-item .order-list-item-info {
    margin-top: 10px;
    height: 70px;
  }

  #order-list .order-list-box .order-list-item .order-list-item-details,
  #order-list .order-list-box .order-list-item .order-list-item-info-other,
  #order-list .order-list-box .order-list-item .order-list-item-info-other div {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
  }

  #order-list .order-list-box .order-list-item .order-list-item-details {
    width: 50%;
  }

  #order-list .order-list-box .order-list-item .order-list-item-details div {
    display: inline-block;
    vertical-align: top;
  }

  #order-list .order-list-box .order-list-item .order-list-item-details .pro-img,
  #order-list .order-list-box .order-list-item .order-list-item-details .pro-count {
    width: 50px;
    margin-left: 5px;
    margin-right: 10px;
    text-align: center;
    line-height: 70px;
  }

  #order-list .order-list-box .order-list-item .order-list-item-details .pro-img img {
    width: 100%;
    height: 50px;
    /* border: 1px solid black; */
    margin-top: 10px;
  }

  #order-list .order-list-box .order-list-item .order-list-item-details .pro-title {
    width: 70%;
    margin-top: 8px;
  }

  #order-list .order-list-box .order-list-item .order-list-item-info-other {
    width: 49.4%;
    line-height: 70px;
  }

  #order-list .order-list-box .order-list-item .order-list-item-info-other div {
    width: 24%;
    text-align: center;
  }
</style>