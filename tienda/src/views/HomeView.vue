<template>
  <div class="home">
    <section>
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-lg-6 dark-overlay split-screen-column align-items-center align-items-lg-end"
            style="
              background-image: url(https://res.cloudinary.com/ddavlkcwx/image/upload/v1745287452/PORTADA_DE_WEB_PIZZA_FAMILIAR_2_n22q7c.png);
              background-color: #d2cecb;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              min-height: 390px;
            "
          >
            
          </div>
          <div
            class="col-lg-6 split-screen-column align-items-center align-items-lg-end"
            style="
              background-image: url(https://res.cloudinary.com/ddavlkcwx/image/upload/v1745287040/PORTADA_DE_WEB_PIZZA_FAMILIAR_qtu8gf.png);
              background-color: #e5b6b4;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              min-height: 390px;
            "
          >
            
          </div>
        </div>
      </div>
    </section>
    <section class="pt-6 pb-5" style="background-color: rgb(229 229 229) !important;">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 mx-auto text-center mb-5">
            <h2 class="text-uppercase">NUESTRAS PIZZAS</h2>
            
          </div>
        </div>
        <div class="row">
          <!-- product-->
          <div class="col-lg-3 col-md-4 col-6" v-for="item in nuevos_productos">
            <router-link :to="{name:'show-producto',params:{slug: item.slug}}">
              <div class="product">
                <div class="product-image">
                  <div class="ribbon ribbon-danger" v-if="item.descuento">Oferta</div>
                  <img class="img-fluid" :src="$url+'/obtener_portada_producto/'+item.portada" alt="product"/>
                  <div class="product-hover-overlay">
                    <a class="product-hover-overlay-link" href="detail.html"></a>
                    
                  </div>
                </div>
                <div class="py-2">
                  <p class="text-muted text-sm mb-1">{{item.categoria}}</p>
                  <h3 class="h6 text-uppercase mb-1">
                    <a class="text-dark" href="detail.html">{{item.titulo}}</a>
                  </h3>
                  <span class="text-muted">{{convertCurrency(item.precio)}}</span>
                </div>
              </div>
            </router-link>
            
          </div>
          <!-- /product-->
          
        </div>
      </div>
    </section>
   
  <!--<section class="pt-6 pb-5">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 mx-auto text-center mb-5">
            <h2 class="text-uppercase">Productos recomendados</h2>
            <p class="lead text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <div class="owl-carousel owl-theme product-slider">
           
            <div class="product-slider-item">
              <div class="product">
                <div class="product-image">
                  <div class="ribbon ribbon-primary">Sale</div>
                  <img
                    class="img-fluid"
                    src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/product/kyle-loftus-596319-unsplash.jpg"
                    alt="product"
                  />
                  <div class="product-hover-overlay">
                    <a
                      class="product-hover-overlay-link"
                      href="detail.html"
                    ></a>
                    <div class="product-hover-overlay-buttons">
                      <a class="btn btn-dark btn-buy" href="detail.html"
                        ><i class="fa-search fa"></i
                        ><span class="btn-buy-label ms-2">View</span></a
                      >
                    </div>
                  </div>
                </div>
                <div class="py-2">
                  <p class="text-muted text-sm mb-1">Accessories</p>
                  <h3 class="h6 text-uppercase mb-1">
                    <a class="text-dark" href="detail.html">{{ nuevos_productos[0].titulo }}</a>
                  </h3>
                  <span class="text-muted">$40.00</span>
                </div>
              </div>
            </div>
           
            <div class="product-slider-item">
              <div class="product">
                <div class="product-image">
                  <div class="ribbon ribbon-primary">Sale</div>
                  <img
                    class="img-fluid"
                    src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/product/kyle-loftus-596319-unsplash.jpg"
                    alt="product"
                  />
                  <div class="product-hover-overlay">
                    <a
                      class="product-hover-overlay-link"
                      href="detail.html"
                    ></a>
                    <div class="product-hover-overlay-buttons">
                      <a class="btn btn-dark btn-buy" href="detail.html"
                        ><i class="fa-search fa"></i
                        ><span class="btn-buy-label ms-2">View</span></a
                      >
                    </div>
                  </div>
                </div>
                <div class="py-2">
                  <p class="text-muted text-sm mb-1">Accessories</p>
                  <h3 class="h6 text-uppercase mb-1">
                    <a class="text-dark" href="detail.html">{{ nuevos_productos[1].titulo }}</a>
                  </h3>
                  <span class="text-muted">$40.00</span>
                </div>
              </div>
            </div>
            
           <div class="product-slider-item" v-if=" nuevos_productos[2]">
              <div class="product">
                <div class="product-image">
                  <div class="ribbon ribbon-primary">Sale</div>
                  <img
                    class="img-fluid"
                    src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/product/kyle-loftus-596319-unsplash.jpg"
                    alt="product"
                  />
                  <div class="product-hover-overlay">
                    <a
                      class="product-hover-overlay-link"
                      href="detail.html"
                    ></a>
                    <div class="product-hover-overlay-buttons">
                      <a class="btn btn-dark btn-buy" href="detail.html"
                        ><i class="fa-search fa"></i
                        ><span class="btn-buy-label ms-2">View</span></a
                      >
                    </div>
                  </div>
                </div>
                <div class="py-2">
                  <p class="text-muted text-sm mb-1">Accessories</p>
                  <h3 class="h6 text-uppercase mb-1">
                    <a class="text-dark" href="detail.html">{{ nuevos_productos[2].titulo }}</a>
                  </h3>
                  <span class="text-muted">$40.00</span>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </section>-->
    <!--<section class=" dark-overlay py-7 d-flex align-items-center justify-content-center"><img class="bg-image" src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/photo/photo-1534126511673-b6899657816a.jpg" alt="">
      <div class="overlay-content w-100">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 text-white">
              <h6 class="text-uppercase text-white letter-spacing-5 mb-3"> About us</h6>
              <h1 class="display-3 fw-bold text-shadow mb-5">We are Sell</h1>
              <p class="text-lg">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections</p>
            </div>
          </div>
        </div>
      </div>
    </section>-->
  </div>
</template>

<style>
.product-image{
  display: block;
  overflow: hidden;
}

.img-fluid{
  height: auto !important;
  display: block !important;
  vertical-align: middle !important;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'
import currency_formatter from "currency-formatter";
//import {init_carousel} from '../../public/assets/js/theme.d7b4a888'

export default {
  name: "HomeView",
  data(){
    return{
      nuevos_productos:[],
      load_nuevos_productos: true,

      productos_recomendados: [],
      load_productos_recomendados:true,

    }
  },

  methods:{
   init_nuevos_productos(){
    axios.get(this.$url+'/obtener_nuevos_productos',{
      headers:{
        'Content-Type':'application/json'
      }
    }).then((result)=>{
      this.nuevos_productos = result.data
      console.log(this.nuevos_productos)
    })

   },
   init_productos_recomendados(){
    axios.get(this.$url+'/obtener_productos_recomendados',{
      headers:{
        'Content-Type':'application/json'
      }
    }).then((result)=>{
      this.productos_recomendados = result.data;
      this.load_productos_recomendados = false;
      console.log(this.productos_recomendados)
    })

   },
   convertCurrency(number) {
      return currency_formatter.format(number, { code: "PEN" });
    },
  },

  components: {
    HelloWorld,
  },
  beforeMount(){
    this.init_nuevos_productos();
    this.init_productos_recomendados();
    window.init_carousel.init();
  }
};
</script>
