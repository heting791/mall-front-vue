<template>

  <div class="container">

    <div class="block">
      <el-carousel height="435px" indicator-position="outside">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <!-- <router-link :to="{path: ''}"> -->
            <img :src="item.image" />
          <!-- </router-link> -->
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="display: none;">
      <img :src="testImage" style="max-width: 200px;" />
    </div>

    <div class="main-box">
      <div class="main">
        <div class="phone">
          <div class="box-hd">
            <div class="title">手机</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link :to="{path: '/details'}">
                <div>
                  <img />
                </div>
              </router-link>
            </div>
            <div class="list">
              <myList :list="phoneList" cate='手机' :all="all" :start="start" :end="end"></myList>
            </div>
          </div>
        </div>

        <div class="phone">
          <div class="box-hd">
            <div class="title">家电</div>
            <div class="cmore" id="cmore">
              <myMenu :val="2" @fromChild="getChildMsg">
                <span slot="1">热门</span>
                <span slot="2">电视影音</span>
              </myMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <div>
                  <img />
                </div>
              </router-link>
            </div>
            <div class="list">
              <myList :list="applianceList" :cate="applianceCate" :all="all" :start="start" :end="end"></myList>
            </div>
          </div>
        </div>

        <div class="phone">
          <div class="box-hd">
            <div class="title">配件</div>
            <div class="cmore" id="cmore">
              <myMenu :val="2" @fromChild="getChildMsg2">
                <span slot="1">保护套</span>
                <span slot="2">充电器</span>
              </myMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <div>
                  <img />
                </div>
              </router-link>
            </div>
            <div class="list">
              <myList :list="attachmentList" :cate="attachmentCate" :all="all" :start="start" :end="end"></myList>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
  import myList from '@/components/MyList.vue'
  import myMenu from '@/components/MyMenu.vue'

  export default {
    components: {
      myList,
      myMenu,
    },
    data() {
      return {
        activeIndex: 0,
        phoneList: "",
        applianceList: "",
        attachmentList: "",
        applianceActive: 1,
        attachmentActive: 1,
        applianceCate: "热门家电",
        attachmentCate: "保护套",
        all: 0,
        start: 0,
        end: 7,
        testImage: "",
        banner: [{
          id: 1,
          image: "static/uploads/banner/banner1.jpg"
        },{
          id: 2,
          image: "static/uploads/banner/banner2.jpg"
        },{
          id: 3,
          image: "static/uploads/banner/banner3.jpg"
        },{
          id: 4,
          image: "static/uploads/banner/banner4.jpg"
        }]
        // defaultPhoneList: [{
        //   product_id: 1,
        //   product_name: "手机1",
        //   product_title: "手机1 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 2,
        //   product_name: "手机2",
        //   product_title: "手机2 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 3,
        //   product_name: "手机3",
        //   product_title: "手机3 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 4,
        //   product_name: "手机4",
        //   product_title: "手机4 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 5,
        //   product_name: "手机5",
        //   product_title: "手机5 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 6,
        //   product_name: "手机6",
        //   product_title: "手机6 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 7,
        //   product_name: "手机7",
        //   product_title: "手机7 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }],
        // defaultApplianceList: [{
        //   product_id: 1,
        //   product_name: "家电1",
        //   product_title: "家电1 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 2,
        //   product_name: "家电2",
        //   product_title: "家电2 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 3,
        //   product_name: "家电3",
        //   product_title: "家电3 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 4,
        //   product_name: "家电4",
        //   product_title: "家电4 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 5,
        //   product_name: "家电5",
        //   product_title: "家电5 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 6,
        //   product_name: "家电6",
        //   product_title: "家电6 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 7,
        //   product_name: "家电7",
        //   product_title: "家电7 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }],
        // miTvList: [{
        //   product_id: 1,
        //   product_name: "家电8",
        //   product_title: "家电8 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 2,
        //   product_name: "家电9",
        //   product_title: "家电9 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 3,
        //   product_name: "家电10",
        //   product_title: "家电10 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 4,
        //   product_name: "家电11",
        //   product_title: "家电11 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 5,
        //   product_name: "家电12",
        //   product_title: "家电12 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 6,
        //   product_name: "家电13",
        //   product_title: "家电13 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 7,
        //   product_name: "家电14",
        //   product_title: "家电14 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }],
        // defaultAttachmentList: [{
        //   product_id: 1,
        //   product_name: "配件1",
        //   product_title: "配件1 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 2,
        //   product_name: "配件2",
        //   product_title: "配件2 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 3,
        //   product_name: "配件3",
        //   product_title: "配件3 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 4,
        //   product_name: "配件4",
        //   product_title: "配件4 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 5,
        //   product_name: "配件5",
        //   product_title: "配件5 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 6,
        //   product_name: "配件6",
        //   product_title: "配件6 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 7,
        //   product_name: "配件7",
        //   product_title: "配件7 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }],
        // protectingShellList: [{
        //   product_id: 1,
        //   product_name: "配件8",
        //   product_title: "配件8 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 2,
        //   product_name: "配件9",
        //   product_title: "配件9 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 3,
        //   product_name: "配件10",
        //   product_title: "配件10 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 4,
        //   product_name: "配件11",
        //   product_title: "配件11 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 5,
        //   product_name: "配件12",
        //   product_title: "配件12 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 6,
        //   product_name: "配件13",
        //   product_title: "配件13 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 7,
        //   product_name: "配件14",
        //   product_title: "配件14 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }],
        // chargerList: [{
        //   product_id: 1,
        //   product_name: "配件15",
        //   product_title: "配件15 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 2,
        //   product_name: "配件16",
        //   product_title: "配件16 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 3,
        //   product_name: "配件17",
        //   product_title: "配件17 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 4,
        //   product_name: "配件18",
        //   product_title: "配件18 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 5,
        //   product_name: "配件19",
        //   product_title: "配件19 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 6,
        //   product_name: "配件20",
        //   product_title: "配件20 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }, {
        //   product_id: 7,
        //   product_name: "配件21",
        //   product_title: "配件21 title",
        //   product_selling_price: 3000,
        //   product_price: 3499
        // }]
      }
    },
    watch: {
      applianceActive: function(val) {
        if (this.applianceList == "") {}
        if (val == 1) {
          this.getCateProList('热门家电', 'applianceList');
          this.applianceCate = '热门家电';
          return;
        }
        if (val == 2) {
          this.getCateProList('电视影音', 'applianceList');
          this.applianceCate = '电视影音';
        }
      },
      attachmentActive: function(val) {
        if (this.attachmentList == "") {}
        if (val == 1) {
          this.getCateProList('保护套', 'attachmentList');
          this.attachmentCate = "保护套";
          return;
        }
        if (val == 2) {
          this.getCateProList('充电器', 'attachmentList');
          this.attachmentCate = "充电器";
          return;
        }
      }
    },
    created() {
      // this.$axios.get(this.$target + '/api/products/list?category=').then((response) => {
      //   console.log("response:" + JSON.stringify(response));
      // }).catch(err => {
      //   return Promise.reject(err);
      // });
      this.getCateProList('手机', 'phoneList');
      this.getCateProList('热门家电', 'applianceList');
      this.getCateProList('保护套', 'attachmentList');

      // this.$axios
      //   .get('http://localhost:8888/api/products/getImage?id=23')
      //   .then(res => {
      //   	// console.log("test-response:" + JSON.stringify(res.data));
      //     this.testImage = 'data:image/png;base64,' + res.data.message;
      //     console.log("testImage:" + JSON.stringify(this.testImage));
      //   })
      //   .catch(err => {
      //   	return Promise.reject(err);
      //   });
    },

    methods: {
      getChildMsg(val) {
        this.applianceActive = val;
      },
      getChildMsg2(val) {
        this.attachmentActive = val;
      },
      getCateProList(categoryName, val) {
        this.$axios
          .get(this.$target + '/api/products/list?category=' + categoryName)
          .then(res => {
          	// console.log(categoryName +  ",response:" + JSON.stringify(res.data.data));
            this[val] = res.data.data;
          })
          .catch(err => {
          	return Promise.reject(err);
          });
          // console.log("1-phoneList:", JSON.stringify(this.phoneList));
          // console.log("1-defaultApplianceList:", JSON.stringify(this.defaultApplianceList));
      }
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item img {
    width: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .main {
    background-color: whitesmoke;
  }

  .main .box-hd {
    width: 86%;
    height: 50px;
    line-height: 58px;
    margin: 10px auto;
  }

  .main .title {
    font-size: 22px;
    font-weight: 200;
    float: left;
    line-height: 58px;
    color: #333;
    margin-left: 20px;
  }

  .main .cmore {
    float: right;
  }

  .phone {
    margin-bottom: 20px;
  }
</style>
