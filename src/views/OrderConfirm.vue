<template>

  <div id="orderConfirm">
    <div class="orderConfirm">

      <div>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="dialogClose">
          <addressEdit :address="toChildAddress" :confirm="confirm" :edit="addressEdit" :id="addressEditId">
          </addressEdit>
        </el-dialog>
      </div>

      <div class="address">

        <div class="address-title">
          <h4>选择收货地址</h4>
          <el-button type="text" @click="dialogFormVisible = true">新增收货地址</el-button>
        </div>

        <div class="address-list">
          <div class="address-list-item" v-if="checkedAddress != ''">
            <div class="province checked">
              <p><span>{{checkedAddress.name}}</span><span>{{checkedAddress.province}}</span></p>
              <b></b>
            </div>
            <div class="address-details">
              <p><span>{{checkedAddress.name}}</span><span>{{checkedAddress.area}} {{checkedAddress.deatailad}}</span>
              </p>
              <p><span @click="goEdit(checkedAddress.id)">编辑</span><span @click="goDel(checkedAddress.id)">删除</span></p>
            </div>
          </div>
          <div class="address-list-item" v-for="(item, index) in showAddressList" v-if="checkedAddress.id != item.id"
            @click="goCheckedAddress('showAddressList', index, item.id)">
            <div class="province">
              <p><span>{{item.name}}</span><span>{{item.province}}</span></p>
              <b></b>
            </div>
            <div class="address-details">
              <p><span>{{item.name}}</span><span>{{item.area}} {{item.deatailad}}</span></p>
              <p><span @click="goEdit(item.id)">编辑</span><span @click="goDel(item.id)">删除</span></p>
            </div>
          </div>
          <div class="unfold-tips" v-if="addressOverlength && !moreAddress" @click="moreAddress = true;">
            <span>更多地址</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <div class="unfold" v-if="moreAddress">
            <div class="address-list-item" v-for="(item, index) in hideAddressList" v-if="checkedAddress.id != item.id"
              @click="goCheckedAddress('hideAddressList', index, item.id)">
              <div class="province">
                <p><span>{{item.name}}</span><span>{{item.province}}</span></p>
                <b></b>
              </div>
              <div class="address-details">
                <p><span>{{item.name}}</span><span>{{item.area}} {{item.deatailad}}</span></p>
                <p><span @click="goEdit(item.id)">编辑</span><span @click="goDel(item.id)">删除</span></p>
              </div>
            </div>
          </div>
          <div class="packup-tips" v-if="addressOverlength && moreAddress" @click="moreAddress = false;">
            <span>收起地址</span>
            <i class="el-icon-arrow-up"></i>
          </div>
        </div>
      </div>
      <div class="order-info">
        <h4>确认订单信息</h4>
        <div class="order-pro-list-title">
          <ul>
            <li>商品名称</li>
            <li>商品属性</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
          </ul>
        </div>
        <div class="pro-list">
          <div class="pro-list-item" v-for="(item, index) in orders">
            <div class="normal">
              <div class="item-title">
                <img :src="item.image" />
                <span>{{item.title}}</span>
              </div>
              <div class="item-stats">
                <ul>
                  <li v-for="items in item.args">
                    <!-- <span>颜色：</span> -->
                    <span>{{items}}</span>
                  </li>
                </ul>
              </div>
              <div class="item-sprice">
                <span>{{item.price}}</span>
              </div>
              <div class="item-count">
                <span>{{item.count}}</span>
              </div>
              <div class="sttprice">
                <span>{{item.ttprice}}</span>
              </div>
            </div>
            <div class="item-others">
              <div class="item-message">
                <p><span>订单备注：</span>
                  <textarea v-model="item.remark"></textarea>
                </p>
              </div>
              <div class="item-way">
                <p><span>配送方式：</span>
                  <el-dropdown size="small" trigger="click" @command="handleCommand">
                    <el-button type="primary">
                      {{item.delivery}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="beforeHandleCommand(index, '快递配送')">快递配送</el-dropdown-item>
                      <el-dropdown-item :command="beforeHandleCommand(index, '到店自取')">到店自取</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="confirm">
        <div class="result">
          <p class="total-price"><span class="title">实付款：</span><span class="price-symbol">￥</span><span
              class="price-red">{{ttprice}}</span></p>
          <p class="to-address"><span class="title">寄送至：</span><span>{{checkedAddress.area}}
              {{checkedAddress.deatailad}}</span></p>
          <p class="person"><span class="title">收货人：</span><span>{{checkedAddress.name}} {{checkedAddress.phone}}</span>
          </p>
        </div>
        <div class="confirm-btn">
          <el-button type="danger" @click="submitOrders">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import addressEdit from '@/components/AddressEdit.vue'

  export default {
    components: {
      addressEdit
    },
    data() {
      return {
        dialogFormVisible: false,
        toChildAddress: "",
        defaultToChildAddress: {
          area: "",
          name: "",
          deatailad: "",
          phoneprefix: 86,
          phone: "",
          tag: "",
          defaultad: false
        },
        confirm: true,
        orders: "",
        ttprice: 0,
        addressList: "",
        checkedAddress: "",
        addressOverlength: false,
        moreAddress: false,
        showAddressList: "",
        hideAddressList: "",
        addressEdit: false,
        addressEditId: ""
      }
    },

    created() {
      this.toChildAddress = this.defaultToChildAddress;
      console.log("$route.query:" + JSON.stringify(this.$route.query));
      if (this.$route.query.id) {
        let id = this.$route.query.id;
        console.log("id:" + id);
        this.$axios
          .get(this.$target + '/api/order/details?id=' + id)
          .then(res => {
            this.orders = res.data.data;
            this.handleDefault();
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else if (this.$route.query.idList) {
        let idList = this.$route.query.idList;
        for (var i = 0; i < idList.length; i++) {
          this.$axios
            .get(this.$target + '/api/order/details?id=' + idList[i])
            .then(res => {
              console.log("response:" + JSON.stringify(res.data.data));
              this.beforeDefault(res.data.data[0]);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }
      }

      this.$axios
        .get(this.$target + '/api/address/list?userid=' + JSON.parse(localStorage.getItem("user")).id)
        .then(res => {
          this.addressList = res.data.data;
          this.handleAddress();
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },

    methods: {
      beforeDefault(obj) {
        let orders = this.orders;
        if (orders == "") {
          orders = [];
        }
        orders.push(obj);
        this.orders = orders;
        if (this.orders.length == this.$route.query.idList.length) {
          this.handleDefault();
        }
      },
      handleDefault() {
        let ttprice = 0;
        for (var i = 0; i < this.orders.length; i++) {
          let args = this.orders[i].args.split(",");
          this.orders[i].args = args;
          ttprice += this.orders[i].ttprice;
        }
        this.ttprice = ttprice;
      },
      handleAddress() {
        let addressLen = this.addressList.length;
        for (var k = 0; k < addressLen; k++) {
          let province = this.addressList[k].area.split(" ")[0];
          this.addressList[k].province = province;
        }

        if (this.$route.query.id || this.$route.query.idList) {
          for (var x = 0; x < addressLen; x++) {
            if (this.orders[0].addressid == this.addressList[x].id) {
              this.checkedAddress = this.addressList[x];
              break;
            }
          }
          if (x >= addressLen) {
            for (var y = 0; y < addressLen; y++) {
              if (this.addressList[y].defaultad == 1) {
                this.checkedAddress = this.addressList[y];
              }
            }
          }
        }

        if (addressLen > 3) {
          this.addressOverlength = true;
          let showAddressList = [];
          for (var i = 0; i < 3; i++) {
            showAddressList.unshift(this.addressList[i]);
          }
          this.showAddressList = showAddressList;
          let hideAddressList = [];
          for (var j = 3; j < this.addressList.length; j++) {
            hideAddressList.unshift(this.addressList[j]);
          }
          this.hideAddressList = hideAddressList;
        } else {
          this.showAddressList = this.addressList;
        }
      },
      goCheckedAddress(listItem, index, id) {
        if (listItem == "showAddressList") {
          this.checkedAddress = this.showAddressList[index];
        } else {
          this.checkedAddress = this.hideAddressList[index];
        }
        for (var i = 0; i < this.orders.length; i++) {
          this.orders[i].addressid = id;
        }
      },
      beforeHandleCommand(index, item) {
        return {
          index: index,
          item: item
        }
      },
      handleCommand(command) {
        this.orders[command.index].delivery = command.item;
      },
      goEdit(id) {
        this.addressEditId = id;
        this.addressEdit = true;
        this.$axios
          .get(this.$target + '/api/address/goEdit?id=' + id)
          .then(res => {
            this.toChildAddress = res.data.data;
            this.dialogFormVisible = true;
          })
          .catch(err => {
            return Promise.reject(err);
          });
      },
      dialogClose() {
        this.toChildAddress = this.defaultToChildAddress;
        this.addressEditId = "";
        this.addressEdit = false;
      },
      goDel(id) {
        this.$axios
          .get(this.$target + '/api/address/deleteAddress?id=' + id)
          .then(res => {
            if (!res.data.errno) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '删除失败，请稍后再试',
                type: 'error'
              });
            }
            location.reload();
          })
          .catch(err => {
            return Promise.reject(err);
          });
      },
      submitOrders() {
        if (typeof(this.orders[0].addressid) == 'undefined') {
          this.$notify({
            title: '警告',
            message: '请选择收货地址',
            type: 'warning'
          });
        } else {
          let breakLoop = false;
          for (var i = 0; i < this.orders.length; i++) {
            if (breakLoop == true) {
              break;
            }
            this.$axios
              .post(this.$target + '/api/order/update?id=' + this.orders[i].id, {
                addressid: this.orders[i].addressid,
                delivery: this.orders[i].delivery,
                remark: this.orders[i].remark
              })
              .then(res => {
                if (res.data.errno) {
                  breakLoop = true;
                  return;
                }
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }
          if (i >= this.orders.length) {
            this.confirmPay();
          }
        }
      },
      confirmPay() {
        this.$confirm('确认支付吗？')
          .then(_ => {
            this.done();
          })
          .catch(_ => {});
      },
      done() {
        for (var i = 0; i < this.orders.length; i++) {
          this.$axios
            .get(this.$target + '/api/order/update?id=' + this.orders[i].id + '&status=1')
            .then(res => {
              if (res.data.errno) {
                this.$message({
                  message: '操作失败，请稍后再试',
                  type: 'error'
                });
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }
        if (i >= this.orders.length) {
          this.$notify({
            title: '成功',
            message: '支付成功',
            type: 'success'
          });
          this.$router.push({
            path: 'orderList'
          })
        }
      }
    }
  }
</script>

<style scoped>
  #orderConfirm {
    text-align: left;
  }

  .unfold-tips,
  .packup-tips {
    cursor: pointer;
  }

  #orderConfirm p,
  #orderConfirm span {
    font-size: 14px;
  }

  #orderConfirm p {
    padding: 0;
    margin: 0;
  }

  .address {
    width: 85%;
    margin: 0 auto;
    line-height: 30px;
  }

  .address .address-title {
    padding: 0 20px;
    height: 30px;
    border-bottom: 1px solid lightgray;
    width: 90%;
    margin: 0 auto;
  }

  .address .address-title h4 {
    display: inline-block;
    width: 50%;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .address .address-title button {
    display: inline-block;
    float: right;
    font-size: 14px;
  }

  .address .address-list {
    padding: 0 20px;
    margin-top: 20px;
  }

  .address .address-list-item span {
    margin-right: 20px;
  }

  .address .address-list-item {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .address .address-list-item:hover .address-details {
    background-color: #fff3f3;
  }

  .address .address-list-item .province,
  .address .address-list-item .address-details {
    display: inline-block;
    vertical-align: top;
  }

  .address .address-list-item .province {
    border: 2px solid lightgray;
    width: 120px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 10px;
    position: relative;
  }

  .address .address-list-item .province.checked {
    border: 2px solid #e4393c;
  }

  .address .address-list-item .province.checked b {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    background: url("../assets/imgs/icon/selected-icon.png") no-repeat;
  }

  .address .address-list-item .address-details {
    width: calc(100% - 130px);
    margin-left: -5px;
  }

  .address .address-list-item .address-details p:first-child {
    margin-left: 8px !important;
    width: 75%;
    display: inline-block;
  }

  .address .address-list-item .address-details p:last-child {
    display: inline-block;
    vertical-align: top;
    width: 12%;
    float: right;
  }

  .address .address-list-item .address-details p:last-child span {
    font-size: 12px !important;
    color: #005ea7;
  }

  .address .address-list-item .address-details p:last-child span:hover {
    color: red;
  }

  .order-info {
    margin-top: 30px;
  }

  .order-info ul {
    padding: 0;
    margin: 0;
  }

  .order-info ul li {
    display: inline-block;
    vertical-align: top;
  }

  .order-info .pro-list .pro-list-item {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .order-info .order-pro-list-title li {
    width: 14.5%;
    text-align: center;
    font-size: 15px;
    margin-right: 1px;
    border-bottom: 2px solid rgb(64, 158, 255);
    height: 22px;
    color: gray;
  }

  .order-info .order-pro-list-title li:first-child {
    width: 40%;
  }

  .order-info .pro-list-item .normal {
    width: 100%;
    height: 70px;
    background-color: rgb(251, 252, 255);
    padding-top: 5px;
  }

  .order-info .pro-list-item .normal div {
    width: 14.5%;
    margin-right: 1px;
    display: inline-block;
    vertical-align: top;
    margin-bottom: 20px;
  }

  .order-info .pro-list-item .normal .item-title {
    width: 40%;
  }

  .order-info .pro-list-item .item-title img {
    width: 50px;
    height: 50px;
    /* border: 1px solid black; */
    display: inline-block;
    margin-right: 10px;
  }

  .order-info .pro-list-item .item-title span {
    display: inline-block;
    vertical-align: top;
    width: 85%;
  }

  .order-info .pro-list-item .item-sprice,
  .order-info .pro-list-item .item-count,
  .order-info .pro-list-item .sttprice {
    text-align: center;
  }

  .order-info .pro-list-item .item-others {
    margin-top: 10px;
    width: 100%;
  }

  .order-info .pro-list-item .item-others .item-message,
  .order-info .pro-list-item .item-others .item-way {
    display: inline-block;
    width: 46.35%;
    height: 90px;
    vertical-align: top;
    background-color: rgb(242, 247, 255);
    padding: 10px 1.73%;
  }

  .order-info .pro-list-item .item-others .item-message p span,
  .order-info .pro-list-item .item-others .item-message p textarea {
    display: inline-block;
    vertical-align: top;
  }

  .order-info .pro-list-item .item-others .item-message p {
    height: 95%;
  }

  .order-info .pro-list-item .item-others .item-message p textarea {
    width: 80%;
    height: 100%;
  }

  .order-info .item-way .el-button--primary {
    color: black;
    border-color: lightgray;
    background-color: white;
  }

  .item-stats li {
    display: block !important;
    text-align: center;
  }

  .confirm {
    margin-top: 10px;
    float: right;
    text-align: right;
  }

  .result {
    border: 1px solid red;
    line-height: 20px;
    padding: 10px;
  }

  .result p .title {
    font-weight: bolder;
  }

  .confirm .result .total-price {
    line-height: 50px;
  }

  .result .price-symbol,
  .result .price-red {
    font-size: 26px !important;
  }

  .result .price-symbol {
    color: #999;
  }

  .result .price-red {
    font-weight: bolder;
    color: red;
  }
</style>
