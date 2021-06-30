<template>
  <section class="section products main">
    <div class="products-layout container">
 
      <div class="col-3-of-4">
        <div class="find">
          <div class="item">
            <label for="sort-by">Choose Product For</label>
            <select class="selectfor" @change="SortByCategory">
               <option value="default" selected="selected">default</option>
              <option value="boy" >Boy</option>
              <option value="girl">Girl</option>
            </select>
          </div>
          <div class="findContent">
              <input class="inputfor" type="text" @keyup.enter="find" v-model="findtext" />
              <button class="buttonfor" @click="find">find</button>
          </div>
        </div>
        <form action="">
          <div class="item">
            <label for="sort-by">Sort By</label>
            <select @change="SortByValue" name="sort-by" id="sort-by">
              <option value="name" selected="selected">Name</option>
              <option value="number">Price</option>
            </select>
          </div>
          <div class="item">
            <label for="order-by">Order</label>
            <select @change="SortByHow" name="order-by" id="sort-by">
              <option value="ASC" selected="selected">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
          <a @click="sortProduct">Apply</a>
        </form>
        
        <span>{{ textErr }}</span>

        <div class="product-layout">
          <div
            class="product"
            v-for="(product, index) in products"
            :key="index"
          >
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
              <router-link :to="'/products/' + product.Id">{{ product.Name }}</router-link >
              <div class="price">
                <span>$ {{ formatPrice(product.Newprice) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGINATION -->
        <ul class="pagination">
          <span
            @click="paginate(index + 1)"
            v-for="(item, index) in totalpage"
            :key="index"
            >{{ index + 1 }}</span
          >
          <!-- <span class="icon">››</span>
          <span class="last">Last »</span> -->
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      totalpage: "",
      totalproduct: "",
      sortValue: "name",
      SortHow: "ASC",
      tax: 20,
      discount: 0,
      itemCount: [],
      findtext: "",
      value: "default",
      imageAlt: "logo",
      backupProducts: [],
      products: [],
      boy: [],
      girl: [],
    };
  },
  
  methods: {
     formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    //phan trang
    paginate(index) {
      axios
        .get(`http://127.0.0.1:3000/product/limit?page=` + index)
        .then((response) => {
          this.products = Object.values(response.data.data);
          this.totalpage = response.data.meta.lastpage;
          this.totalproduct = response.data.meta.total;
          window.scrollTo(0, 0);
        });
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
            this.backupProducts[i].Name.toLowerCase().includes(
              this.findtext.toLowerCase()
            )
          ) {
            newproduct.push(this.backupProducts[i]);
          }
        }
        if (newproduct.length == 0) {
          this.textErr = "không tìm thấy sản phẩm";
        } else {
          this.textErr = "";
        }
        this.products = newproduct;
      }
    },
    sortProduct() {
      if (this.SortHow == "ASC" && this.sortValue == "number") {
        this.products.sort((b, c) => {
          return b.Newprice - c.Newprice;
        });
      }
      if (this.SortHow == "DESC" && this.sortValue == "number") {
        this.products.sort((b, c) => {
          return c.Newprice - b.Newprice;
        });
      }

      if (this.SortHow == "ASC" && this.sortValue == "name") {
        this.products.sort((b, c) => {
          return b.Id - c.Id;
        });
      }
      if (this.SortHow == "DESC" && this.sortValue == "name") {
        this.products.sort((b, c) => {
          return c.Id - b.Id;
        });
      }
    },
    //get sort by name
    SortByValue(event) {
      let value = event.target.value;
      this.sortValue = value;
    },
    //get sort by ESC
    SortByHow(event) {
      let value = event.target.value;
      this.SortHow = value;
    },
    AddToCart: function(product) {
      this.$emit("id", product);
    },
    SortByCategory(event){
         let value = event.target.value;
         if(value=="boy"){
           this.products= this.boy
         }
         if(value=="girl"){
           this.products= this.girl
         }
         if(value=="default"){
           this.products= this.backupProducts
         }
    }
  },
  async created() {
    //  const response = await fetch(
    //   "http://127.0.0.1:3000/api/book"
    // );
    // this.products = await response.json();
    axios.get(`http://127.0.0.1:3000/product/limit?page=1`).then((response) => {
      this.products = Object.values(response.data.data);
      this.backupProducts = Object.values(response.data.data);
      this.totalpage = response.data.meta.lastpage;
      this.totalproduct = response.data.meta.total;
    });

    //smartproduct
     axios.get(`http://127.0.0.1:3000/product/boy`).then((response) => {
      this.boy = Object.values(response.data);
    });
      axios.get(`http://127.0.0.1:3000/product/girl`).then((response) => {
      this.girl = Object.values(response.data);
    });
  },
};
</script>

<style>
.section.products.main {
  margin-top: 100px;
}
.find {
  
  width: 80%;
  margin:20px auto;
  display: flex;
  justify-content: space-between;
}

.findBox {
  float: right;
}
.selectfor{
      font-family: "Open Sans", sans-serif;
    padding: 1rem;
    width: 10rem;
    border: 1px solid #f2f2f2;
    outline: none;
}
.inputfor{
  padding: 5px;
}
.buttonfor{
   padding: 5px;
}
</style>
