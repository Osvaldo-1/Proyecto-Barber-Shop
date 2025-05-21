import React from 'react';
import '../Styles/Footer.css'; // Asegúrate de tener estilos adicionales si lo necesitas

export default function Footer() {
  return (
    <section className="widget_section bg-dark text-light py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Logo y descripción */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="mb-3">Acerca de nosotros</h4>
              <p>
                Nuestra baerberia es creada para aquellos que buscan calidad, estilo , y frescura.
              </p>
              <ul className="list-inline mt-3">
                <li className="list-inline-item me-3">
                  <a href="https://www.facebook.com/" title="Facebook" className="text-light fs-4">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item me-3">
                  <a href="https://x.com/?lang=es" title="Twitter" className="text-light fs-4">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.instagram.com/" title="Instagram" className="text-light fs-4">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Dirección */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="mb-3">Dirección</h4>
              <p>Av Alfonso Reyes 423, Los Soles, 66610 Cdad. Apodaca, N.L.</p>
              <p> barberclub@gmail.com<br />
                (+52) 81 1596 8874
              </p>
            </div>
          </div>

          {/* Horarios */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="mb-3">Horario</h4>
              <ul className="list-unstyled">
                <li>Lun - Vie: 12:30am - 8:00pm</li>
                <li>Sabados: 10:00am - 6:00pm</li>
                <li>Domingos: Closed</li>
              </ul>
            </div>
          </div>

          {/* Suscripción */}

        </div>

        <hr className="bg-secondary my-4" />
        <p className="text-center mb-0 small">&copy; 2025 Barbershop. All rights reserved.</p>
      </div>
    </section>
  );
}

