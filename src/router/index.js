import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        path: "/",
        redirect: "home"
      },
      {
        path: "home",
        component: () => import("../views/home/HomeIndex.vue")
      },
      {
        path: "category/:id",
        component: () => import("../views/category/Category.vue")
      },
      {
        path: "category/sub/:id",
        component: () => import("../views/category/GoodsChoose.vue")
      },
      {
        path:"product/:id",
        component:() => import("../views/product/Product.vue")
      },
      {
        path:"cart",
        component:() => import("../views/cart/Cart.vue")
      },
      {
        path:"member",
        component:() => import("../views/myself/Myself.vue"),
        children:[
          {
            path:"/",
            redirect:"personal"
          },
          {
            path:"personal",
            component:() => import("../views/myself/Personal.vue")
          },
          {
            path:"order",
            component:() => import("../views/myself/Order.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    component: () => import("../views/login/Login.vue")

  }
]
// 路由重复跳转处理
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
