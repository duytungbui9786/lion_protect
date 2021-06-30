<template>
<div class="cart">
  <header class="container">
    <h1>Shopping Cart</h1>
    <ul class="breadcrumb">
      <li>Home</li>
      <li>Shopping Cart</li>
    </ul>
    <span class="count">{{ itemCount }} items in the bag</span>
  </header>
  <section class="container">
    <div v-if="itemCart.length > 0">
      <ul class="products">
        <li class="row" v-for="(product, index) in itemCart" :key="index">
          <div class="col left">
            <div class="thumbnail">
              <a href="#">
                <img :src="product.Image" :alt="product.Name" />
              </a>
            </div>
            <div class="detail">
              <div class="name">
                <a href="#">{{ product.Name }}</a>
              </div>
              <div class="description">{{ product.Infor }}</div>
              <div class="price">$ {{ formatPrice(product.Newprice) }}</div>
            </div>
          </div>

          <div class="col right">
            <div class="quantity">
              <input
                type="number"
                class="quantity"
                step="1"
                min="1"
                  max="99"
                :method="product.Id"
                :value="product.quantity"
                @input="updateQuantity(index, $event)"
                @blur="checkQuantity(index, $event)"
              />
            </div>

            <div class="remove">
              <svg
                @click="removeItem(index)"
                version="1.1"
                class="close"
                x="0px"
                y="0px"
                viewBox="0 0 60 60"
                enable-background="new 0 0 60 60"
                xml:space="preserve"
              >
                <polygon
                  points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"
                ></polygon>
              </svg>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="empty-product">
      <h3>There are no products in your cart.</h3>
      <button><router-link to="/product">Shopping now</router-link></button>
    </div>
  </section>

  <section class="container" v-if="products.length > 0">
    <div class="promotioncart">
      <label for="promo-code">Have A Promo Code?</label>
      <input type="text" id="promo-code" v-model="promoCode" /> <button type="button" @click="checkPromoCode"></button>
    </div>

    <div class="summary">
      <ul>
        <li>Subtotal <span>$ {{ formatPrice(subTotal)  }}</span></li>
        <li v-if="discount > 0">Discount <span>{{formatPrice(discountPrice)}}</span></li>
        <li>Tax <span>$ {{ formatPrice(totalTax)  }}</span></li>
        <li class="total">Total <span>$ {{ formatPrice(totalPrice)  }}</span></li>
      </ul>
    </div>

    <div class="checkout">
      <button type="button">Check Out</button>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  props: [
    "products",
  "itemCart",
   "subTotal",
   "discountPrice",
   "totalTax",
   "totalPrice",
   "itemCount"
   ],
  data() {
    return {};
  },
  
  methods:{
     formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
      updateQuantity: function (index, event) {
      var product = this.products[index];
      var value = event.target.value;
      // var method = event.target.method;
      var valueInt = parseInt(value);
      // Minimum quantity is 1, max
      if (value === "") {
        product.quantity = value;
      } else if (valueInt > 0 && valueInt < 100) {
        product.quantity = valueInt;
      }
      let idpro = this.itemCart[index].Id
      this.$emit("plus",idpro,valueInt);
    },
    checkQuantity: function (index, event) {
      // Update quantity to 1 if it is empty
      if (event.target.value === "") {
        var product = this.products[index];
        product.quantity = 1;
        // this.$set(this.products, index, product);
      }
    },

    removeItem(index) {
      let r = confirm("Do you want delete");
      if (r == true) {
        this.$emit("del", index);
      } else {
        return false;
      }
      // this.products.splice(this.products.indexOf(product), 1);
    },
  },
};
</script>

<style scope>


img {
  max-width: 100%;
  vertical-align: middle;
  border-radius: 4px;
}

a {
  text-decoration: none;
  color: #333333;
}

a:hover {
  color: #f58551;
}

button {
  background-color: #16cc9b;
  border: 2px solid #16cc9b;
  color: #ffffff;
  transition: all 0.25s linear;
  cursor: pointer;
}

button::after {
  position: relative;
  right: 0;
  content: " \276f";
  transition: all 0.15s linear;
}

button:hover {
  background-color: #f58551;
  border-color: #f58551;
}

button:hover::after {
  right: -5px;
}

button:focus {
  outline: none;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

input {
  transition: all 0.25s linear;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

input {
  outline: none;
}



/* --- HEADER --- */
header.container {
    margin-top:200px;
  margin-bottom: 5.5rem;
}

header .breadcrumb {
  color: #7d7d7d;
}



header .breadcrumb li:first-child {
  padding-left: 2px;
}

header .breadcrumb li:not(:last-child)::after {
  content: " \276f";
  padding-left: 8px;
}

header .count {
  float: right;
  color: #333333;
  height: 20px;
  line-height: 20px;
}

/* --- PRODUCT LIST --- */
.products {
  border-top: 1px solid #ddd;
}

.products > li {
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}

.row {
  position: relative;
  overflow: auto;
  width: 100%;
}

.col,
.quantity,
.remove {
  float: left;
}

.col.left {
  width: 70%;
}

.col.right {
  width: 30%;
  position: absolute;
  right: 0;
  top: calc(50% - 30px);
}

.detail {
  padding: 0 0.5rem;
  line-height: 2.2rem;
}

.detail .name {
  font-size: 1.2rem;
}

.detail .description {
  color: #7d7d7d;
  font-size: 1rem;
}

.detail .price {
  font-size: 1.5rem;
}

.quantity,
.remove {
  width: 50%;
  text-align: center;
}

.remove svg {
  width: 60px;
  height: 60px;
}

.quantity > input {
  display: inline-block;
  width: 60px;
  height: 60px;
  position: relative;
  left: calc(50% - 30px);
  background: #fff;
  border: 2px solid #ddd;
  color: #7f7f7f;
  text-align: center;
  font: 600 1.5rem Helvetica, Arial, sans-serif;
}

.quantity > input:hover,
.quantity > input:focus {
  border-color: #f58551;
}

.close {
  fill: #7d7d7d;
  transition: color 150ms linear, background-color 150ms linear,
    fill 150ms linear, 150ms opacity linear;
  cursor: pointer;
}

.close:hover {
  fill: #f58551;
}

/* --- SUMMARY --- */
.promotioncart,
.summary,
.checkout {
  float: left;
  width: 100%;
  margin-top: 1.5rem;
}

.promotioncart > label {
  float: left;
  width: 100%;
  margin-bottom: 1rem;
}

.promotioncart > input {
  float: left;
  width: 80%;
  font-size: 1rem;
  padding: 0.5rem 0 0.5rem 1.8rem;
  border: 2px solid #16cc9b;
  border-radius: 2rem 0 0 2rem;
}

.promotioncart:hover > input {
  border-color: #f58551;
}

.promotioncart > button {
  float: left;
  width: 20%;
  height: 2.4rem;
  border-radius: 0 2rem 2rem 0;
}

.promotioncart:hover > button {
  border-color: #f58551;
  background-color: #f58551;
}

.promotioncart > button::after {
  content: "\276f";
  font-size: 1rem;
}

.summary {
  font-size: 1.2rem;
  text-align: right;
}

.summary ul li {
  padding: 0.5rem 0;
}

.summary ul li span {
  display: inline-block;
  width: 30%;
}

.summary ul li.total {
  font-weight: bold;
}

.checkout {
  text-align: right;
}

.checkout > button {
  font-size: 1.2rem;
  padding: 0.8rem 2.8rem;
  border-radius: 1.5rem;
}

.empty-product {
  text-align: center;
}

.empty-product > button {
  font-size: 1.3rem;
  padding: 10px 30px;
  border-radius: 5px;
}

/* --- SMALL SCREEN --- */
@media all and (max-width: 599px) {
  .thumbnail img {
    display: none;
  }

  .quantity > input {
    width: 40px;
    height: 40px;
    left: calc(50% - 20px);
  }

  .remove svg {
    width: 40px;
    height: 40px;
  }
}

/* --- MEDIUM & LARGE SCREEN --- */
@media all and (min-width: 600px) {
 

  .container {
    width: 75%;
    max-width: 960px;
  }

  .thumbnail,
  .detail {
    float: left;
  }

  .thumbnail {
    width: 35%;
  }

  .detail {
    width: 65%;
  }

  .promotioncart,
  .summary {
    width: 50%;
  }

  .checkout {
    width: 100%;
  }

  .checkout,
  .summary {
    text-align: right;
  }
}

/* --- LARGE SCREEN --- */

</style>
