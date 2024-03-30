<template>

  <div class="container">

    <div>{{hello}}</div>

    <div>

      <myMenu :val="val" v-on:enlarge-text="onEnLargeText" ref="myMenu"></myMenu>

    </div>
    
    <div>
      
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
      
    </div>

  </div>

</template>

<script>
  import myMenu from '@/components/MyMenu.vue'

  export default {
    components: {
      myMenu
    },
    data() {
      return {
        hello: "Hello World",
        val: [{
          "id": 1,
          "title": "标题1",
          "author": "作者1"
        },{
          "id": 2,
          "title": "标题2",
          "author": "作者2"
        },{
          "id": 3,
          "title": "标题3",
          "author": "作者3"
        }, ]
      }
    },

    created(){
      console.log("$refs:" + JSON.stringify(this.$refs.myMenu));
    },

    methods: {
      onEnLargeText:function(enlargeAmount){
        console.log("enlargeAmount:" + enlargeAmount + ",this.$refs.myMenu.postFontSize:" + this.$refs.myMenu.postFontSize);
        let postFontSize = this.$refs.myMenu.postFontSize;
        postFontSize += enlargeAmount;
        console.log("after,postFontSize:" + postFontSize);
        this.$refs.myMenu.postFontSize = postFontSize;
      },

    }
  }
</script>

<style>
</style>
