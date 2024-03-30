<template>
  <div id="details">
    <div class="pro-img">
      <div class="left">
        <div class="bigimg">
          <img :src="product.image" />
        </div>
        <div class="img-list" style="display: none;">
          <span>&lt;</span>
          <div class="img-list-main">
            <img :src="product.image" />
          </div>
          <span>&gt;</span>
        </div>
      </div>
      <div class="right">
        <h2 :style="tips?'font-size: 23px;':''"><span
            style="color: red;font-weight: bolder;font-size: 25px;">{{this.$route.query.productid}}-</span>{{product.title}}
        </h2>
        <div class="price"><span class="cprice">￥{{product.price}}</span><span class="oprice">￥{{product.oprice}}</span>
        </div>
        <div class="options">
          <ul class="options-item">
            <p v-if="tips" style="color: red;font-size: 15px;font-weight: bolder;">温馨提示：不同参数组合价格可能不同，请注意价格变化</p>
            <li class="options-item-title" v-for="(item, index) in argsList"><span
                class="span-title">{{item.key}}：</span>
              <ul>
                <li class="options-li" :class="item.checked==items?'active':''"
                  @click="changeChecked(index, index1, items)" v-for="(items, index1) in item.valueList">
                  <span>{{items}}</span>
                </li>
              </ul>
            </li>
            <li class="options-item-title"><span>数量：</span>
              <el-input-number v-model="count" @change="handleChange" :min="1" :max="10" label="描述文字" size="mini">
              </el-input-number>
            </li>
            <li class="options-item-title" style="position: relative;cursor: pointer;" @click="changeStar">
              <div class="star-container" style="position: absolute;" v-if="!star">
                <div style="display: inline-block;">
                  <svg t="1688959732066" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="20501" width="20" height="20">
                    <path
                      d="M972.33327 389.423267l-307.092144-46.864354L527.195074 48.777937 389.149021 342.55789 82.056877 389.423267l222.162846 227.460502-52.601009 322.171584 275.576359-152.172795 275.576359 152.172795-52.601009-322.171584L972.33327 389.423267zM527.195074 722.327286 320.519967 838.202387l39.450501-233.81728L182.040033 422.760536l240.688781-31.298843 104.465237-222.705198L630.736265 391.462716l239.876276 34.013675-176.192861 179.779549 36.84414 233.81421L527.195074 722.327286z"
                      fill="#272636" p-id="20502"></path>
                  </svg>
                </div>
                <p style="margin: 0;display: inline-block;vertical-align: top;line-height: 25px;font-size: 14px;">收藏</p>
              </div>
              <div class="star-on-container" style="position: absolute;" v-if="star">
                <div style="display: inline-block;">
                  <svg t="1688959761754" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="20656" width="20" height="20">
                    <path
                      d="M511.936 49.728 671.872 370.56 996.992 402.88 740.352 645.056 811.776 974.272 511.936 787.968 212.288 974.272 283.648 645.056 27.008 402.88 352.128 370.56 511.936 49.728Z"
                      fill="red" p-id="20657"></path>
                  </svg>
                </div>
                <p style="margin: 0;display: inline-block;vertical-align: top;line-height: 25px;font-size: 14px;">已收藏
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="operate">
          <el-button type="warning" @click="goCart">加入购物车</el-button>
          <!-- <router-link :to="{path: 'orderConfirm'}"> -->
          <el-button type="danger" @click="goConfirm">立即购买</el-button>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <div class="pro-desc">
      <div class="pro-desc-title">
        <ul>
          <li class="active">商品详情</li>
          <li>商品评价</li>
        </ul>
      </div>
      <div class="pro-desc-container">
        <div class="pro-desc-details">
          <div class="pro-desc-argument">
            <p>品牌：{{product.brand}}</p>
            <ul>
              <li>商品名称：{{product.title}}</li>
              <li>商品编号：{{product.idnumber}}</li>
              <li v-for="item in cateArgsObjList">{{item.key}}：{{item.value}}</li>
            </ul>
          </div>
          <div class="pro-desc-editorcontext">
            <img :src="product.image" />
          </div>
        </div>
        <div class="pro-desc-judge">
          <div class="pro-desc-judge-title">
            <h4>商品评价</h4>
            <p>好评度：<span>100%</span></p>
          </div>
          <div class="pro-desc-judge-list">
            <ul>
              <li>
                <div class="judge-item">
                  <div class="judge-item-title">
                    <img />
                    <div class="judge-person-info">
                      <h3>张三</h3>
                      <p>2023-06-30</p>
                    </div>
                  </div>
                  <div class="judge-item-details">
                    <div class="judge-item-rate">
                      <el-rate v-model="judge[0].score" disabled show-score text-color="#ff9900" score-template="">
                      </el-rate>
                    </div>
                    <div class="judge-item-desc">
                      这是张三的评价这是张三的评价这是张三的评价这是张三的评价这是张三的评价
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="judge-item">
                  <div class="judge-item-title">
                    <img />
                    <div class="judge-person-info">
                      <h3>李四</h3>
                      <p>2023-07-01</p>
                    </div>
                  </div>
                  <div class="judge-item-details">
                    <div class="judge-item-rate">
                      <el-rate v-model="judge[1].score" disabled show-score text-color="#ff9900" score-template="">
                      </el-rate>
                    </div>
                    <div class="judge-item-desc">
                      这是李四的评价这是李四的评价这是李四的评价这是李四的评价这是李四的评价
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'

  import {
    mapActions
  } from "vuex";
  import {
    mapGetters
  } from "vuex";

  export default {
    data() {
      return {
        hello: "hello1",
        count: 1,
        star: false,
        judge: [{
            name: "张三",
            score: 3.5
          },
          {
            name: "李四",
            score: 4.5
          }
        ],
        product: "",
        cateArgsObjList: "",
        argsList: "",
        argsChecked: false,
        tips: false,
        checkedList: [],
        defaultPrice: "",
        defaultImage: ""
      }
    },

    created: function() {
      // console.log("app:" + $("#app"));
      // console.log("hello:" + JSON.stringify(this.hello));
      console.log("productid:" + this.$route.query.productid);
      this.$axios
        .get(this.$target + '/api/products/details?id=' + this.$route.query.productid)
        .then(res => {
          // console.log("response:" + JSON.stringify(res.data.data));
          this.product = res.data.data;
          this.defaultPrice = this.product.price;
          this.defaultImage = this.product.image;
          this.handleResult(res);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },

    activated() {
      console.log("组件更新");
      console.log("productid:" + this.$route.query.productid);
      this.$axios
        .get(this.$target + '/api/products/details?id=' + this.$route.query.productid)
        .then(res => {
          // console.log("response:" + JSON.stringify(res.data.data));
          this.product = res.data.data;
          this.handleResult(res);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },

    computed: {
      ...mapGetters(["getUser"])
    },

    methods: {
      ...mapActions(["setUser", "setShowLogin"]),

      handleResult(res) {
        var categoryArgs = this.product.arguments;
        var detailsarg = this.product.detailsarg;
        var argsname = this.product.argsname;
        var argsvalue = this.product.argsvalue;
        var argsassemblyvalue = this.product.argsassemblyvalue;
        var favUser = this.product.favuser;

        var categoryArgsList = categoryArgs.split(",");
        console.log("categoryArgsList:" + categoryArgsList);
        var detailsargList = detailsarg.split(";");
        console.log("detailsargList:" + detailsargList);

        var cateArgsObjList = [];
        for (var i = 0; i < categoryArgsList.length; i++) {
          detailsargList[i] = detailsargList[i].replace("[", "");
          detailsargList[i] = detailsargList[i].replace("]", "");
          var obj = {
            key: categoryArgsList[i],
            value: detailsargList[i]
          }
          // console.log("obj:" + JSON.stringify(obj));
          cateArgsObjList.push(obj);
          // console.log("cateArgsObjList:" + JSON.stringify(cateArgsObjList));
          this.cateArgsObjList = cateArgsObjList;
        }

        var argsnameList = argsname.split(";");
        // console.log("argsnameList:" + JSON.stringify(argsnameList));
        var argsvalueList = argsvalue.split(";");
        // console.log("argsvalueList:" + JSON.stringify(argsvalueList));

        var argsList = [];

        for (var i = 0; i < argsnameList.length; i++) {
          var key = argsnameList[i];
          var valueList = argsvalueList[i].split(",");
          var argsObj = {
            key: key,
            valueList: valueList
          }
          argsList.push(argsObj);
        }
        // console.log("argsList:" + JSON.stringify(argsList));
        this.argsList = argsList;

        if (localStorage.getItem("user")) {
          var favUserList = favUser.split(";");
          console.log("favUserList:" + JSON.stringify(favUserList));
          if (favUserList.length) {
            for (var i = 0; i < favUserList.length; i++) {
              console.log("favUserList[" + i + "]:" + favUserList[i] + ",userid:" + JSON.parse(localStorage.getItem(
                "user")).id);
              if (favUserList[i] == JSON.parse(localStorage.getItem("user")).id) {
                this.star = true;
                break;
              }
            }
          }
        }


        var argsassemblyvalueList = argsassemblyvalue.split(";");


      },

      changeStar() {
        if (localStorage.getItem("user")) {
          var favUser = this.product.favuser;
          var replaceChar = JSON.parse(localStorage.getItem("user")).id;
          if (this.star) {
            favUser = favUser.replace(replaceChar + ';', '');
            this.$axios
              .get(this.$target + '/api/fav/delete?userid=' + JSON.parse(localStorage.getItem("user")).id +
                '&productid=' + this.$route.query.productid)
              .then(res => {
                console.log("response-fav-errorno:" + JSON.stringify(res.data.errno));
              })
              .catch(err => {
                return Promise.reject(err);
              });
          } else {
            favUser += replaceChar + ';';
            this.$axios
              .get(this.$target + '/api/fav/new?userid=' + JSON.parse(localStorage.getItem("user")).id +
                '&productid=' + this.$route.query.productid)
              .then(res => {
                console.log("response-fav-errorno:" + JSON.stringify(res.data.errno));
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }
          this.$axios
            .get(this.$target + '/api/products/update?id=' + this.$route.query.productid + '&favUserList=' + favUser)
            .then(res => {
              console.log("response-products-errorno:" + JSON.stringify(res.data.errno));
            })
            .catch(err => {
              return Promise.reject(err);
            });
          this.star = !this.star;
        } else {
          this.setShowLogin(true);
        }
      },

      changeChecked(index, index1, items) {
        this.tips = true;
        let checkedList = this.checkedList;
        checkedList[index] = items;
        this.checkedList = checkedList;
        this.argsList[index].checked = items;
        this.$forceUpdate();
        let checkNull = true;
        var i;
        for (i = 0; i < this.argsList.length; i++) {
          if (checkedList[i] == null || checkedList[i] == undefined) {
            break;
          }
        }
        if (i == this.argsList.length) {
          checkNull = false;
        }
        this.checkArgs(checkNull, checkedList);
      },

      checkArgs(checkNull, checkedList) {
        if (!checkNull) {
          this.argsChecked = true;
          let referenceList = this.product.argsassemblyvalue.split(";");
          let temp = null,
            price = null,
            image = null,
            defaultPrice = this.defaultPrice,
            defaultImage = this.defaultImage;
          for (var j = 0; j < referenceList.length; j++) {
            let singleTemp = referenceList[j].split(",");
            var k;
            for (k = 0; k < checkedList.length; k++) {
              if (singleTemp[k] != checkedList[k]) {
                break;
              }
            }
            if (k == checkedList.length) {
              temp = singleTemp;
              break;
            } else {
              temp = null;
              continue;
            }
          }
          if (temp != null) {
            price = temp[checkedList.length];
            image = temp[checkedList.length + 1];
          } else {
            price = defaultPrice;
            image = defaultImage;
          }
          console.log("price:" + price);
          this.product.price = price;
          this.product.image = image;
        }
      },

      goCart() {
        if (localStorage.getItem("user")) {
          if (!this.argsChecked) {
            this.$notify({
              title: '警告',
              type: 'warning',
              message: '请选择商品参数'
            });
            this.tips = true;
          } else {
            let userid = JSON.parse(localStorage.getItem("user")).id;
            let productid = this.$route.query.productid;
            let checkedList = this.checkedList.toString();
            let ttprice = (this.product.price * this.count).toFixed(2);
            console.log("ttprice:" + ttprice);
            this.$axios
              .post(this.$target + '/api/cart/new', {
                userid: userid,
                productid: productid,
                args: checkedList,
                price: this.product.price,
                count: this.count,
                ttprice: ttprice
              })
              .then(res => {
                // console.log("response:" + JSON.stringify(res.data));
                if (!res.data.errno) {
                  this.$notify({
                    title: '成功',
                    type: 'success',
                    message: '添加成功'
                  });
                } else {
                  this.$notify({
                    title: '失败',
                    message: '删除失败，请稍后再试',
                    type: 'error'
                  });
                }
                // location.reload();
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }
        } else {
          this.setShowLogin(true);
        }
      },

      goConfirm() {
        if (localStorage.getItem("user")) {
          if (!this.argsChecked) {
            this.$notify({
              title: '警告',
              type: 'warning',
              message: '请选择商品参数'
            });
            this.tips = true;
          } else {

            let orderid = "";
            let username = JSON.parse(localStorage.getItem("user")).username;
            let productIDNumber = this.product.idnumber;
            let date = new Date();
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const hours = ('0' + date.getHours()).slice(-2);
            const minutes = ('0' + date.getMinutes()).slice(-2);
            const seconds = ('0' + date.getSeconds()).slice(-2);
            let createtime = year + month + day + hours + minutes;
            console.log("createtime:" + createtime.toString());
            orderid = createtime + username + productIDNumber;

            console.log("orderid:" + orderid);

            console.log("checkedList:" + this.checkedList.toString());

            this.$axios
              .post(this.$target + '/api/order/new', {
                orderid: orderid,
                userid: JSON.parse(localStorage.getItem("user")).id,
                productid: this.$route.query.productid,
                addressid: 0,
                args: this.checkedList.toString(),
                price: this.product.price,
                count: this.count,
                ttprice: (this.product.price * this.count).toFixed(2),
                delivery: "快递配送",
                remark: "",
                createtime: createtime.toString()
              })
              .then(res => {
                console.log("res:" + JSON.stringify(res.data.data));
                if (!res.data.errno) {
                  let result = res.data.data;
                  let id = result.id;
                  this.$router.push({
                    path: '/orderConfirm',
                    query: {
                      id: id
                    }
                  })
                } else {
                  this.$notify({
                    title: "失败",
                    message: '操作失败，请稍后再试',
                    type: 'error'
                  });
                }
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }
        } else {
          this.setShowLogin(true);
        }
      },

      handleChange(count) {
        console.log("count:" + this.count);
      }

    }
  }
</script>

<style scoped>
  /* @import '../assets/css/app.css'; */

  #details .pro-img {
    margin-bottom: 35px;
  }

  #details .left,
  #details .right {
    display: inline-block;
    width: 49%;
    vertical-align: top;
    text-align: left;
  }

  #details .left .bigimg {
    width: 450px;
    height: 450px;
    border: 1px solid lightgray;
    margin-bottom: 20px;
  }

  #details .left .bigimg img {
    width: 100%;
    height: 100%;
  }

  #details .left .img-list {
    width: 450px;
    height: 58px;
    position: relative;
  }

  #details .left .img-list span {
    display: inline-block;
    width: 15px;
    height: 100%;
    line-height: 58px;
    text-align: center;
    color: white;
    font-size: 18px;
    background-color: gray;
    opacity: 0.3;
    position: absolute;
  }

  #details .left .img-list span:first-child {
    left: 0;
  }

  #details .left .img-list span:last-child {
    right: 0;
  }

  #details .left .img-list .img-list-main {
    display: inline-block;
    width: calc(100% - 35);
    height: 100%;
    margin-left: 20px;
  }

  #details .left .img-list img {
    width: 58px;
    height: 100%;
    margin-right: 5px;
  }

  #details .left .img-list img:not(.active) {
    border: 0.5px solid lightgray;
  }

  #details .left .img-list img.active {
    border: 0.5px solid red;
  }

  #details .right h2 {
    margin-top: 0;
  }

  #details .right .price {
    width: 100%;
    height: 42px;
    background-color: whitesmoke;
    line-height: 42px;
  }

  #details .right .cprice {
    margin-left: 20px;
    margin-right: 20px;
    color: red;
    font-weight: bolder;
    font-size: 25px;
  }

  #details .right .oprice {
    color: lightgray;
    text-decoration: line-through;
  }

  #details .right .options ul {
    padding: 0;
  }

  #details .right .options .options-item-title,
  #details .right .options .options-item-title ul,
  #details .right .options .options-item-title ul li {
    display: inline-block;
    vertical-align: top;
    width: 85%;
  }

  #details .right .options .options-item-title {
    width: 100%;
    margin-bottom: 20px;
  }

  #details .right .options .options-item-title span {
    display: inline-block;
    width: 80px;
  }

  #details .right .options .options-item-title .span-title {
    line-height: 45px;
  }

  #details .right .options .options-item-title ul li {
    width: auto;
    min-width: 100px;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border: 1px solid lightgray;
    text-align: center;
    font-size: 15px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  #details .right .options .options-item-title ul li.active {
    border: 1px solid red;
    color: red;
  }

  #details .right .options .options-item-title ul li img {
    width: 40px;
    height: 40px;
    margin-right: 3px;
    float: left;
    display: inline-block;
    vertical-align: middle;
  }

  #details .right .options .options-item-title ul li span {
    display: inline-block;
    width: auto;
    font-size: 15px;
  }

  #details .pro-desc-title ul {
    padding: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f7f7f7;
    border-bottom: 1px solid red;
  }

  #details .pro-desc-title ul li {
    float: left;
    width: 100px;
    height: 100%;
  }

  #details .pro-desc-title ul li.active {
    background-color: #e4393c;
    color: white;
  }

  #details .pro-desc-container {
    position: relative;
    text-align: left;
    font-size: 14px;
  }

  #details .pro-desc-container ul {
    padding: 0;
  }

  /* #details .pro-desc-container .pro-desc-details,#details .pro-desc-container .pro-desc-judge{
    position: absolute;
    left: 0;
    top: 0;
  } */

  .pro-desc-container .pro-desc-argument p {
    margin-top: 50px;
  }

  .pro-desc-container .pro-desc-argument ul li {
    display: inline-block;
    width: 49%;
    height: 30px;
    line-height: 30px;
    vertical-align: top;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .pro-desc-editorcontext img {
    max-height: 1000px;
  }

  .pro-desc-container .pro-desc-judge {
    margin-top: 50px;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f7f7f7;
    padding-left: 10px;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-title h4,
  .pro-desc-container .pro-desc-judge .pro-desc-judge-title p {
    margin: 0;
    display: inline-block;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-title h4 {
    margin-right: 20px;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-title p {}

  .pro-desc-container .pro-desc-judge .pro-desc-judge-title p span {
    color: red;
    font-weight: bolder;
    font-size: 16px;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item {
    margin-bottom: 20px;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item h3 {
    margin: 0;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item .judge-item-title,
  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item .judge-item-details {
    display: inline-block;
    vertical-align: top;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item .judge-item-title {
    width: 200px;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item .judge-item-title img {
    width: 50px;
    height: 50px;
    border: 1px solid lightgray;
    border-radius: 30px;
    display: inline-block;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item .judge-item-title .judge-person-info {
    display: inline-block;
    vertical-align: top;
  }

  .pro-desc-container .pro-desc-judge .pro-desc-judge-list .judge-item .judge-item-desc {
    margin-top: 10px;
  }

  .options-item .options-li {
    cursor: pointer;
  }
</style>
