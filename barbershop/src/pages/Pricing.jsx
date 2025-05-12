import React, { useEffect, useState } from 'react';
import "../Styles/Pricing.css";
import { fetchData } from '../supabaseService.js';

export default function Pricing() {
  const [services, setServices] = useState([]); // ✅ Esto resuelve el error

  useEffect(() => {
    const getServices = async () => {
      const { data, error } = await fetchData('servicio');
      if (error) {
        console.error('Error al obtener servicios:', error.message);
      } else {
        setServices(data);
      }
    };

    getServices();
  }, []);

  return (
    <section className="pricing_section" id="pricing">
      <div className="container">
        <div className="section_heading">
          <h3 className="subtitle">Save 20% On Beauty Spa</h3>
          <h2 className="title">Our Barber Pricing</h2>
          <div className="heading-line"></div>
        </div>

        <div className="row">
          {services.map(service => (
            <div key={service.id} className="col-lg-4 col-md-6 sm-padding">
              <div className="price_card">
                {service.imagen && (
                  <img
                    src={service.imagen}
                    alt={service.nombreservicio}
                    className="service-image"
                  />
                )}
                <div className="price_content">
                  <h4 className="service-name">{service.nombreservicio}</h4>
                  <p className="service-description">{service.descripcion}</p>
                  <div className="price-details">
                    <span className="price">${service.precio}</span>
                    <br></br>
                    <span className="duration">{service.duracionminutos} min</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}