import React from 'react';
import '../Styles/About.css';

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">Nuestros Servicios</h2>
      <p className="about-description">
        Bienvenido a una experiencia de cuidado personal como ninguna otra. Los servicios que ofrecemos van más allá de lo
        común, adoptando la herencia de la barbería clásica e incorporando técnicas de vanguardia.
      </p>
      <div className="about-content">
        <div className="about-image">
          <img src="https://images.fresha.com/lead-images/placeholders/barbershop-101.jpg?class=width-small" alt="Barber Service" />
        </div>
        <div className="about-services">
          <div className="service-card">
            <div className="icon-box">🪒</div>
            <div>
              <h3>ACCESORIOS</h3>
              <p>
                Encuentra los mejores productos y herramientas para el cuidado masculino, seleccionados con calidad premium.
              </p>
            </div>
          </div>
          <div className="service-card">
            <div className="icon-box">🧖</div>
            <div>
              <h3>ROSTRO</h3>
              <p>
                Tratamientos faciales personalizados para revitalizar tu piel y resaltar tu mejor versión.
              </p>
            </div>
          </div>
          <div className="service-card">
            <div className="icon-box">✂️</div>
            <div>
              <h3>AFEITADO</h3>
              <p>
                Afeitado clásico con toalla caliente, precisión y confort garantizados.
              </p>
            </div>
          </div>
          <div className="service-card">
            <div className="icon-box">💇</div>
            <div>
              <h3>CABELLO</h3>
              <p>
                Cortes modernos y tradicionales adaptados a tu estilo, con asesoría profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
