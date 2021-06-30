import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home/Home.vue';
import Product from '../pages/product/Product.vue';
import Cart from '../pages/cart/Cart.vue';
import Blog from '../pages/blog/Blog.vue';
import Promotion from '../pages/promotion/Promotion.vue';
import ProductDetail from '../pages/productdetail/ProductDetail.vue';
const routes = [
  {path:'/',component:Home},
  {path:'/product',component:Product},
  {path:'/cart',component:Cart},
  {path:'/products/:id',component:ProductDetail},
  {path:'/promotion',component:Promotion},
  {path:'/blog',component:Blog},
  
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },    
  routes,
})

export default router
