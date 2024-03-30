import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Demo from '@/views/Demo'
import Details from '@/views/Details'
import ShoppingCart from '@/views/ShoppingCart'
import OrderConfirm from '@/views/OrderConfirm'
import ProList from '@/views/ProList'
import AddressList from '@/views/AddressList'
import OrderList from '@/views/OrderList'
import OrderDetails from '@/views/OrderDetails'
import JudgeEdit from '@/views/judgeEdit'
import About from '@/views/About'
import MyLogin from '@/components/MyLogin'
import MyRegister from '@/components/MyRegister'
import MyMenu from '@/components/MyMenu'
import MyList from '@/components/MyList'
import MyDemo from '@/components/MyDemo'
import AddressEdit from '@/components/AddressEdit'
import PersonalCenter from '@/components/PersonalCenter'
import New from '@/views/New'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/shoppingCart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/proList',
      name: 'ProList',
      component: ProList
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: AddressList
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: OrderDetails
    },
    {
      path: '/judgeEdit',
      name: 'judgeEdit',
      component: JudgeEdit
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
