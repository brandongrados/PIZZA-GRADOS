<template>
  <footer class="main-footer">
    <!-- Services block-->
    <div class="text-dark-700 py-6">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 service-column">
            <img class="svg-icon service-icon" src="/assets/media/moto.gif">
            <div class="service-text">
              <h6 class="text-uppercase">Envios</h6>
              <p class="text-muted fw-light text-sm mb-0">
                S/. Gratis a todo Lima
              </p>
            </div>
          </div>
          <div class="col-lg-4 service-column">
            <img class="svg-icon service-icon" src="/assets/media/aplicacion-de-pago.gif">
            <div class="service-text">
              <h6 class="text-uppercase">Pagos  </h6>
              <p class="text-muted fw-light text-sm mb-0">
                Aceptamos Tarjeta o Yape
              </p>
            </div>
          </div>
          <div class="col-lg-4 service-column">
            <img class="svg-icon service-icon" src="/assets/media/whatsapp.png">
            <div class="service-text">
              <h6 class="text-uppercase">936-286-610</h6>
              <p class="text-muted fw-light text-sm mb-0">
                Atención de lunes a domingo de 1pm a 11pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main block - menus, subscribe form-->
    <div class="py-6 text-muted" style="background-color: #cb250e !important;">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mb-5 mb-lg-0">
            <div class="fw-bold text-uppercase text-lg text-white mb-3">
              Sell<span style="color:white">.</span>
            </div>
            <p class="text-white">Siguenos en nuestras redes sociales.</p>
            <ul class="list-inline">
              <li class="list-inline-item">
                <a
                  class="text-muted text-primary-hover"
                  href="#"
                  target="_blank"
                  title="facebook"
                  >
                <img src="/assets/media/facebook.png" style="width: 20px;">
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  class="text-muted text-primary-hover"
                  href="#"
                  target="_blank"
                  title="twitter-alt"
                  ><img src="/assets/media/twitter-alt.png" style="width: 20px;">
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  class="text-muted text-primary-hover"
                  href="#"
                  target="_blank"
                  title="instagram"
                  ><img src="/assets/media/instagram.png" style="width: 20px;"></img
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Copyright section of the footer-->
    <div class="py-4 fw-light text-gray-300" style="background-color: #1e1e1e !important;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-md-0">
              &copy; {{year}} Mi tienda. Todos los derechos reservados.
            </p>
          </div>
          <div class="col-md-6">
            <ul class="list-inline mb-0 mt-2 mt-md-0 text-center text-md-end">
              <li class="list-inline-item">
                <img
                  class="w-2rem"
                  src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/visa.svg"
                  alt="..."
                />
              </li>
              <li class="list-inline-item">
                <img
                  class="w-2rem"
                  src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/mastercard.svg"
                  alt="..."
                />
              </li>
              <li class="list-inline-item">
                <img
                  class="w-2rem"
                  src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/paypal.svg"
                  alt="..."
                />
              </li>
              <li class="list-inline-item">
                <img
                  class="w-2rem"
                  src="https://d19m59y37dris4.cloudfront.net/sell/2-0/img/western-union.svg"
                  alt="..."
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data(){
    return{
      year: new Date().getFullYear(),
    }
  }
};
</script>
