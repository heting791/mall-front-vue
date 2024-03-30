<template>
  <div id="judgeEdit">
    <div class="judgeEdit">
      <el-alert title="商品评价功能正在开发中,敬请期待" type="error" effect="dark" show-icon style="width: 300px;height: 50px;margin-left: 45%;margin-bottom: 20px;">
      </el-alert>
      <div class="inner">
        <div class="product-info">
          <div class="product-img">
            <img :src="order.image" />
          </div>
          <div class="product-text">
            <div class="text-title">
              {{order.title}}
            </div>
            <div class="text-other">
              <div class="text-price">
                <span>实付：</span><span class="price">￥{{order.ttprice}}</span>
              </div>
              <div class="text-delivery">
                <span>配送：</span><span>快递 0.00</span>
              </div>
              <div class="text-options">
                <span>参数：</span>
                <ul>
                  <li v-for="item in order.argsList">
                    <!-- <span>【颜色】：</span> -->
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="judge-details">
          <el-form>
            <el-form-item label="综合评分:">
              <el-rate v-model="value" show-text>
              </el-rate>
            </el-form-item>
            <div class="details-content">
              <div class="content-inner">
                <el-form-item>
                  <textarea></textarea>
                </el-form-item>

                <el-form-item>
                  <el-upload list-type="picture-card" multiple :auto-upload="false" :on-change="handleChange">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <!-- <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in"></i>
                        </span> -->
                        <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="el-icon-download"></i>
                        </span> -->
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
                <!-- <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog> -->
              </div>
            </div>
            <div class="submit">
              <el-button type="danger" @click="submitFiles()">提交评价</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        order: ""
      }
    },
    created() {
      // this.$axios
      //   .get('http://localhost:8888/api/user/uploads')
      //   .then((response) => {
      //     console.log("response:" + JSON.stringify(response));
      //   })
      //   .catch(err => {
      //     return Promise.reject(err);
      //   })

      let orderid = this.$route.query.id;
      this.$axios
        .get(this.$target + '/api/order/details?id=' + orderid)
        .then(res => {
          console.log("response:" + JSON.stringify(res.data.data));
          this.order = res.data.data[0];
          let argsList = this.order.args.split(",");
          this.order.argsList = argsList;
        })
        .catch(err => {
          return Promise.reject(err);
        });

    },
    methods: {
      handleRemove(file) {
        console.log("file:" + JSON.stringify(file));
      },
      handleChange(file, fileList) {
        console.log("fileList:", JSON.stringify(fileList));
      }
    }
  }
</script>

<style scoped>
  #judgeEdit .judgeEdit .inner {
    text-align: left;
  }

  .product-info {
    margin-bottom: 20px;
  }

  .product-info .product-img,
  .product-info .product-text {
    display: inline-block;
    vertical-align: top;
    width: 49%;
  }

  .product-img {
    text-align: right;
  }

  .product-img img {
    width: 400px;
    height: 400px;
    padding-right: 30px;
  }

  .product-info .product-text .text-title {
    font-weight: bolder;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 25px;
  }

  .product-info .product-text .text-other {
    font-size: 13px;
    color: gray;
  }

  .product-info .product-text .text-other div {
    margin: 25px 0;
  }

  .product-info .product-text .text-other span {
    margin-right: 15px;
  }

  .price {
    font-size: 20px;
    font-weight: bolder;
    color: red;
  }

  .product-info .product-text .text-other .text-options ul {
    margin: 0;
    padding: 0 15px;
    display: inline-block;
    vertical-align: top;
    line-height: 30px;
    background-color: whitesmoke;
    color: black;
    border: 1px solid lightgray;
    text-align: center;
  }

  .judge-details {
    border: 1px solid lightgray;
    width: 55%;
    padding: 20px;
    background-color: whitesmoke;
    margin: 0 auto;
  }

  .judge-details .details-rate {
    margin-bottom: 10px;
  }

  .judge-details .details-rate span {
    font-weight: bolder;
    font-size: 13px;
  }

  .judge-details .details-rate .el-rate {
    display: inline-block;
  }

  .details-content textarea {
    width: calc(100% - 20px);
    height: 150px;
    margin-bottom: 10px;
  }

  .submit {
    width: 150px;
    margin: 20px auto;
  }

  .el-button {
    width: 100%;
  }
</style>
