<template>
  <div id="about">
    <h1 style="text-align: center;">小米商城在线购物演示系统（PC端，客户端）说明</h1>
    <p style="text-align: center;"><strong>声明：</strong>本系统仅作交流学习使用，不用于任何商业盈利</p>
    <h3>基本信息</h3>
    <p><strong>系统版本：</strong>v1.0.0</p>
    <p><strong>前端：</strong></p>
    <ul>
      <li><strong>技术栈：</strong>Vue 2.5.2、&emsp;Vuex 3.6.2、&emsp;Vue Router 3.0.1</li>
      <li><strong>框架：</strong>element-ui 2.9.2、&emsp;Axios 1.5.0</li>
    </ul>
    <p><strong>后端：</strong></p>
    <ul>
      <li><strong>技术栈：</strong>node.js</li>
      <li><strong>框架：</strong>无</li>
    </ul>
    <p><strong>数据库：</strong>MYSQL 5.7.26</p>
    <h3>系统功能</h3>
    <table>
      <tr>
        <th>分类</th>
        <th>功能</th>
        <th>备注</th>
      </tr>
      <tr>
        <td rowspan="5" class="bg">用户</td>
        <td class="bg">登录</td>
        <td rowspan="5" class="bg"></td>
      </tr>
      <tr>
        <td class="bg">注册</td>
      </tr>
      <tr>
        <td class="bg">退出登录</td>
      </tr>
      <tr>
        <td class="bg">切换账号</td>
      </tr>
      <tr>
        <td class="bg">个人中心</td>
      </tr>
      <tr>
        <td rowspan="3">商品</td>
        <td>（按分类）浏览商品</td>
        <td rowspan="3"></td>
      </tr>
      <tr>
        <td>查看商品详情</td>
      </tr>
      <tr>
        <td>按关键字搜索商品</td>
      </tr>
      <tr>
        <td rowspan="3" class="bg">收藏</td>
        <td class="bg">查看收藏商品列表</td>
        <td rowspan="3" class="bg"></td>
      </tr>
      <tr>
        <td class="bg">将商品加入收藏</td>
      </tr>
      <tr>
        <td class="bg">取消收藏商品</td>
      </tr>
      <tr>
        <td rowspan="4">收货地址</td>
        <td>查看已保存的收货地址列表</td>
        <td rowspan="4"></td>
      </tr>
      <tr>
        <td>新增收货地址</td>
      </tr>
      <tr>
        <td>修改收货地址信息</td>
      </tr>
      <tr>
        <td>删除收货地址</td>
      </tr>
      <tr>
        <td rowspan="5" class="bg">购物车</td>
        <td class="bg">查看购物车商品列表</td>
        <td rowspan="5" class="bg"></td>
      </tr>
      <tr>
        <td class="bg">将商品加入购物车</td>
      </tr>
      <tr>
        <td class="bg">修改购物车商品信息（参数、数量）</td>
      </tr>
      <tr>
        <td class="bg">删除购物车商品（单个删除、批量删除）</td>
      </tr>
      <tr>
        <td class="bg">购买购物车中选中的商品</td>
      </tr>
      <tr>
        <td rowspan="5">订单</td>
        <td>查看订单列表</td>
        <td rowspan="5">
          1.关于创建订单的时间及订单编号规则：在商品详情页选择商品参数后点击“立即购买” 或 购物车页面选择商品后点击“去结算”按钮后 创建订单，订单状态为待支付，订单编号为 订单创建时间（普通日期时间格式）+ 用户名 + 商品编号，订单编号长度不固定<br /><br />
          2.订单状态：待付款 -> 待发货 -> 待收货 -> 待评价 -> 已完成
        </td>
      </tr>
      <tr>
        <td>查看订单详情</td>
      </tr>
      <tr>
        <td>修改订单信息（仅针对未支付的订单）</td>
      </tr>
      <tr>
        <td>创建订单</td>
      </tr>
      <tr>
        <td>修改订单状态</td>
      </tr>
    </table>

    <!-- <table border="1">
      <tbody>
        <tr>
          <th colspan="2">我是占位符1</th>
          <th colspan="2">我是占位符2</th>
        </tr>
        <tr>
          <th rowspan="2">我是占位符3</th>
          <th>我是占位符4</th>
          <th>我是占位符5</th>
          <th>我是占位符6</th>
        </tr>
        <tr>
          <th>我是占位符7</th>
          <th>我是占位符8</th>

          <th>我是占位符9</th>
        </tr>
      </tbody>

    </table> -->

    <h3>遗留问题</h3>
    <ul>
      <li>商品评价功能</li>
    </ul>
  </div>
</template>

<script>
</script>

<style>
  #about {
    text-align: left;
  }

  #about ul li {
    line-height: 30px;
  }

  #about table {
    width: 100%;
    border: 1px solid gray;
    text-align: center;
  }

  #about table th,
  #about table td {
    width: 33.3%;
    border: 1px solid gray;
  }

  #about .bg {
    background-color: whitesmoke;
  }
</style>
