<template>
  <div class="myMenu" id="myMenu">
    <ul>
      <li v-for="item in val" :key="item" :class="activeClass == item? 'active': ''" @mouseover="mouseover($event,item)">
        <router-link to>
          <slot :name="item"></slot>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    props: ["val"],
    name: "myMenu",
    data(){
      return{
        activeClass: 1
      }
    },
    methods: {
      mouseover:function(e,val){
        this.activeClass = val;
      }
    },
    watch:{
      activeClass: function(val){
        this.$emit("fromChild",val);
      }
    }
  }
</script>

<style scoped>
  .myMenu ul li{
    float: left;
    margin-left: 15px;
    line-height: 30px;
  }
  .myMenu ul li a{
    color: black;
  }
  .myMenu ul li.active a{
    color: red;
  }
  .myMenu ul li.active{
    border-bottom: 2px solid red;
  }
</style>
