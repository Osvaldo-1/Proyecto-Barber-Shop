import React from "react";

export default function Services() {
  return (
    <section className="services_section" id="services">
      <div className="container">
        <div className="section_heading text-center mb-5">
          <h3>Trendy Salon & Spa</h3>
          <h2>Our Services</h2>
          <div
            className="heading-line mx-auto"
            style={{ width: "60px", height: "3px", background: "#000" }}
          ></div>
        </div>

        <div className="row g-4">
          {/* Service 1: Haircut Styles */}
          <div className="col-lg-3 col-md-6">
            <div className="service_box p-4 border rounded text-center">
              <i className="bs bs-scissors fs-1 mb-3"></i> {/* Asegúrate que el icono sea correcto */}
              <h3>Haircut Styles</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>

          {/* Service 2: Beard Trimming */}
          <div className="col-lg-3 col-md-6">
            <div className="service_box p-4 border rounded text-center">
              <i className="bs bs-razor fs-1 mb-3"></i> {/* Asegúrate que el icono sea correcto */}
              <h3>Beard Trimming</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>

          {/* Service 3: Smooth Shave */}
          <div className="col-lg-3 col-md-6">
            <div className="service_box p-4 border rounded text-center">
              <i className="bs bs-brush fs-1 mb-3"></i> {/* Asegúrate que el icono sea correcto */}
              <h3>Smooth Shave</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>

          {/* Service 4: Face Masking */}
          <div className="col-lg-3 col-md-6">
            <div className="service_box p-4 border rounded text-center">
              <i className="bs bs-hairbrush fs-1 mb-3"></i> {/* Asegúrate que el icono sea correcto */}
              <h3>Face Masking</h3>
              <p>Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
