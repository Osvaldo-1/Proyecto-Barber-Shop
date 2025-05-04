
import React from 'react'

export default function Footer() {
  return (
    <section className="widget_section">
    <div className="container">
      <div className="row">
        {/* Logo y descripción */}
        <div className="col-lg-3 col-md-6">
          <div className="footer_widget">
            <p>
              Our barbershop is created for men who appreciate premium quality, time, and a flawless look.
            </p>
            <ul className="widget_social">
              <li><a href="https://www.facebook.com/" title="Facebook"><i className="fab fa-facebook-f fa-2x"></i></a></li>
              <li><a href="https://x.com/?lang=es" title="Twitter"><i className="fab fa-twitter fa-2x"></i></a></li>
              <li><a href="https://www.instagram.com/" title="Instagram"><i className="fab fa-instagram fa-2x"></i></a></li>            </ul>
          </div>
        </div>

        {/* Dirección */}
        <div className="col-lg-3 col-md-6">
          <div className="footer_widget">
            <h3>Headquarters</h3>
            <p>962 Fifth Avenue, 3rd Floor New York, NY10022</p>
            <p>
              contact@barbershop.com
              <br />
              (+123) 456 789 101
            </p>
          </div>
        </div>

        {/* Horarios */}
        <div className="col-lg-3 col-md-6">
          <div className="footer_widget">
            <h3>Opening Hours</h3>
            <ul className="opening_time">
              <li>Monday - Friday 11:30am - 8:00pm</li>
              <li>Saturday 10:00am - 6:00pm</li>
              <li>Sunday Closed</li>
            </ul>
          </div>
        </div>

        {/* Suscripción */}
        <div className="col-lg-3 col-md-6">
          <div className="footer_widget">
            <h3>Subscribe to our contents</h3>
            <div className="subscribe_form">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  name="EMAIL"
                  id="subs-email"
                  className="form_input"
                  placeholder="Email Address..."
                  required
                />
                <button type="submit" className="submit">SUBSCRIBE</button>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
