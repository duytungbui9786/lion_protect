<template>
<div class="detailContain">
  <section class="section product-detail">
    <div class="details container" v-for="(product,index) in products"
            :key="index"> 
        <div class="left" v-if="product.Id == $route.params.id" >
          <div class="main">
                 <img :src="product.Image" alt="" />
          </div>
        
        </div>
        <div class="right"  v-if="product.Id == $route.params.id">
          <span>{{product.Infor}}</span>
          <h1>{{product.Name}}</h1>
          <div class="price">$ {{ formatPrice(product.Newprice) }}</div>
          <form>
            <div>
              
              <span><i class="fas fa-chevron-down"></i></span>
            </div>
          </form>

          <form class="form">
            <input type="text" placeholder="1" />
            <a href="#" @click="AddToCart(product)" class="addCart">Add To Cart</a>
          </form>
          <h3>{{product.Infor}}</h3>
          <p>
            {{product.Inforgeneral}}
          </p>
        </div>
    </div>
  </section>

  <!-- Related Products -->

  <section class="section related-products">
    <div class="title">
      <h2>Related Products</h2>
      <span>Select from the premium product brands and save plenty money</span>
    </div>
    <div class="product-layout container">
      <div class="product"   v-for="(product, index) in feature"
            :key="index">
        <div class="img-container">
          <img :src="product.Image" alt="" />
          <div @click="AddToCart(product)" class="addCart">
            <i class="fas fa-shopping-cart"></i>
          </div>

          <ul class="side-icons">
                <span
                  ><router-link :to="'/products/' + product.Id" :id="2"
                    ><i class="fas fa-search"></i></router-link
                ></span>
                <span @click="AddToCart(product)"
                  ><i class="far fa-heart"></i
                ></span>
              </ul>
        </div>
        <div class="bottom">
          <router-link :to="'/products/' + product.Id" :id="2">{{product.Name}}</router-link>
          <div class="price">
            <span>$ {{ formatPrice(product.Newprice) }}</span>
          </div>
        </div>
      </div>
     
    </div>
  </section>
</div>
    <!-- Product Details -->

</template>

<script>
import axios from "axios";
export default {
    data() {
    return {
      feature:[],
      products: [],
    };
  },
   async created() {
    //  const response = await fetch(
    //   "http://127.0.0.1:3000/api/book"
    // );
    // this.products = await response.json();
    axios.get(`http://127.0.0.1:3000/product`).then((response) => {
      this.products = Object.values(response.data);

    });
    axios.get(`http://127.0.0.1:3000/product/relate`).then((response) => {
      this.feature = Object.values(response.data);

    });
  },
  
  methods:{
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
     AddToCart: function(product) {
      this.$emit("id", product);
      this.related = product.AgesRank
    },
  },
  
}
</script>

<style>
.detailContain{
  margin-top: 200px;
}
</style>