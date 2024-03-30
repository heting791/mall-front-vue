<template>

  <div id="prolist">

    <div class="position">
      <span>当前位置：</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="activeName!=-1">全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="word">搜索结果</el-breadcrumb-item>
        <el-breadcrumb-item v-if="favorites">我的收藏</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="nav">
      <div class="product-nav">
        <div class="product-nav-title">分类</div>
        <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
          <el-tab-pane v-for="item in categoryList" :key="item.name" :label="item.name" :name="item.name"></el-tab-pane>
        </el-tabs>
        <div v-if="word" style="margin: 5px 0 30px 0;">搜索 <span style="font-weight: bolder;font-size: 19px;color: red;">{{keyword}}</span> 共 <span style="font-weight: bolder;font-size: 19px;color: red;">{{total}}</span> 条结果</div>
      </div>
    </div>

    <div class="pro-list">
      <myList :list="productList" all="true" :start="start" :end="end"></myList>
    </div>

    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="currentChange"
        :hide-on-single-page="hide" :small="small">
      </el-pagination>
    </div>

  </div>

</template>

<script>
  import myList from '@/components/MyList.vue'

  export default {
    components: {
      myList
    },
    data() {
      return {
        categoryList: "",

        activeName: -1,

        productList: "",

        word: false,
        favorites: false,
        keyword: "",

        hide: true,
        small: "",
        total: "",
        pageSize: 12,
        currentPage: 1,
        totalPage: "",
        start: 0,
        end: 12
      }
    },
    created() {
      console.log("proList");
      // console.log("fullpath:", this.$route.fullPath);
      if (this.$route.query.fav) {
        this.activeName = -1;
        this.favorites = true;
        this.word = false;
        var url = this.$target + '/api/fav/list?userid='+ JSON.parse(localStorage.getItem("user")).id;
        console.log("url:" + url);
        this.$axios
          .get(url)
          .then(res => {
            console.log("response:" + JSON.stringify(res.data.data));
            this.productList = res.data.data;
            this.paging(this.productList);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else if (this.$route.query.keyword && this.$route.query.keyword != null) {
        this.activeName = -1;
        this.word = true;
        this.favorites = false
        var keyword = this.$route.query.keyword;
        this.keyword = this.$route.query.keyword;
        this.$axios
          .get(this.$target + '/api/products/list?keyword=' + keyword)
          .then(res => {
            // console.log("response:" + JSON.stringify(res.data.data));
            this.productList = res.data.data;
            this.paging(this.productList);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else if (this.$route.query.category) {
        // console.log("category:", this.$route.query.category);
        this.activeName = this.$route.query.category;
        this.word = false;
        this.favorites = false;

        this.getCateProList(this.activeName, 'productList');
      }
      this.$axios
        .get(this.$target + '/api/category/list')
        .then(res => {
          console.log("response:" + JSON.stringify(res.data.data));
          var result = res.data.data;
          console.log("result:" + JSON.stringify(result));
          // for(var i = 0; i < result; i++){
          //   console.log("i:" + i + ",result[i]:" + result[i]);
          //   this.categoryList.push(result[i]);
          // }
          this.categoryList = result;
          var object = {
            id: 0,
            name: "全部"
          };
          this.categoryList.unshift(object);
        })
        .catch(err => {
          return Promise.reject(err);
        });
        this.checkFav();
    },

    activated() {
      console.log("组件更新");
      this.activeName = "-1";
      console.log("this.$route.query.keyword:" + this.$route.query.keyword);
      console.log("this.$route.query.category:" + this.$route.query.category);
      if (this.$route.query.keyword && this.$route.query.keyword != null) {
        this.activeName = -1;
        this.favorites = false;
        this.word = true;
        var keyword = this.$route.query.keyword;
        this.keyword = this.$route.query.keyword;
        this.$axios
          .get(this.$target + '/api/products/list?keyword=' + keyword)
          .then(res => {
            // console.log("response:" + JSON.stringify(res.data.data));
            this.productList = res.data.data;
            this.paging(this.productList);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else if (this.$route.query.category) {
        // console.log("category:", this.$route.query.category);
        this.activeName = this.$route.query.category;
        this.favorites = false;
        this.word = false;

        this.getCateProList(this.activeName, 'productList');

        this.backtop();
      }
      this.checkFav();
    },

    watch: {
      activeName: function(val) {
        console.log("activeName:" + val);
        if (val != -1) {
          this.total = 0;
          this.currentPage = 1;
          this.start = 0;
          this.end = 12;
          this.getCateProList(val, 'productList');
          this.$router.push({
            path: "/proList",
            query: {
              category: this.activeName
            }
          })
        }
      },

      $route: {
        handler: (val, oldVal) => {
          console.log(val.query);
        },
        immediate: true,
      },
    },

    methods: {

      getCateProList(categoryName, val) {
        if (this.activeName == "全部") {
          this.$axios
            .get(this.$target + '/api/products/list')
            .then(res => {
              // console.log("response:" + JSON.stringify(res.data.data));
              var temp = res.data.data;
              this[val] = temp.reverse();
              this.paging(this[val]);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          this.$axios
            .get(this.$target + '/api/products/list?category=' + categoryName)
            .then(res => {
              // console.log(categoryName + ",response:" + JSON.stringify(res.data.data));
              this[val] = res.data.data;
              this.paging(this[val]);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }
      },

      paging(data) {
        console.log("data-length:" + data.length + ",totalPage:" + parseInt((data.length) / this.pageSize));
        this.total = data.length;
        console.log("total:" + this.total);
        this.totalPage = parseInt((data.length) / this.pageSize);
        if (this.totalPage <= 10) {
          this.small = true;
        } else {
          this.small = false;
        }
      },

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

      currentChange(currentPage) {
        console.log("currentPage:" + currentPage);
        this.start = this.pageSize * (currentPage - 1) + 1;
        this.end = this.start + this.pageSize;
        this.backtop();
      },

      tabChange() {
        this.favorites = false;
        this.word = false;
      },

      checkFav() {
        if (this.favorites) {
          if (!localStorage.getItem("user")) {
            this.$message({
              message: '未登录，请先登录',
              type: 'warning'
            });
            this.$router.push({
              path: '/'
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  #prolist .position,
  #prolist .nav .product-nav-title {
    text-align: left;
  }

  #prolist .position span {
    font-size: 14px;
    line-height: 2;
  }

  #prolist .nav .product-nav-title,
  #prolist .el-tabs {
    display: inline-block;
    vertical-align: top;
  }

  #prolist .nav .product-nav-title {
    width: 70px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    font-weight: bolder;
    border-bottom: 1px solid lightgray;
    margin-right: -5px;
  }

  #prolist .position .el-breadcrumb {
    display: inline-block;
    vertical-align: top;
  }
</style>
