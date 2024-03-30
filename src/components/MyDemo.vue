<template>

  <div class="my-menu-container">

    <div>{{hello1}}</div>

    <div v-for="item in items" v-bind:item="item" v-bind:key="item.id" :style="{fontSize: postFontSize + 'px'}">

      <p>id：{{item.id}}</p>
      <p>标题：{{item.title}}</p>
      <p>作者：{{item.author}}</p>

    </div>

    <button v-on:click="$emit('enlarge-text',2)">增大字号</button>

  </div>

</template>

<script>

  export default{
    props: ["items"],
    name: "myDemo",
    data(){
      return{
        hello1: "MyMenu Hello World",
        postFontSize: 18
      }
    },

    created(){
      console.log("val:" + this.$data.hello1);
    },

    methods:{


    }
  }

</script>

<style>
</style>
