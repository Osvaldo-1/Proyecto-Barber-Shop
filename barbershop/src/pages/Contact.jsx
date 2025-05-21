import React from 'react';
import '../Styles/Contact.css';

export default function Contact() {
  return (
    <section className="contact-section" id="contact-us">
      <div className="section-heading">
        <h3>Contáctanos</h3>
        <h2>¡Comunícate con nosotros!</h2>
        <div className="heading-line"></div>
      </div>

      <div className="container">
        <div className="row">
          {/* Columna izquierda - Información */}
          <div className="col-lg-6 sm-padding">
            <div className="contact-info">
              <h2>
                Mantente en contacto con nosotros
                <br />Envíanos un mensaje, ¡si tienes alguna duda!
              </h2>
              <p>
                En Rock Barber, tu estilo es nuestra prioridad. Nos apasiona ofrecer experiencias únicas a cada cliente, por eso estamos siempre disponibles para atender tus dudas, agendar tu próxima cita o simplemente ayudarte a encontrar el corte que mejor se adapta a ti.
              </p>
              <h3>
                Av Alfonso Reyes 423, Los Soles, 66610 Cdad. Apodaca, N.L. 
                <br />
                New York, NY 10010
              </h3>
              <h4>
                <span>Email:</span> barberclub@gmail.com <br /> 
                <span>Phone:</span> +52 81 1596 8874 <br /> 
              </h4>

              {/* WhatsApp */}
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

              {/* Facebook */}
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

          {/* Columna derecha - Imagen */}
          <div className="col-lg-6 sm-padding">
            <div className="contact-image-box">
              <img
                src="https://images.fresha.com/lead-images/placeholders/barbershop-88.jpg?class=width-small"
                alt="Rock Barber"
                className="contact-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}