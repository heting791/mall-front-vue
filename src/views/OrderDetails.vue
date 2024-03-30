<template>
  <div id="order-details" class="order-details">
    <div class="order-states-title title">
      <h4>当前订单状态：{{this.$route.query.statusStr}}</h4>
    </div>
    <div class="order-details-info">
      <div class="order-details-title title">
        <h4>订单信息</h4>
      </div>
      <div class="order-details-box">
        <div class="consignee-info">
          <ul>
            <li><span>收货地址：</span><span>{{order.name}}，{{order.phoneprefix}}-{{order.phone}}，{{order.area}}
                {{order.deatailad}}</span></li>
            <li><span>运送方式：</span><span>{{order.delivery}}</span></li>
          </ul>
        </div>
        <div class="order-info">
          <div class="trading-info">
            <div class="title">
              <h4>订单信息</h4>
            </div>
            <el-descriptions>
              <el-descriptions-item label="用户名">{{order.name}}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{order.phone}}</el-descriptions-item>
              <el-descriptions-item label="居住地">{{order.area}}</el-descriptions-item>
              <el-descriptions-item label="标签">
                <el-tag size="small" v-if="order.tag">{{order.tag}}</el-tag>
                <span v-else>无</span>
              </el-descriptions-item>
              <el-descriptions-item label="联系地址">{{order.deatailad}}</el-descriptions-item>
            </el-descriptions>
          </div>
          <div class="pro-info">
            <table cellspacing="0" callpadding="0">
              <tr>
                <th>宝贝</th>
                <th>宝贝属性</th>
                <th>状态</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
              </tr>
              <tr style="height: 5px;"></tr>
              <tr>
                <td>
                  <div class="pro-img">
                    <img :src="order.image" />
                  </div>
                  <div class="pro-title">
                    <p>{{order.title}}</p>
                  </div>
                </td>
                <td>
                  <ul>
                    <li v-for="item in order.argsList">{{item}}</li>
                  </ul>
                </td>
                <td>{{this.$route.query.statusStr}}</td>
                <td>￥{{order.price}}</td>
                <td>{{order.count}}</td>
                <td>￥{{order.ttprice}}</td>
              </tr>
              <tr style="height: 5px;"></tr>
            </table>
          </div>
        </div>
      </div>
      <div class="price-right right">
        <ul>
          <li>商品总价：<span class="price">￥{{order.ttprice}}</span></li>
          <li>实付款：<span class="actual price">￥{{order.ttprice}}</span></li>
        </ul>
      </div>
      <div class="operate-right right">
        <!-- <router-link :to="{path: '/judgeEdit'}"> -->
        <el-button type="primary" round @click="operation">{{order.button}}</el-button>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        order: ""
      }
    },
    created() {
      let orderid = this.$route.query.orderid;
      this.$axios
        .get(this.$target + '/api/order/details?id=' + orderid)
        .then(res => {
          // console.log("response:" + JSON.stringify(res.data.data));
          this.order = res.data.data[0];
          this.handleDefault();
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    methods: {
      handleDefault() {
        let argsList = this.order.args.split(",");
        this.order.argsList = argsList;
        let status = this.$route.query.statusStr;
        let button = "";
        let path = "";
        switch (status) {
          case '待支付': {
            button = "去支付";
            path = '/orderConfirm';
            break;
          }
          case '待发货': {
            button = "发货";
            break;
          }
          case '待收货': {
            button = "确认收货";
            break;
          }
          case '待评价': {
            button = "去评价";
            path = '/judgeEdit';
            break;
          }
        }
        this.order.button = button;
        this.order.path = path;
      },
      operation() {
        let order = this.order;
        if (order.path != "") {
          this.$router.push({
            path: order.path,
            query: {
              id: this.$route.query.orderid
            }
          })
        } else {
          if (this.order.button == "发货") {
            this.$confirm('确认发货吗？')
              .then(_ => {
                this.done();
              })
              .catch(_ => {});
          } else if (this.order.button == "确认收货") {
            this.$confirm('确认收货吗？')
              .then(_ => {
                this.done();
              })
              .catch(_ => {});
          }
        }
      },
      done() {
        this.$axios
          .get(this.$target + '/api/order/update?id=' + this.order.id + '&status=' + (this.order.status + 1))
          .then(res => {
            if (res.data.errno) {
              this.$message({
                message: '操作失败，请稍后再试',
                type: 'error'
              });
            } else {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.$router.push({
                path: 'orderList'
              })
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
    }
  }
</script>

<style scoped>
  #order-details {
    text-align: left;
  }

  #order-details ul,
  #order-details h4,
  #order-details h5,
  #order-details p {
    margin: 0;
    padding: 0;
  }

  #order-details .order-states-title {
    height: 40px;
    line-height: 40px;
    background-color: #FFF7EB;
    border: 1px solid #F58B0F;
    padding-left: 10px;
    margin-bottom: 20px;
  }

  #order-details .title h4 {
    font-size: 15px;
  }

  #order-details .order-details-title {
    width: 120px;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    text-align: center;
    border: 1px solid #AEC7E5;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
  }

  #order-details .order-details-box {
    border: 1px solid #AEC7E5;
    padding: 30px 20px;
    font-size: 14px;
  }

  #order-details .order-details-box .consignee-info {
    margin-bottom: 20px;
    line-height: 30px;
  }

  .consignee-info li span:first-child {
    font-weight: bolder;
  }

  #order-details .trading-info .title {
    margin-bottom: 10px;
  }

  #order-details .pro-info {
    width: 80%;
  }

  #order-details .pro-info table {
    width: 100%;
    border: 1px solid #AEC7E5;
    line-height: 20px;
  }

  #order-details .pro-info table th,
  #order-details .pro-info table td {
    width: 5%;
    text-align: center;
  }

  #order-details .pro-info table tr:first-child {
    background-color: #e8f2ff;
  }

  #order-details .pro-info table td {
    border-right: 1px solid lightgray;
    padding-top: 3px;
    font-size: 13px;
  }

  #order-details .pro-info table td p,
  #order-details .pro-info table td li {
    font-size: 13px;
  }

  #order-details .pro-info table td:last-child {
    border-right: none;
  }

  #order-details .pro-info table th:first-child,
  #order-details .pro-info table td:first-child {
    width: 40%;
  }

  #order-details .pro-info table th:nth-child(2),
  #order-details .pro-info table td:nth-child(2) {
    width: 15%;
  }

  #order-details .pro-info table td .pro-img,
  #order-details .pro-info table td .pro-title {
    display: inline-block;
    vertical-align: top;
    width: 75%;
  }

  #order-details .pro-info table td .pro-img {
    width: 50px;
    margin-right: 10px;
  }

  #order-details .pro-info table td .pro-img img {
    width: 100%;
    height: 50px;
    /* border: 1px solid black; */
  }

  .right {
    text-align: right;
  }

  #order-details .price-right {
    font-size: 15px;
    margin: 20px 0;
    line-height: 30px;
  }

  /* #order-details .price-right .price{
    margin-left: 40px;
  } */

  #order-details .price-right .actual {
    font-size: 20px;
    color: red;
    font-weight: bolder;
  }
</style>
