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
              <h4 className="mb-3">About Us</h4>
              <p>
                Our barbershop is created for men who appreciate premium quality, time, and a flawless look.
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
              <h4 className="mb-3">Headquarters</h4>
              <p>962 Fifth Avenue, 3rd Floor<br />New York, NY10022</p>
              <p>
                contact@barbershop.com<br />
                (+123) 456 789 101
              </p>
            </div>
          </div>

          {/* Horarios */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="mb-3">Opening Hours</h4>
              <ul className="list-unstyled">
                <li>Mon - Fri: 11:30am - 8:00pm</li>
                <li>Saturday: 10:00am - 6:00pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Suscripción */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="mb-3">Subscribe</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="EMAIL"
                    id="subs-email"
                    className="form-control"
                    placeholder="Email Address..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-outline-light w-100">SUBSCRIBE</button>
              </form>
            </div>
          </div>
        </div>

        <hr className="bg-secondary my-4" />
        <p className="text-center mb-0 small">&copy; 2025 Barbershop. All rights reserved.</p>
      </div>
    </section>
  );
}

