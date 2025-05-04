
import React, { useEffect, useState } from 'react';
// Asegúrate de que el CSS se importe correctamente

export default function Pricing() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener categorías con sus servicios
    fetch('/api/service-categories-with-services') // Cambia esta ruta a la correcta en tu backend
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching pricing data:', err));
  }, []);

  return (
    <section className="pricing_section" id="pricing">
      <div className="container">
        <div className="section_heading">
          <h3>Save 20% On Beauty Spa</h3>
          <h2>Our Barber Pricing</h2>
          <div className="heading-line"></div>
        </div>
        <div className="row">
          {categories.map(category =>
            category.services && category.services.length > 0 ? (
              <div key={category.category_id} className="col-lg-4 col-md-6 sm-padding">
                <div className="price_wrap">
                  <h3>{category.category_name}</h3>
                  <ul className="price_list">
                    {category.services.map(service => (
                      <li key={service.service_id}>
                        <h4>{service.service_name}</h4>
                        <p>{service.service_description}</p>
                        <span className="price">${service.service_price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  )
}