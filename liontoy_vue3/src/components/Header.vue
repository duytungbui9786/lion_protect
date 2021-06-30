<template>
  <nav class="nav">
    <div class="wrapper container">
      <div class="logo"><router-link to ="/"><img style="width:100px;" src="../../public/l.png" alt=""></router-link></div>
      <ul class="nav-list">
        <div class="top">
          <label for="" class="btn close-btn"
            ><i class="fas fa-times"></i
          ></label>
        </div>
        <li ><router-link to ="/" class="active" >Home</router-link></li>
        <li><router-link to ="/product">Product</router-link></li>

        <li><router-link to ="/blog">blog</router-link></li>
       <li><router-link to ="/promotion">promotion</router-link></li>
     
        <!-- icons -->
        <li class="icons">
          <span><router-link to ="/cart">
            <img src="../assets/images/shoppingBag.svg" alt="" />
            </router-link>
            <small class="count d-flex">{{itemCart.length}}</small>
          </span>
         
        </li>
      </ul>
      <label for="" class="btn open-btn"><i class="fas fa-bars"></i></label>
    </div>
  </nav>
</template>

<script>
export default {
  name:'Header',
   props:[
    'itemCart'
  ],
  computed() {
    const openNav = document.querySelector(".open-btn");
    const closeNav = document.querySelector(".close-btn");
    const menu = document.querySelector(".nav-list");

    const menuLeft = menu.getBoundingClientRect().left;
    openNav.addEventListener("click", () => {
      if (menuLeft < 0) {
        menu.classList.add("show");
      }
    });

    closeNav.addEventListener("click", () => {
      if (menuLeft < 0) {
        menu.classList.remove("show");
      }
    });

    // Fixed Nav
    const navBar = document.querySelector(".nav");
    const navHeight = navBar.getBoundingClientRect().height;
    window.addEventListener("scroll", () => {
      const scrollHeight = window.pageYOffset;
      if (scrollHeight > navHeight) {
        navBar.classList.add("fix-nav");
      } else {
        navBar.classList.remove("fix-nav");
      }
    });

    // Scroll To
    const links = [...document.querySelectorAll(".scroll-link")];
    links.map((link) => {
      if (!link) return;
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const id = e.target.getAttribute("href").slice(1);

        const element = document.getElementById(id);
        // const fixNav = navBar.classList.contains("fix-nav");
        let position = element.offsetTop - navHeight;

        window.scrollTo({
          top: position,
          left: 0,
        });

        navBar.classList.remove("show");
        menu.classList.remove("show");
        document.body.classList.remove("show");
      });
    });
  },
};
</script>

<style></style>
