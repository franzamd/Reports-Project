import React from "react";
import "./creative.css";

const LadingPage = () => {
  return (
    <div>
      {/* <!-- Navigation --> */}
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">
            Reportes YPFB
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto my-2 my-lg-0">
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#about">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#services">
                  Registro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <!-- Masthead --> */}
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-10 align-self-end">
              <h1 className="text-uppercase text-white font-weight-bold">
                Tu lugar de trabajo en un solo lugar
              </h1>
              <hr className="divider my-4" />
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-white-75 font-weight-light mb-5">
                Bienvenidos al aplicacion de gestión y control de carburantes y
                carga nacional e internacional. Reportes YPFB
              </p>
              <a
                className="btn btn-primary btn-xl js-scroll-trigger"
                href="#about"
              >
                Acceder a la Aplicación
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- About Section --> */}
      <section className="page-section bg-primary" id="about">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="text-white mt-0">Tenemos lo que necesitas!</h2>
              <hr className="divider light my-4" />
              <p className="text-white-50 mb-4">
                Reportes YPFB tiene todo lo que necesita para poner en
                funcionamiento sus nuevo registros de carga y transporte web en
                muy poco tiempo! Eliga una categoria de nuestros reportes
                personalizados y fáciles de usar! ¡Sin ataduras!
              </p>
              <a
                className="btn btn-light btn-xl js-scroll-trigger"
                href="#services"
              >
                Acceder a la Aplicación
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Services Section --> */}
      <section className="page-section" id="services">
        <div className="container">
          <h2 className="text-center mt-0">Nuestros servicios</h2>
          <hr className="divider my-4" />
          <div className="row">
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-users text-primary mb-4"></i>
                <h3 className="h4 mb-2">Choferes</h3>
                <p className="text-muted mb-0">
                  Gestión de todos los choferes que trabajan en el trasnporte
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-truck text-primary mb-4"></i>
                <h3 className="h4 mb-2">Vehiculos</h3>
                <p className="text-muted mb-0">
                  Gestión de todos los vehiculos que circulan y viajan en las
                  rutas
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-handshake text-primary mb-4"></i>
                <h3 className="h4 mb-2">Empresas</h3>
                <p className="text-muted mb-0">
                  Gestión de todas empresas proveedoras de la carga de
                  trasnporte con sus encargados
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-bookmark text-primary mb-4"></i>
                <h3 className="h4 mb-2">Hojas de Rutas</h3>
                <p className="text-muted mb-0">
                  Gestión de todas las rutas de trasnporte que realizan las
                  empresas de trasnporte
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LadingPage;
