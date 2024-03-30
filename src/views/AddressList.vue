<template>
  <div id="addressList" class="address-list-container">
    <div class="address-list-title">
      <p>收货地址</p>
    </div>
    <div class="new-address">
      <div class="new-address-title">
        <p style="color: red;" v-if="!edit">新增收货地址</p>
        <p style="color: white;background-color: red;width: 200px;padding-left: 10px" v-else>编辑收货地址</p>
      </div>
      <div style="width: 100%;margin: 10px auto;text-align: left;">
        <addressEdit :address="address" :edit="edit" :id="id" @fromChild="changeEdit"></addressEdit>
      </div>
    </div>
    <div class="address-list">
      <table>
        <tr>
          <th>收货人</th>
          <th>所在地区</th>
          <th>详细地址</th>
          <th>电话/手机</th>
          <th>操作</th>
          <th></th>
        </tr>
        <tr v-for="item in addressList" :key="item.id" v-if="item.defaultad">
          <td>{{item.name}}</td>
          <td>{{item.area}}</td>
          <td>{{item.deatailad}}</td>
          <td>{{item.phone}}</td>
          <td><span @click="goEdit(item.id)">修改</span> | <span @click="goDel(item.id)">删除</span></td>
          <td>
            <div class="default-address">默认地址</div>
          </td>
        </tr>
        <tr v-for="item in addressList" :key="item.id" v-if="!item.defaultad">
          <td>{{item.name}}</td>
          <td>{{item.area}}</td>
          <td>{{item.deatailad}}</td>
          <td>{{item.phone}}</td>
          <td><span @click="goEdit(item.id)">修改</span> | <span @click="goDel(item.id)">删除</span></td>
        </tr>
        <!-- <tr> -->
          <div v-if="!addressList.length" style="width: 100%;height: 40px;line-height: 40px;padding-left: 500%;">暂无数据</div>
        <!-- </tr> -->
      </table>
    </div>
  </div>
</template>

<script>
  import addressEdit from '@/components/AddressEdit.vue'
  import {
    mapActions
  } from 'vuex';
  import {
    mapGetters
  } from 'vuex'
  export default {
    components: {
      addressEdit
    },
    data() {
      return {
        addressList: "",
        id: "",
        edit: false,
        address: {
          phoneprefix: '中国大陆 +86'
        }
      }
    },
    computed: {
      ...mapGetters(["getUser"])
    },
    created() {
      if (localStorage.getItem("user")) {
        var user = JSON.parse(localStorage.getItem("user"));
        var userid = user.id;
        this.$axios
          .get(this.$target + '/api/address/list?userid=' + userid)
          .then(res => {
            // console.log("response:" + JSON.stringify(res.data.data));
            this.addressList = res.data.data;
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else {
        this.$message({
          message: '未登录，请先登录',
          type: 'warning'
        });
        this.$router.push({
          path: "/"
        });
      }

    },
    methods: {
      backtop() {
        const timer = setInterval(function() {
          const top = document.documentElement.scrollTop || document.body.scrollTop;
          const speed = Math.floor(-top / 5);
          document.documentElement.scrollTop = document.body.scrollTop =
            top + speed;

          if (top === 0) {
            clearInterval(timer);
          }
        }, 20);
      },
      changeEdit() {
        this.address = {};
        this.edit = false;
        this.id = "";
      },
      goEdit(id){
        this.edit = true;
        this.id = id;
        this.$axios
        .get(this.$target + '/api/address/goEdit?id=' + id)
        .then(res => {
          // console.log("response:" + JSON.stringify(res.data.data));
          this.address = res.data.data;
          this.backtop();
        })
        .catch(err => {
          return Promise.reject(err);
        });
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
      }
    }
  }
</script>

<style scoped>
  .address-list-container {
    width: 80%;
    margin: 10px auto;
  }

  .address-list-container .new-address {
    margin-bottom: 50px;
  }

  .address-list-container .address-list {
    width: 100%;
    margin: 20px auto;
  }

  .address-list-container .address-list table {
    width: 100%;
    font-size: 15px;
    border: 1px solid whitesmoke;
  }

  .address-list-container .address-list table td {
    font-size: 13px;
  }

  .address-list-container .address-list table tr {
    height: 50px;
  }

  .address-list-container .address-list table tr:hover {
    background-color: #F2F3F7;
  }

  .address-list-container .address-list table tr:first-child {
    height: 30px;
  }

  .address-list-container .address-list th {
    border: 1px solid whitesmoke;
    background-color: #EBECF0;
  }

  .default-address {
    border: 1px solid red;
    width: 78%;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    color: red;
    background-color: #FFD6CC;
    margin: auto;
  }

  .address-list-container .address-list th,
  .address-list-container .address-list td {
    width: 19%;
  }

  .address-list-container .address-list table tr th:first-child,
  .address-list-container .address-list table tr td:first-child {
    width: 8%;
  }

  .address-list-container .address-list table tr th:nth-child(5),
  .address-list-container .address-list table tr td:nth-child(5),
  .address-list-container .address-list table tr th:nth-child(6),
  .address-list-container .address-list table tr td:nth-child(6) {
    width: 10%;
  }

  .address-list-container .address-list table tr th:nth-child(3),
  .address-list-container .address-list table tr td:nth-child(3) {
    width: 25%;
  }

  .address-list-container .address-list table tr td:nth-child(5) span:hover,
  .address-list-container .address-list table tr td:nth-child(6):hover {
    color: red;
  }

  .new-address-title,
  .address-list-title {
    text-align: left;
    font-size: 15px;
  }

  .address-list-title {
    background-color: #F3F8FE;
    color: rgb(1, 77, 127);
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }

  tr td span{
    cursor: pointer;
  }
</style>
