import React, { useState } from 'react';
import '../Styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    setTimeout(() => {
        setLoading(false);
        setStatusMessage('Your message has been sent successfully!');
    }, 2000);
  };

  return (
    <section className="contact-section" id="contact-us">
      <div className="section-heading">
        <h3>Contáctanos</h3>
        <h2>¡Comunícate con nosotros!</h2>
        <div className="heading-line"></div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6 sm-padding">
            <div className="contact-info">
              <h2>
                Get in touch with us & 
                <br />send us a message today!
              </h2>
              <p>
                Saasbiz is a different kind of architecture practice. Founded by LoganCee in 1991, we’re an employee-owned firm pursuing a democratic design process that values everyone’s input.
              </p>
              <h3>
                198 West 21th Street, Suite 721 
                <br />
                New York, NY 10010
              </h3>
              <h4>
                <span>Email:</span> Dynamiclayers.Net <br /> 
                <span>Phone:</span> +88 (0) 101 0000 000 <br /> 
                <span>Fax:</span> +88 (0) 202 0000 001
              </h4>
            </div>
          </div>

          <div className="col-lg-6 sm-padding">
            <div className="contact-form">
              <div className="contactForm">
                <form onSubmit={handleSubmit}>
                  <div className="form-group colum-row row">
                    <div className="col-sm-6">
                      <input 
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input 
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <input 
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <textarea 
                        name="message"
                        cols="30"
                        rows="5"
                        className="form-control message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <button 
                        className="default_btn"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
                {loading && (
                  <img
                    src="/images/ajax_loader_gif.gif"
                    alt="Loading..."
                    id="contact_ajax_loader"
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                )}
                {statusMessage && <div id="contact_status_message">{statusMessage}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
