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
                    <h6 class="header-pretitle">Productos</h6>

                    <!-- Title -->
                    <h1 class="header-title">Galeria de producto</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/producto" class="nav-link"
                          >Todos los productos</router-link
                        >
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active"> Galeria de producto</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="load_data">
              <div class="row">
                <div class="col-12 text-ecnter">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="!load_data">
              <div>
                <div class="mb-7" v-if="data">
                  <div class="row">
                    <div class="col-12 col-md-12">
                      <!-- Email address -->
                      <div class="form-group">
                        <!-- Label -->
                        <label class="mb-1"> Imagen </label>

                        <!-- Input -->
                        <div class="input-group mb-3">
                          <input
                            id="imput_file"
                            type="file"
                            class="form-control"
                            placeholder="Selecciona la imagen"
                            v-on:change="uploadImage($event)"
                          />
                          <button
                            class="btn btn-primary"
                            v-on:click="subir_imagen()"
                          >
                            <i class="fe fe-upload"></i>
                          </button>
                        </div>
                        <!-- Form text -->
                        <small class="form-text text-muted">
                          Subo un maximo de 5 imagenes para la galeria del
                          producto.
                        </small>
                      </div>
                    </div>
                  </div>
                  <!-- / .row -->

                  <div class="row listAlias" v-if="!load_galeria">
                    <div
                      class="col-12 col-md-6 col-xl-4"
                      v-for="item in galeria"
                    >
                      <div class="card">
                        <a href="project-overview.html">
                          <img
                            :src="
                              $url + '/obtener_galeria_producto/' + item.imagen
                            "
                            alt="..."
                            class="card-img-top"
                          />
                        </a>
                        <div class="card-footer card-footer-boxed">
                          <div class="row">
                            <div class="col text-center">
                              <a
                                v-b-modal="'delete-' + item._id"
                                style="cursor: pointer"
                                class="text-danger"
                                >Eliminar imagen</a
                              >
                              <b-modal
                                centered
                                :id="'delete-' + item._id"
                                title="BootstrapVue"
                                title-html="<h4 class='card-header-title'><b>Eliminar Imagen</b></h4>"
                                @ok="eliminar(item._id)"
                              >
                                <p class="my-4">{{ item._id }}</p>
                              </b-modal>
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mt-5" v-if="load_galeria">
                    <div class="col-12 text-center">
                      <img
                        src="/assets/img/reloj.gif"
                        alt=""
                        style="width: 80px"
                      />
                    </div>
                  </div>
                </div>

                <template v-if="!data">
                  <div>
                    <ErrorNotFound></ErrorNotFound>
                  </div>
                </template>
              </div>
            </template>

            <div></div>
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
import ErrorNotFound from "@/components/ErrorNotFound.vue";
import $ from "jquery";
import axios from "axios";

export default {
  name: "GaleriaProductoApp",
  components: {
    Sidebar,
    TopNav,
    ErrorNotFound,
  },
  data() {
    return {
      imagen: undefined,
      str_image: "",
      data: false,
      load_data: true,
      load_galeria: true,
      galeria: [],
    };
  },

  methods: {
    init_data() {
      this.load_data = true;
      axios
        .get(this.$url + "/obtener_producto_admin/" + this.$route.params.id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        })
        .then((result) => {
          console.log(result);
          if (result.data == "") {
            this.data = false;
          } else {
            this.data = true;
            this.producto = result.data;
            this.str_image =
              this.$url + "/obtener_portada_producto/" + this.producto.portada;
          }
          this.load_data = false;
        });
    },
    uploadImage($event) {
      var image;
      if ($event.target.files.length >= 1) {
        image = $event.target.files[0];
      }
      if (image.size <= 1000000) {
        if (
          image.type == "image/jpeg" ||
          image.type == "image/png" ||
          image.type == "image/webp" ||
          image.type == "image/jpg"
        ) {
          this.str_image = URL.createObjectURL(image);
          this.imagen = image;
        } else {
          this.$notify({
            group: "foo",
            title: "ERROR",
            text: "El recurso debe ser una imagen",
            type: "error",
          });
          this.imagen = undefined;
          $("#imput_file").val("");
        }
      } else {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "La imagen debe ser menos de 1MB",
          type: "error",
        });
        this.imagen = undefined;
        $("#imput_file").val("");
      }
      console.log(this.imagen);
    },
    subir_imagen() {
      if (this.imagen == undefined) {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "Selecciona una imagen para poder subir",
          type: "error",
        });
      } else {
        var fm = new FormData();
        fm.append("producto", this.$route.params.id);
        fm.append("imagen", this.imagen); //imagen de portada

        axios
          .post(this.$url + "/subir_imagen_producto_admin", fm, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.$store.state.token,
            },
          })
          .then((result) => {
            if (result.data.message) {
              this.$notify({
                group: "foo",
                title: "ERROR",
                text: result.data.message,
                type: "error",
              });
            } else {
              this.$notify({
                group: "foo",
                title: "SUCCESS",
                text: "Se subió la imagen",
                type: "success",
              });
              this.init_galeria();
            }
          });
      }
    },
    init_galeria() {
      this.load_galeria = true;
      axios
        .get(
          this.$url +
            "/obtener_galeria_producto_admin/" +
            this.$route.params.id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$store.state.token,
            },
          }
        )
        .then((result) => {
          console.log(result);
          this.galeria = result.data;
          this.load_galeria = false;
        });
    },
    eliminar(id) {
      axios
        .delete(this.$url + "/eliminar_galeria_producto_admin/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        })
        .then((result) => {
          if (result.data.message) {
            this.$notify({
              group: "foo",
              title: "SUCCESS",
              text: result.data.message,
              type: "error",
            });
          } else {
            this.$notify({
              group: "foo",
              title: "SUCCESS",
              text: "Se eliminó la imagen",
              type: "success",
            });
            this.init_galeria();
          }
        });
    },
  },
  beforeMount() {
    this.init_data();
    this.init_galeria();
  },
};
</script>
