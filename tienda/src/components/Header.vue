<template>
  <header class="header header-absolute">
    <!-- Navbar-->
    <nav
      class="navbar navbar-expand-lg navbar-sticky navbar-airy navbar-dark bg-fixed-white navbar-fixed-light"
      style="background: #ffff !important"
    >
      <div class="container-fluid">
        <!-- Navbar Header  -->
        <router-link class="navbar-brand" to="/">
          <img src="/assets/media/logo/logo_completo2.png" alt="Logo" style="width: 170px; height: 55px;" />
        
        </router-link>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa fa-bars"></i>
        </button>
        <!-- Navbar Collapse -->
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/" >INICIO</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'shop'}" >Pizzas</router-link>
            </li> 
            
            
          </ul>
          <div
            class="d-flex align-items-center justify-content-between justify-content-lg-end mt-1 mb-2 my-lg-0"
          >
            
            <!-- User Not Logged - link to login page-->
            <div class="nav-item">
              <router-link  v-if="!$store.state.token" class="navbar-icon-link" to="/login">
                <img src="/assets/icons/usuario.png" style="width: 44px" />
                <span
                  class="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none"
                  >Log in
                </span>
              </router-link>
              <a  v-if="$store.state.token" class="navbar-icon-link dropdown">
                <img src="/assets/icons/usuario.png" style="width: 44px" />
                  <span
                    class="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline dropdown-toggle" data-bs-target="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    >&nbsp; {{ user ? user.nombres.split(' ')[0] : '' }}
                  </span>
                <div class="dropdown-menu dropdown-menu-animated" aria-labelledby="categoryDropdownMenuLink" style="left: -50px !important;">
                  <router-link class="dropdown-item" to="/cuenta/venta">Mis ventas</router-link>
                  <router-link class="dropdown-item" to="/cuenta/direcciones">Direcciones</router-link>
                  <a class="dropdown-item" v-on:click="logout()">Cerrar sesión</a>

                </div>
              </a>
            </div>
            <!-- Cart Dropdown-->
            <div class="nav-item dropdown">
              <a class="navbar-icon-link d-lg-none" href="cart.html">
                <!--<img src="/assets/icons/user.png" style="width: 25px" />-->
                <span
                  class="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none"
                  >View cart</span
                >
              </a>
              <div class="d-none d-lg-block">
                <a
                  class="navbar-icon-link"
                  id="cartdetails"
                  href="cart.html"
                  data-bs-target="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src="/assets/icons/carrito.png" style="width: 40px" />
                  <div class="navbar-icon-link-badge">{{ carrito_length }}</div>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-animated dropdown-menu-end p-4"
                  aria-labelledby="cartdetails" style="max-width: 350px !important;"
                >
                  <div class="navbar-cart-product-wrapper" style="overflow-x: hidden !important;max-height: 340px !important;">
                    <!-- cart item-->
                    <div class="navbar-cart-product" v-for="item in carrito">
                      <div class="d-flex align-items-center">
                        <router-link :to="{name:'show-producto',params:{slug: item.producto.slug}}"
                          ><img
                            class="img-fluid navbar-cart-product-image"
                            :src="$url+'/obtener_portada_producto/'+item.producto.portada"
                            alt="..."
                        /></router-link>
                        <div class="w-100">
                          <a class="navbar-cart-product-close" href="#">
                            <img
                              src="/assets/icons/close.png"
                              style="width: 15px"
                            />
                          </a>
                          <div class="ps-3">
                            <router-link :to="{name:'show-producto',params:{slug: item.producto.slug}}" class="navbar-cart-product-link" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.producto.titulo}}</router-link>
                            <small class="d-block text-muted">{{ item.producto.str_variedad }}: {{ item.variedad.variedad }}</small>
                            <small class="d-block text-muted">Cantidad: {{ item.cantidad }}</small>
                            <strong class="d-block text-sm">{{convertCurrency(item.producto.precio*item.cantidad)}}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- total price-->
                  <div class="navbar-cart-total">
                    <span class="text-uppercase text-muted">Total</span
                    ><strong class="text-uppercase">{{convertCurrency(total)}}</strong>
                  </div>
                  <!-- buttons-->
                  <div class="d-flex justify-content-between">
                    <router-link class="btn btn-link text-dark me-3" to="/cart"
                      >Carrito
                      <img
                        src="/assets/icons/shopping-bag.png"
                        style="width: 15px"
                      />
                    </router-link>
                    <router-link to="/checkout" class="btn btn-outline-dark">
                      Checkout
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- /Navbar -->
    <!-- Fullscreen search area-->
    <div class="search-area-wrapper">
      <div class="search-area d-flex align-items-center justify-content-center">
        <div class="close-btn">
          <svg class="svg-icon svg-icon-light w-3rem h-3rem">
            <use xlink:href="#close-1"></use>
          </svg>
        </div>
        <form class="search-area-form" action="#">
          <div class="mb-4 position-relative">
            <input
              class="search-area-input"
              type="search"
              name="search"
              id="search"
              placeholder="What are you looking for?"
            />
            <button class="search-area-button" type="submit">
              <svg class="svg-icon">
                <use xlink:href="#search-1"></use>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- /Fullscreen search area-->
  </header>
</template>
<style>
.navbar-light .navbar-nav .nav-link, .navbar-hover-light:hover .navbar-nav .nav-link, .navbar-fixed-light.fixed-top .navbar-nav .nav-link {
    color: rgb(255 255 255) !important;
}
.navbar-dark .navbar-icon-link-badge {
    color: #ffff;
    background: #cb250e;
}

.navbar-dark .navbar-nav .nav-link {
    color: #cb250e;
}

.navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {
    color: #d67676dc;
}


.py-6 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
}

.navbar-dark .navbar-icon-link {
    color: #cb250e;
}

.navbar-light .navbar-nav .nav-link, .navbar-hover-light:hover .navbar-nav .nav-link, .navbar-fixed-light.fixed-top .navbar-nav .nav-link {
    color: #cb250e !important;
}
</style>

<script>
import { RouterLink } from "vue-router";
import axios from "axios";
import currency_formatter from "currency-formatter";
import router from "@/router";
export default {
  name: "Header",
  data(){
    return{
      user: JSON.parse(this.$store.state.user),
      carrito:[],
      total:0,
      carrito_length: 0,

    }
  },
  methods:{
    convertCurrency(number) {
        return currency_formatter.format(number, { code: "PEN" });
    },
    logout(){
      this.$store.dispatch("logout");
      if (this.$route.path !== "/") 
      this.$router.push({ name: "home" });
      
      /* window.location.reload(); */
      this.carrito=[];
      this.carrito_length=0;
    },
    init_carrito(){
        if(this.$store.state.token != null){
          axios.get(this.$url+'/obtener_carrito_cliente',{
          headers:{
              'Content-Type':'application/json',
              'Authorization': this.$store.state.token
          }
          }).then((result)=>{
          this.carrito_length = result.data.carrito_general.length;
          this.total = 0;
          for(var item of result.data.carrito_general){
            let subtotal = item.producto.precio * item.cantidad;
            this.total = this.total+ subtotal;
          }
          this.carrito = result.data.carrito;
          });
        }
    },
    click_event(){
    this.$socket.emit('emit_method', 'Hola Socket');
    },
  },
  
    created(){
      this.sockets.subscribe('listen_cart', (data) => {
      this.init_carrito();
      this.user= JSON.parse(this.$store.state.user);
    });
    },
    beforeMount(){
    this.init_carrito();
  },
  

};
</script>
