<template>
  <div id="shopping-cart">
    <div class="cart" v-if="this.$store.getters.getNum>0">
      <div class="cart-top">
        <p>购物车</p>
        <p class="edit">编辑</p>
        <p class="complate">完成</p>
        <div class="total">
          <span class="heji" style="right: 15%;">合计：<span class="price">￥
              {{this.$store.getters.getTotalPrice}}</span><span class="decimal"></span></span>
          <el-button type="danger" round>去结算<span
              v-if="this.$store.getters.getCheckedNum>0">（{{this.$store.getters.getCheckedNum}}）</span></el-button>
        </div>
      </div>
      <div class="list" ref="list">
        <div class="list-title">
          <ul>
            <li>
              <div style="text-align: left;margin-left: 15%;" @click="changeAllChecked">
                <div class="all" v-if="!this.$store.getters.getIsAllChecked">
                  <div style="display: inline-block;">
                    <svg t="1688203449157" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2276" width="32" height="32">
                      <path
                        d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z"
                        fill="lightgray" p-id="2277"></path>
                    </svg>
                  </div>
                  <span style="display: inline-block;vertical-align: top;">全选</span>
                  <!-- <img src="img/circle.png" class="circle" /> -->
                </div>
                <div class="no-all" v-else>
                  <div style="display: inline-block;">
                    <svg t="1688204616153" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="4092" width="32" height="32">
                      <path
                        d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z"
                        fill="red" p-id="4093"></path>
                    </svg>
                  </div>
                  <span style="display: inline-block;vertical-align: top;">取消全选</span>
                </div>
              </div>
            </li>
            <li>商品信息</li>
            <li>单价</li>
            <li>数量</li>
            <li>金额</li>
            <li>操作</li>
          </ul>

        </div>

        <div class="list-item" v-for="(item, index) in products" :key="item.id">
          <div style="display: inline-block;" @click="changeChecked(index)">
            <div class="circle normal" v-if="!item.checked">
              <svg t="1688345468237" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2285" width="32" height="32">
                <path
                  d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z"
                  fill="lightgray" p-id="2286"></path>
              </svg>
            </div>
            <div class="circle checked" v-else>
              <svg t="1688345657707" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2440" width="32" height="32">
                <path
                  d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z"
                  fill="red" p-id="2441"></path>
              </svg>
            </div>
          </div>
          <!-- <img src="img/circle.png" class="circle normal" />
          <img src="img/checked.png" class="circle checked" /> -->
          <div class="product-info" :class="item.out?'out':''">
            <img :src="item.image" />
            <p class="sold-out">已下架</p>
            <div class="product-info-text">
              <p class="name-title"><span style="color: red;font-weight: bolder;font-size: 25px;">{{this.$route.query.productid}}-</span>{{item.title}}</p>
              <div class="specification">
                <el-dropdown @command="handleCommand" trigger="click" v-for="(items, index1) in item.argsList"
                  :key="index1">
                  <span class="el-dropdown-link">
                    {{items.checked}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="beforeHandleCommand(index, index1, itemss)"
                      v-for="(itemss, index2) in items.list" :key="index2">{{itemss}}</el-dropdown-item>
                    <!-- <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="product-info-text-price">
                <p class="sprice">￥ <span>{{item.price}}</span></p>
                <div class="count">
                  <span class="subtract" :style="item.subtractDisabled?'color: #d3d3d3;cursor: not-allowed':''"
                    @click="subtract(index)">-</span>
                  <span>{{item.count}}</span>
                  <span class="add" @click="add(index)">+</span>
                </div>
                <p class="sttprice">￥ <span>{{item.ttprice}}</span></p>
                <p class="sdelete" @click="singleDelete(index)">删除</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="cart-bottom" style="line-height: 34px;width: 1200px;background-color: white;padding-top: 5px;"
        v-if="bottomVisible" :style="fixed?'position:fixed;bottom:0':'position: static;'">
        <div style="display: inline-block;width: 22%;text-align: left;" @click="changeAllChecked"
          :style="this.$store.getters.getCheckedNum>0?'margin-left: -40%;':'margin-left: -47%;'">
          <div class="all" v-if="!this.$store.getters.getIsAllChecked">
            <div style="display: inline-block;">
              <svg t="1688203449157" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2276" width="32" height="32">
                <path
                  d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z"
                  fill="lightgray" p-id="2277"></path>
              </svg>
            </div>
            <span style="display: inline-block;vertical-align: top;">全选</span>
            <!-- <img src="img/circle.png" class="circle" /> -->
          </div>
          <div class="no-all" v-else>
            <div style="display: inline-block;">
              <svg t="1688204616153" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4092" width="32" height="32">
                <path
                  d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z"
                  fill="red" p-id="4093"></path>
              </svg>
            </div>
            <span style="display: inline-block;vertical-align: top;">取消全选</span>
          </div>
        </div>
        <span class="batch-delete delete" @click="batchDelete" style="margin-left: 20px;">删除</span>
        <div class="total" style="float: right;margin-right: 6%;">
          <span class="heji" style="margin-right: 30px;">合计：<span class="price">￥
              {{this.$store.getters.getTotalPrice}}</span><span class="decimal"></span></span>
          <el-button type="danger" round>去结算<span
              v-if="this.$store.getters.getCheckedNum>0">（{{this.$store.getters.getCheckedNum}}）</span></el-button>
        </div>
      </div>
    </div>
    <el-empty v-if="!this.$store.getters.getNum">
      <el-button type="primary" @click="goShopping">去购物</el-button>
    </el-empty>
  </div>
</template>

<script>
  import {
    mapActions
  } from "vuex";
  import {
    mapGetters
  } from "vuex";

  export default {

    data() {
      return {
        products: "",
        all: true,
        fixed: "",
        bottomVisible: ""
      }
    },

    created() {
      if (localStorage.getItem("user")) {
        this.$axios
          .get(this.$target + '/api/cart/list?userid=' + JSON.parse(localStorage.getItem("user")).id)
          .then(res => {
            this.products = res.data.data;
          })
          .catch(err => {
            return Promise.reject(err);
          });

        // this.handleDefault();
        // this.changeSinglePrice();

      } else {
        this.$message({
          message: '未登录，请先登录',
          type: 'warning'
        });
        this.$router.push({
          path: '/'
        })
      }
    },

    // activated() {
    //   if (localStorage.getItem("user")) {
    //     console.log("products:" + JSON.stringify(this.products));
    //     this.handleDefault();
    //     this.changeSinglePrice();
    //   } else {
    //     this.$message({
    //       message: '未登录，请先登录',
    //       type: 'warning'
    //     });
    //     this.$router.push({
    //       path: '/'
    //     })
    //   }
    // },

    computed: {
      ...mapGetters([
        "getNum",
        "getShoppingCart",
        "getCheckedNum",
        "getCheckedItem",
        "getTotalPrice",
        "getIsAllChecked"
      ]),
      // products: {
      //   get() {
      //     return this.$store.getters.getShoppingCart;
      //   }
      // }
    },

    mounted() {
      var listScrollTop = this.$refs.list.offsetTop;
      console.log("list-scrollTop:" + listScrollTop);
      let windowHeight = window.innerHeight;
      console.log("windowHeight:" + windowHeight);
      let height = parseInt(listScrollTop + this.$refs.list.offsetHeight);
      console.log("list+top-height:" + height);
      if (height > windowHeight) {
        this.bottomVisible = true;
        this.fixed = true;
      } else {
        this.bottomVisible = false;
        this.fixed = false;
      }
      window.addEventListener("scroll", this.watchScroll);
    },

    methods: {
      ...mapActions(["setShoppingCart", "initShoppingCart", "updateShoppingCart", "deleteCartItem"]),

      watchScroll() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        console.log("scrollTop:" + scrollTop);
        console.log("document.body.clientHeight:" + document.body.clientHeight);
        if (scrollTop > document.body.clientHeight - window.innerHeight - 290) {
          this.fixed = false;
        } else if (this.bottomVisible) {
          this.fixed = true;
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
      },

      beforeHandleCommand(index, index1, itemss) {
        // console.log("index1:" + index1);
        // console.log("index2:" + index2);
        // console.log("itemss:" + itemss);
        // return {
        //   index: index,
        //   index1: index1,
        //   itemss: itemss
        // }
      },

      handleCommand(command) {
        // this.$message('click on item ' + command);
        console.log(JSON.stringify(command));
        let index = command.index;
        let index1 = command.index1;
        let itemss = command.itemss;
        let checkedArgsList = this.products[index].args.split(",");
        this.products[index].argsList[index1].checked = itemss;
        this.$forceUpdate();
        checkedArgsList[index1] = itemss;
        console.log("after-checkedArgsList:" + JSON.stringify(checkedArgsList));
        let temp = "";
        for (var i = 0; i < checkedArgsList.length - 1; i++) {
          temp += checkedArgsList[i] + ",";
        }
        temp += checkedArgsList[checkedArgsList.length - 1];
        console.log("temp:" + temp);
        // this.products[index].args = temp;
        // console.log("change:" + this.products[index].args);
        this.updateShoppingCart({
          index: index,
          args: temp,
          checked: true
        });
        let price = this.changeSinglePrice(index);
        console.log("return-price:" + price);
        this.updateCart(index);
      },

      handleDefault() {
        var products = this.products;
        for (var i = 0; i < products.length; i++) {
          var checkedArgsList = products[i].args.split(",");
          var argsList = [];
          var listItem = products[i].argsvalue.split(";");
          // console.log("listItem:" + JSON.stringify(listItem));
          for (var j = 0; j < listItem.length; j++) {
            var singleItem = listItem[j].split(",");
            var obj = {};
            obj.list = singleItem;
            obj.checked = checkedArgsList[j];
            argsList[j] = obj;
          }
          // console.log("argsList:" + JSON.stringify(argsList));
          this.products[i].argsList = argsList;
          if (this.products[i].count == 1) {
            this.products[i].subtractDisabled = true;
          } else {
            this.products[i].subtractDisabled = false;
          }
        }
        // console.log("products:" + JSON.stringify(this.products));
      },
      subtract(index) {
        let count = this.products[index].count;
        if (!this.products[index].subtractDisabled) {
          this.updateShoppingCart({
            index: index,
            checked: true,
            count: count - 1
          });
          if (count - 1 == 1) {
            this.products[index].subtractDisabled = true;
          } else {}
        }
        this.updateCart(index);
      },

      add(index) {
        let count = this.products[index].count;
        this.updateShoppingCart({
          index: index,
          checked: true,
          count: count + 1
        });
        this.products[index].subtractDisabled = false;
        this.updateCart(index);
      },
      changeSinglePrice(index) {
        for (var i = 0; i < this.products.length; i++) {
          var checkedList = [];
          var referenceList = this.products[i].argsassemblyvalue.split(";");
          // this.products[i].referenceList = referenceList;
          var checkedArgs = this.products[i].args.split(",");
          let temp = null,
            price = null,
            defaultPrice = this.products[i].defaultprice;

          // for(var j = 0; j < this.products[i].argsList.length; j++) {
          //   var singleChecked = this.products[i].argsList[j].checked;
          //   checkedList[j] = singleChecked;
          // }
          for (var k = 0; k < referenceList.length; k++) {
            let singleTemp = referenceList[k].split(",")
            var x;
            for (x = 0; x < checkedArgs.length; x++) {
              if (singleTemp[x] != checkedArgs[x]) {
                // console.log("yes!" + "i:" + i + ",k:" + k + ",x:" + x + ":" + temp[x] + "," + checkedArgs[x]);
                break;
              }
            }
            if (x == checkedArgs.length) {
              temp = singleTemp;
              break;
            } else {
              continue;
            }
          }
          if (temp != null) {
            price = temp[checkedArgs.length];
          } else {
            price = defaultPrice;
          }
          console.log("price:" + price);
          this.updateShoppingCart({
            index: i,
            price: price
          });
        }
        return this.products[index].price;
      },
      changeChecked(index) {
        var checked = this.products[index].checked;
        if (!checked) {
          this.updateShoppingCart({
            index: index,
            checked: true
          });
        } else {
          this.updateShoppingCart({
            index: index,
            checked: false
          });
        }
      },
      changeAllChecked() {
        let isAllChecked = this.$store.getters.getIsAllChecked;
        this.updateShoppingCart({
          isAllChecked: !isAllChecked
        })
      },
      singleDelete(index) {
        this.$confirm('确定删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCartItem({
            index: index
          });
          this.$axios
            .get(this.$target + '/api/cart/delete?id=' + this.products[index].cartid)
            .then(res => {
              // console.log("response:" + JSON.stringify(res.data));
              if (!res.data.errno) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                });
              } else {
                this.$message({
                  message: '删除失败，请稍后再试',
                  type: 'error'
                });
              }
              // location.reload();
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }).catch(() => {});
      },
      batchDelete() {
        let checkedNum = this.$store.getters.getCheckedNum;
        if (!checkedNum) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的商品'
          });
        } else {
          this.$confirm('确定删除所选商品吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let checkedItems = this.$store.getters.getCheckedItem;
            this.deleteCartItem({
              checkedItems: checkedItems
            });
            for (var i = 0; i < checkedItems.length; i++) {
              this.$axios
                .get(this.$target + '/api/cart/delete?id=' + checkedItems[i].cartid)
                .then(res => {
                  // console.log("response:" + JSON.stringify(res.data));
                  if (!res.data.errno) {
                    this.$message({
                      type: 'success',
                      message: '删除成功'
                    });
                  } else {
                    this.$message({
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
          }).catch(() => {});
        }
      },
      updateCart(index) {
        // console.log("cartid:" + this.products[index].cartid + ",this.products[index].args:" + this.products[index]
        //   .args + ",this.products[index].price:" + this.products[index].price + ",this.products[index].count:" +
        //   this.products[index].count + ",this.products[index].ttprice:" + this.products[index].ttprice);
        this.$axios
          .post(this.$target + '/api/cart/update?id=' + this.products[index].cartid, {
            args: this.products[index].args,
            price: this.products[index].price,
            count: this.products[index].count,
            ttprice: this.products[index].ttprice
          })
          .then(res => {
            // console.log("response:" + JSON.stringify(res.data));
            // if (!res.data.errno) {} else {
            //   this.$message({
            //     message: '操作失败，请稍后再试',
            //     type: 'error'
            //   });
            // }
            // location.reload();
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/shoppingCart.css';

  .el-dropdown {
    display: block;
    margin-bottom: 12px;
  }

  .el-dropdown-link {
    cursor: pointer;
    border: 1px solid lightgray;
    padding: 2px;
    border-radius: 5px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
