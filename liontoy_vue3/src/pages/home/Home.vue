<template>
  <div class="hero">
    <img style="display:none" src="../../assets/images/1.jpg" alt="" />
    <div class="left">
      <div class="left_text">
        <h1>THE WIDEST RANGE OF TOY</h1>
        <h1>& ACCESSORIES</h1>
        <small>We help you choose the best toys for your kid</small>
        <div class="butt">
          <img src="../../assets/images/button.webp" alt="" />
          <router-link to ="/product" class="purchase">PURCHASE</router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- Promotion -->
  <div class="contain-main">
    <section class="section promotion">
      <div class="title">
        <h2>Shop Collections</h2>
        <span>Select from the premium product and save plenty money</span>
      </div>

      <div class="promotion-layout container">
        <div class="promotion-item">
          <img src="../../assets/images/xaydung.jpg" alt="" />
          <div class="promotion-content">
            <h3> <router-link to="/product">SHOP NOW</router-link></h3>
           <router-link to="/product">Building</router-link>
          </div>
        </div>

        <div class="promotion-item">
          <img src="../../assets/images/xephinh.jpg" alt="" />
          <div class="promotion-content">
             <h3> <router-link to="/product">SHOP NOW</router-link></h3>
           <router-link to="/product">Puzzle</router-link>
          </div>
        </div>

        <div class="promotion-item">
          <img src="../../assets/images/tritue.jpg" alt="" />
          <div class="promotion-content">
             <h3> <router-link to="/product">SHOP NOW</router-link></h3>
           <router-link to="/product">Smart</router-link>
          </div>
        </div>

        <div class="promotion-item">
          <img src="../../assets/images/1-3T.jpg" alt="" />
          <div class="promotion-content">
            <router-link to="/product">Shop Now</router-link>
          </div>
        </div>

        <div class="promotion-item">
          <img src="../../assets/images/4-6T.jpg" alt="" />
          <div class="promotion-content">
            <router-link to="/product">Shop Now</router-link>
          </div>
        </div>

        <div class="promotion-item">
          <img src="../../assets/images/6-11T.jpg" alt="" />
          <div class="promotion-content">
          <router-link to="/product">Shop Now</router-link>
          </div>
        </div>
      </div>
    </section>
    <!-- sd -->
    <section class="section products">
      <div class="title">
        <h2>New Products</h2>
        <span>Let we help you choose the best toys for your kid</span>
      </div>

      <div class="product-layout">
        <div class="product" v-for="(product, index) in productnew" :key="index">
          <div :class="'img-container ' + product.Id">
            <img :src="product.Image" alt="" />
            <div class="addCart" @click="AddToCart(product)">
              <i class="fas fa-shopping-cart"></i>
            </div>

            <ul class="side-icons">
              <span
                ><router-link :to="'/products/' + product.Id"
                  ><i class="fas fa-search"></i></router-link
              ></span>
              <span @click="AddToCart(product)"
                ><i class="far fa-heart"></i
              ></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">{{ product.Name }}</a>
            <div class="price">
              <span>$ {{ formatPrice(product.Newprice) }}</span>
              <span class="cancel">{{ product.oldsprice }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section advert">
      <div class="advert-layout container">
        <div class="item ">
          <img src="../../assets/images/quangcao1.jpg" alt="" />
          <div class="content left">
            <span>DEALS THIS WEEK</span>
            <h3>SAVE 50%</h3>
             <router-link to="/product">Shop Now</router-link>
          </div>
        </div>
        <div class="item">
          <img src="../../assets/images/quangcao2.webp" alt="" />
          <div class="content  right">
            <span>New Come</span>
            <h3>BEST OF THE MONTH</h3>
           <router-link to="/product">Shop Now</router-link>
          </div>
        </div>
      </div>
    </section>
    <!-- feature -->
    <section class="section products">
      <div class="title">
        <h2>Featured Products</h2>
        <span>Let we help you choose the best toys for your kid</span>
      </div>

      <div class="product-layout">
        <div class="product" v-for="(product, index) in productfeature" :key="index">
          <div class="img-container">
            <img :src="product.Image" alt="" />
            <div class="addCart" @click="AddToCart(product)">
              <i class="fas fa-shopping-cart"></i>
            </div>

            <ul class="side-icons">
              <span
                ><router-link :to="'/products/' + product.Id"
                  ><i class="fas fa-search"></i></router-link
              ></span>
              <span @click="AddToCart(product)"
                ><i class="far fa-heart"></i
              ></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">{{ product.Name }}</a>
            <div class="price">
              <span>$ {{ formatPrice(product.Newprice) }}</span>
              <span class="cancel">{{ product.oldsprice }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section advert ">
      <div class="advert-layout container feature">
        <div class="item ">
          <img src="../../assets/images/bg-6.jpg" alt="" />
          <div class="content left">
            <span>DEALS NOW</span>
            <h3>SAVE 50%</h3>
            <div class="butt">
              <img src="../../assets/images/button.webp" alt="" />
               <router-link  class="purchase feature" to="/product">Shop Now</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- hot -->
    <section class="section products">
      <div class="title">
        <h2>Hot Products</h2>
        <span>Let we help you choose the best toys for your kid</span>
      </div>

      <div class="product-layout">
        <div class="product" v-for="(product, index) in producthot" :key="index">
          <div class="img-container">
            <img :src="product.Image" alt="" />
            <div class="addCart" @click="AddToCart(product)">
              <i class="fas fa-shopping-cart"></i>
            </div>

            <ul class="side-icons">
              <span
                ><router-link :to="'/products/' + product.Id"
                  ><i class="fas fa-search"></i></router-link
              ></span>
              <span @click="AddToCart(product)"
                ><i class="far fa-heart"></i
              ></span>
            </ul>
          </div>
          <div class="bottom">
            <a href="">{{ product.Name }}</a>
            <div class="price">
              <span>$ {{ formatPrice(product.Newprice) }}</span>
              <span class="cancel">{{ product.oldsprice }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- brand -->
    <section class="section brands">
      <div class="title">
        <h2>Shop by Brand</h2>
        <span
          >Select from the premium product brands and save plenty money</span
        >
      </div>

      <div class="brand-layout container">
        <div class="glide" id="glide1">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide">
                <img src="../../assets/images/brand/1-3.webp" alt="" />
              </li>
              <li class="glide__slide">
                <img src="../../assets/images/brand/2.webp" alt="" />
              </li>
              <li class="glide__slide">
                <img src="../../assets/images/brand/3.webp" alt="" />
              </li>
              <li class="glide__slide">
                <img src="../../assets/images/brand/4.webp" alt="" />
              </li>
              <li class="glide__slide">
                <img src="../../assets/images/brand/5.webp" alt="" />
              </li>
              <li class="glide__slide">
                <img src="../../assets/images/brand/6.webp" alt="" />
              </li>
              <li class="glide__slide">
                <img src="../../assets/images/brand/7.webp" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios"
import Glide from "@glidejs/glide";

export default {
  name: "home",
  data() {
    return {
      producthot:[],
      productnew:[],
      productfeature:[],
      tax: 20,
      discount: 0,
      itemCount: [],
      findtext: "",
      value: "default",
      imageAlt: "logo",
      backupProducts: [],
      // products: [],
    };
  },
  methods: {
     formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    AddToCart: function(product) {
      this.$emit("id", product);
    },
  },
  mounted() {
    const glide1 = document.getElementById("glide1");

    if (glide1)
      new Glide(glide1, {
        type: "carousel",
        startAt: 0,
        perView: 5,
        hoverpause: false,
        autoplay: 2000,
        animationDuration: 800,
        animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
        breakpoints: {
          1200: {
            perView: 3,
          },
          768: {
            perView: 2,
          },
        },
      }).mount();
  },
  async created() {
      //  const response = await fetch(
      //   "http://127.0.0.1:3000/api/book"
      // );
      // this.products = await response.json();
      axios
      .get("http://127.0.0.1:3000/product/hot")
      .then((response)=>{
         this.producthot = Object.values(response.data)
         console.log(this.products)
      });
       axios
      .get("http://127.0.0.1:3000/product/feature")
      .then((response)=>{
         this.productfeature = Object.values(response.data)
         console.log(this.products)
      });
       axios
      .get("http://127.0.0.1:3000/product/new")
      .then((response)=>{
         this.productnew = Object.values(response.data)
         console.log(this.products)
      });

    },
};
</script>

<style>
.advert .advert-layout.feature {
  display: block;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
.purchase.feature {
  left: 30px;
  font-size: 20px;
  top: 30px;
}
</style>
