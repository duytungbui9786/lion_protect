<template>
  <Header :itemCart="itemCart" />

  <router-view
  :products="products"
    @id="AddToCart"
    :itemCart="itemCart"
    :subTotal="subTotal"
    :discountPrice="discountPrice"
    :totalTax="totalTax"
    :totalPrice="totalPrice"
    :itemCount="itemCount"
    @plus="plus"
    @del="remove"
  />
  <Footer />
  <img class="croll" @click="top" src="../public/lo.png" alt="">  

  <!-- <Product :products="products"/> -->

  <!-- <ProductDetail/> -->
  <!-- <Cart :products="products"
  :itemCount="itemCount"
   :subTotal="subTotal"
    :discountPrice="discountPrice"
    :totalTax="totalTax"
    :totalPrice="totalPrice"
  
  /> -->
  <!-- <Brand/> -->
</template>

<script>
import Header from "./components/Header";
// import Main from './components/Main.vue';

// import ProductDetail from './components/ProductDetail.vue';

// import Product from "./components/Product";
// import Brand from './components/Brand.vue';
// import Cart from './components/Cart.vue';
import Footer from "./components/Footer.vue";

import axios from "axios";
export default {
  data() {
    return {
      tax: 20,
      discount: 0,
      itemCart: [],
      findtext: "",
      value: "default",
      imageAlt: "logo",
      backupProducts: [],
      products: [],
    };
  },
  components: {
    Header,
    // Promotion,
    // NewProduct,
    // FeaturedProduct,
    Footer,
    // Main
    // Brand,
    // Cart
    // Product
    // HotProduct,
    // ProductDetail,
  },
  methods: {
    top: function(){
       document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    remove: function(index) {
      this.itemCart.splice(index, 1);
    },
    plus(id, value) {
      for (let i = 0; i < this.itemCart.length; i++) {
        if (this.itemCart[i].Id == id) {
          this.itemCart[i].quantity = value;
        }
      }
    },
    AddToCart(product) {
      alert("you added item "+product.Name)
        if (this.itemCart.includes(product) == false) {
          for(let i = 0;i<this.itemCart.length;i++){
            if(this.itemCart[i].Id==product.Id){
              return false;
            }
          }
          this.itemCart.push(product);
          product.quantity = 1;
          console.log(this.itemCart)
        }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    find() {
      let newproduct = [];
      if (this.backupProducts.length == 0) {
        this.backupProducts = this.products;
      }

      if (this.findtext == "") {
        this.textErr = "";
        this.products = this.backupProducts;
      } else {
        for (let i = 0; i < this.backupProducts.length; i++) {
          if (
            this.backupProducts[i].name
              .toLowerCase()
              .includes(this.findtext.toLowerCase())
          ) {
            newproduct.push(this.backupProducts[i]);
          }
        }
        if (newproduct.length == 0) {
          this.textErr = "không tìm thấy sản phẩm";
        } else {
          this.textErr = "kết quả của";
        }
        this.products = newproduct;
      }
    },
    countDiscount() {
      const done = this.itemCart.filter((product) => product.discount != "");
      return done.length;
    },

    lowToHigh(event) {
      let a = event.target.value;
      this.value = a;
      if (this.value == 1) {
        this.products.sort((b, c) => {
          return b.price - c.price;
        });
      }
      if (this.value == 2) {
        this.products.sort((b, c) => {
          return c.price - b.price;
        });
      }
      if (this.value == 0) {
        this.products.sort((b, c) => {
          return b.id - c.id;
        });
      }
    },
  },
  async created() {
    //  const response = await fetch(
    //   "http://127.0.0.1:3000/api/book"
    // );
    // this.products = await response.json();
    axios.get("http://127.0.0.1:3000/product").then((response) => {
      this.products = Object.values(response.data);
      console.log(this.products)
    });
  },
  computed: {
    itemCount: function() {
      var count = 0;

      for (var i = 0; i < this.itemCart.length; i++) {
        count += parseInt(this.itemCart[i].quantity) || 0;
      }

      return count;
    },
    subTotal: function() {
      var subTotal = 0;

      for (var i = 0; i < this.itemCart.length; i++) {
        subTotal += this.itemCart[i].Newprice * this.itemCart[i].quantity;
      }
      return subTotal;
    },
    discountPrice: function() {
      return (this.subTotal * this.discount) / 100;
    },
    totalTax: function() {
      return this.subTotal / this.tax;
    },
    totalPrice: function() {
      return this.subTotal - this.discountPrice + this.subTotal / this.tax;
    },
  },
};
</script>

<style>
.croll{
  position: fixed;
  width: 100px;
  bottom: 0;
  right: 0;
   cursor: pointer;
}
</style>
