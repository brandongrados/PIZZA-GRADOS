<template>
    <div>
      <Sidebar />
      <div class="main-content">
        <TopNav />
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <!-- Header -->
              <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Pretitle -->
                    <h6 class="header-pretitle">Ingreso</h6>

                    <!-- Title -->
                    <h1 class="header-title">Ingresos</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link class="nav-link" to="/ingreso"> Ingresos </router-link>
                      </li>
                      <li class="nav-item">
                        <router-link class="nav-link " to="/ingreso/create">Nuevo ingreso</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-6">
                    <div class="card">
                    <div class="card-body">

                        <!-- List group -->
                        <div class="list-group list-group-flush my-n3">
                        <div class="list-group-item">
                            <div class="row align-items-center">
                            <div class="col">

                                <!-- Title -->
                                <h5 class="mb-0">
                                Proveedor
                                </h5>

                            </div>
                            <div class="col-auto">

                                <!-- Time -->
                                <time class="small text-muted" datetime="1988-10-24">
                               {{ingreso.proveedor}}
                                </time>

                            </div>
                            </div> <!-- / .row -->
                        </div>
                        <div class="list-group-item">
                            <div class="row align-items-center">
                            <div class="col">

                                <!-- Title -->
                                <h5 class="mb-0">
                                Comprobante
                                </h5>

                            </div>
                            <div class="col-auto">

                                <!-- Time -->
                                <time class="small text-muted" datetime="2018-10-28">
                                {{ ingreso.ncomprobante }}
                                </time>

                            </div>
                            </div> <!-- / .row -->
                        </div>
                        <div class="list-group-item">
                            <div class="row align-items-center">
                            <div class="col">

                                <!-- Title -->
                                <h5 class="mb-0">
                                Serie
                                </h5>

                            </div>
                            <div class="col-auto">

                                <!-- Text -->
                                <small class="text-muted" v-if="ingreso.serie">
                                {{ingreso.serie.toString().padStart(6,'000000')}}
                                </small>

                            </div>
                            </div> <!-- / .row -->
                        </div>
                        
                        </div>

                    </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">

                            <!-- List group -->
                            <div class="list-group list-group-flush my-n3">
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Monto total
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Time -->
                                    <time class="small text-muted" datetime="1988-10-24">
                                    {{convertCurrency(ingreso.monto_total)}}
                                    </time>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Monto resultante
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Time -->
                                    <time class="small text-muted" datetime="2018-10-28">
                                        {{convertCurrency(ingreso.monto_resultante)}}
                                    </time>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Fecha
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Text -->
                                    <small class="text-muted">
                                    {{convertDate(ingreso.createdAt)}}
                                    </small>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                           
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">

                    <!-- Title -->
                    <h4 class="card-header-title mb-0">
                        <b>Productos</b>
                    </h4>

                </div>
                <div class="table-responsive">
                    <table class="table table-sm table-nowrap card-table">
                    <thead>
                        <tr>
                        <th>Producto</th>
                        <th>Variedad</th>
                        <th>Precio unitario</th>
                        <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody class="fs-base">
                        <tr v-for="item in detalles">
                        <td>
                            <a>{{item.producto.titulo}}</a>
                        </td>
                        <td>
                            <span>{{item.variedad.variedad}}</span>
                        </td>
                        <td>
                            <time>{{convertCurrency(item.precio_unidad)}}</time>
                        </td>
                        <td>
                            {{item.cantidad}}
                        </td>
                        
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
            </div>

            </div>
          </div>
          <!-- / .row -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from "@/components/Sidebar.vue";
  import TopNav from "@/components/TopNav.vue";
  import axios from 'axios';
  import currency_formatter from "currency-formatter";
  import moment from 'moment';

  export default {
    name: "DetalleIngresoApp",
    data(){
        return{
            ingreso:{},
            detalles:[]
        }
    },
    beforeMount(){
        this.init_data();
    },
    methods:{
        init_data(){
            axios.get(this.$url + "/obtener_detalles_ingreso_admin/"+this.$route.params.id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: this.$store.state.token,
            },
            })
            .then((result) => {
                this.ingreso = result.data.ingreso;
                this.detalles = result.data.detalles;
            
            });
        },
        convertCurrency(number) {
        return currency_formatter.format(number, { code: "PEN" });
        },
        convertDate(item){
        return moment(item).format('DD/MM/YYYY');
        },
    },
    components: {
      Sidebar,
      TopNav,
    },
  };
  </script>
  