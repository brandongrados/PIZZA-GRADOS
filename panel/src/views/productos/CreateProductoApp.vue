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
                    <h1 class="header-title">Nuevo producto</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link class="nav-link" to="/producto"
                          >Todos los productos</router-link
                        >
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">Nuevo producto</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!--plantilla-->
            <div class="mb-7">
              <div class="row justify-content-between align-items-center">
                <div class="col">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <!-- Avatar -->
                      <div class="avatar">
                        <img
                          class="avatar-img rounded-circle"
                          :src="str_image"
                          alt="..."
                        />
                      </div>
                    </div>
                    <div class="col ms-n2">
                      <!-- Heading -->
                      <h4 class="mb-1">
                        <b>Portada</b>
                      </h4>

                      <!-- Text -->
                      <small class="text-muted">
                        PNG o JPG no más grande que 1000px ancho y alto
                      </small>
                    </div>
                  </div>
                  <!-- / .row -->
                </div>
                <div class="col-auto">
                  <!-- Button -->

                  <label for="file-upload" class="btn btn-sm btn-primary">
                    Cargar
                  </label>
                  <input
                    style="display: none"
                    id="file-upload"
                    type="file"
                    v-on:change="uploadImage($event)"
                  />
                </div>
              </div>
              <!-- / .row -->

              <!-- Divider -->
              <hr class="my-5" />

              <div class="row">
                <div class="col-12 col-md-12">
                  <!-- Email address -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1"> Título del producto </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                      This contact will be shown to others publicly, so choose
                      it carefully.
                    </small>

                    <!-- Input -->
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Título del producto"
                      v-model="producto.titulo"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- First name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Categoria </label>
                    <small class="form-text text-muted">
                      This contact will be shown to others publicly, so choose
                      it carefully.
                    </small>
                    <!-- Input -->
                    <select
                      name=""
                      class="form-select"
                      v-model="producto.categoria"
                      v-on:change="getSubcategorias($event)"
                    >
                      <option value="" disabled selected>Seleccionar</option>
                      <option :value="item.categoria.titulo" v-for="item in categorias">{{item.categoria.titulo}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- First name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Subcategoría </label>
                    <small class="form-text text-muted">
                      This contact will be shown to others publicly, so choose
                      it carefully.
                    </small>
                    <!-- Input -->
                    <select
                      name=""
                      class="form-select"
                      v-model="producto.subcategoria"
                    >
                      <option value="" disabled selected>Seleccionar</option>
                      <option :value="item.titulo" v-for="item in subcategorias">{{item.titulo}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- Last name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Variedad </label>

                    <!-- Input -->
                    <input
                      type="texto"
                      class="form-control"
                      placeholder="Título de la variedad"
                      v-model="producto.str_variedad"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- Last name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Precio </label>

                    <!-- Input -->
                    <input
                      disabled
                      type="number"
                      class="form-control"
                      placeholder="Precio"
                      value="0"
                    />
                  </div>
                </div>

                <div class="col-12 col-md-12">
                  <!-- Phone -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label"> Extracto </label>

                    <!-- Input -->
                    <textarea
                      class="form-control"
                      id=""
                      rows="3"
                      placeholder="Extracto"
                      v-model="producto.extracto"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!-- / .row -->

              <div class="row">
                <div class="col-12 col-md-6">
                  <!-- Public profile -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1"> Producto publicado </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                      Making your profile public means that anyone on the
                      Dashkit network will be able to find you.
                    </small>

                    <div class="row">
                      <div class="col-auto">
                        <!-- Switch -->
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="switchOne"
                            v-model="producto.estado"
                          />
                          <label
                            class="form-check-label"
                            for="switchOne"
                          ></label>
                        </div>
                      </div>
                      <div class="col ms-n2">
                        <!-- Help text -->
                        <small class="text-muted"> Borrador activado </small>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <!-- Allow for additional Bookings -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1"> En descuento </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                      If you are available for hire outside of the current
                      situation, you can encourage others to hire you.
                    </small>

                    <div class="row">
                      <div class="col-auto">
                        <!-- Switch -->
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="switchTwo"
                            v-model="producto.descuento"
                          />
                          <label
                            class="form-check-label"
                            for="switchTwo"
                          ></label>
                        </div>
                      </div>
                      <div class="col ms-n2">
                        <!-- Help text -->
                        <small class="text-muted">
                          Descuento desactivado
                        </small>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                </div>
              </div>
              <!-- / .row -->

              <!-- Divider -->
              <hr class="mt-4 mb-5" />

              <!-- Button -->
              <button class="btn btn-primary" v-on:click="validar()">
                Crear Producto
              </button>
            </div>

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
import axios from "axios";
//import cloudinary from 'cloudinary';// Configura tus credenciales de API de Cloudinary

/*cloudinary.config({
  cloud_name: 'ddavlkcwx',
  api_key: '633622439537975',
  api_secret: 'UqNdYUNA-v2rdsgtTME2Zo2Xl2Y'
});*/

// ...
export default {
  name: "CreateProductoApp",
  components: {
    Sidebar,
    TopNav,
  },
  data() {
    return {
      str_image: "/assets/img/avatar-1.jpg",
      producto: {
        categoria: "",
        estado: false,
        descuento: false,
        portada: undefined,
        subcategoria:""
      },
      categorias:[],
      subcategorias:[],
      portada: undefined,
    };
  },
  beforeMount(){
    this.init_categorias();
  },
  methods: {
    /*uploadImage($event) {
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
          this.portada = image;
          this.producto.portada = this.portada;
        } else {
          this.$notify({
            group: "foo",
            title: "ERROR",
            text: "El recurso debe ser una imagen",
            type: "error",
          });
          this.portada = undefined;
        }
      } else {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "La imagen debe ser menos de 1MB",
          type: "error",
        });
        this.portada = undefined;
      }
      console.log(this.portada);
    },*/

    /*uploadImage($event) {
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
        // Sube la imagen a Cloudinary
        cloudinary.uploader.upload(image, (result) => {
          this.str_image = result.secure_url;
          this.portada = result.public_id;
          this.producto.portada = this.portada;
        });
      } else {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "El recurso debe ser una imagen",
          type: "error",
        });
        this.portada = undefined;
      }
    } else {
      this.$notify({
        group: "foo",
        title: "ERROR",
        text: "La imagen debe ser menos de 1MB",
        type: "error",
      });
      this.portada = undefined;
    }
    },*/
    async uploadImage(event) {
      if (event.target.files.length === 0) return;

      const image = event.target.files[0];

      if (image.size > 1000000) {
        this.$notify({ group: "foo", title: "ERROR", text: "La imagen debe ser menos de 1MB", type: "error" });
        this.portada = undefined;
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!allowedTypes.includes(image.type)) {
        this.$notify({ group: "foo", title: "ERROR", text: "El recurso debe ser una imagen", type: "error" });
        this.portada = undefined;
        return;
      }

      const formData = new FormData();
      formData.append('image', image); // 'image' es el nombre del campo que el backend espera

      try {
        const response = await fetch('/api/upload-image', { // Ajusta la URL a tu endpoint de backend
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          this.str_image = data.secure_url;
          this.portada = data.public_id;
          this.producto.portada = this.portada;
          this.$notify({ group: "foo", title: "ÉXITO", text: "Imagen subida correctamente", type: "success" });
        } else {
          this.$notify({ group: "foo", title: "ERROR", text: data.msg || "Error al subir la imagen", type: "error" });
          this.portada = undefined;
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        this.$notify({ group: "foo", title: "ERROR", text: "Error de red al subir la imagen", type: "error" });
        this.portada = undefined;
      }
    },

    validar() {
      if (!this.producto.titulo) {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "Ingrese el titulo del producto",
          type: "error",
        });
      } else if (!this.producto.categoria) {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "Seleccione la categoria del producto",
          type: "error",
        });
      }else if (!this.producto.subcategoria) {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "Seleccione la subcategoria del producto",
          type: "error",
        });
      }
      else if (!this.producto.extracto) {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "Ingrese el extracto del producto",
          type: "error",
        });
      } else if (!this.producto.str_variedad) {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "Ingrese la variedad del producto",
          type: "error",
        });
      } else if (this.producto.portada == undefined) {
        this.$notify({
          group: "foo",
          title: "ERROR",
          text: "Seleccione una imagen de portada",
          type: "error",
        });
      } else {
        this.registro();
        //console.log(this.producto);
      }
    },

registro() {
      console.log("Producto portada file:", this.producto.portada);
      var fm = new FormData();
      fm.append("titulo", this.producto.titulo);
      fm.append("categoria", this.producto.categoria);
      fm.append("subcategoria", this.producto.subcategoria);
      fm.append("extracto", this.producto.extracto);
      fm.append("estado", this.producto.estado);
      fm.append("str_variedad", this.producto.str_variedad);
      fm.append("descuento", this.producto.descuento);
      fm.append("portada", this.producto.portada); //imagen de portada

      axios
        .post(this.$url + "/registro_producto_admin", fm, {
          headers: {
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
              text: "Se registró el producto",
              type: "success",
            });
            this.$router.push({ name: "producto-index" });
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          this.$notify({
            group: "foo",
            title: "ERROR",
            text: "No se pudo guardar el producto. Error en la solicitud.",
            type: "error",
          });
        });
    },

    init_categorias(){
            axios
        .get(this.$url + "/listar_categoria_admin", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.token,
          },
        })
        .then((result) => {
        
        this.categorias=result.data;

        });
        },

    getSubcategorias(event){
      /*for(var item of this.categorias){
        if(item.categoria.titulo == event.target.value){
          this.subcategorias = item.subcategorias;
        }
      }*/
      this.subcategorias = this.categorias.filter(item => item.categoria.titulo == event.target.value)[0].subcategorias;
      
      
    }
  },
};
</script>
