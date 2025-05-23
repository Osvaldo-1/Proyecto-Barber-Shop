import React from 'react';
import '../Styles/Footer.css'; // Asegúrate de tener esta ruta correcta

export default function Footer() {
  return (
    <section className="widget_section bg-dark text-light py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Acerca de nosotros */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="mb-3">Acerca de nosotros</h4>
              <p>
                Nuestra barbería es creada para aquellos que buscan calidad, estilo y frescura.
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
              <p>
                barberclub@gmail.com<br />
                (+52) 81 1596 8874
              </p>
            </div>
          </div>

          {/* Horarios */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="mb-3">Horario</h4>
              <ul className="list-unstyled">
                <li>Lun - Vie: 12:30pm - 8:00pm</li>
                <li>Sábados: 10:00am - 6:00pm</li>
                <li>Domingos: Cerrado</li>
              </ul>
            </div>
          </div>

          {/* Redes */}
          <div className="col-lg-3 col-md-6 order-lg-4">
            <div className="footer_widget">
              <h4 className="mb-3">Redes</h4>

              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                <i className="bi bi-whatsapp" style={{ color: '#25D366', fontSize: '1.4rem' }}></i>
                <a
                  href="https://wa.me/528115968874"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  WhatsApp
                </a>
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                <i className="bi bi-facebook" style={{ color: '#3b5998', fontSize: '1.4rem' }}></i>
                <a
                  href="https://www.facebook.com/rockbarberclubnl?mibextid=JRoKGi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Facebook
                </a>
              </span>
            </div>
          </div>
        </div>

        <hr className="bg-secondary my-4" />
        <p className="text-center mb-0 small">&copy; 2025 Barbershop. Todos los derechos reservados.</p>
      </div>
    </section>
  );
}
