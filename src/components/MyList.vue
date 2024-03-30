<template>

  <div id="myList" class="myList">

    <ul>
      <!-- <div v-if="!all"> -->
      <li v-for="item in list.slice(start,end)" :item="item" :key="item.product_id">
        <router-link :to="{path: '/details', query: {productid: item.id} }">
          <img :src="item.image" />
          <h2><span
              style="color: red;font-weight: bolder;font-size: 25px;">{{item.id}}-</span>{{item.title}}
          </h2>
          <h3>{{item.brand}}</h3>
          <p>
            <span class="org-price">{{item.price}}元</span>
            <span v-show="item.oprice != item.price" class="del">{{item.oprice}}元</span>
          </p>
        </router-link>
      </li>
      <li v-show="list.length>1" id="more" v-if="!all">
        <router-link :to="{path: '/proList', query: {category: this.cate} }">
          浏览更多
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </li>
      <el-empty :image-size="200" v-if="!list.length"></el-empty>
      <!-- </div> -->
      <!-- <li v-for="item in list" v-else :item="item" :key="item.product_id">
        <router-link :to="{path: '/details', query: {productid: item.id} }">
          <img :src="item.image" />
          <h2>{{item.title}}</h2>
          <h3>{{item.brand}}</h3>
          <p>
            <span class="org-price">{{item.price}}元</span>
            <span v-show="item.oprice != item.price" class="del">{{item.price}}元</span>
          </p>
        </router-link>
      </li> -->
    </ul>

  </div>

</template>

<script>
  export default {
    name: "myList",
    props: ["list", "all", "cate", "start", "end"],

    created() {
      console.log("list:", this.list);
      // console.log("all:" + this.all + ",!all:" + !(this.all));

    },
    watch: {
      list: function(val) {

      }
    }
  }
</script>

<style scoped>
  .myList ul {
    margin: 0;
    padding: 0;
  }

  .myList ul li {
    display: inline-block;
    vertical-align: top;
    width: 234px;
    height: 280px;
    padding: 10px 0;
    margin: 0 0 14.5px 13.7px;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    position: relative;
    background-color: white;
  }

  .myList ul li:hover {
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }

  .myList ul li img {
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }

  .myList ul li h2 {
    margin: 25px 10px 0;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .myList ul li h3 {
    display: none;
    margin: 5px 10px;
    height: 18px;
    font-size: 12px;
    font-weight: 400;
    color: #b0b0b0;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .myList ul li span {
    color: black;
  }

  .myList .org-price {
    font-weight: bolder;
    color: red;
  }

  .myList .del {
    color: #b0b0b0;
    text-decoration: line-through;
    margin-left: 5px;
  }

  .myList #more {
    line-height: 300px;
  }

  .myList #more a {
    color: black;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>