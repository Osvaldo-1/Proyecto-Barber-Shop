import React from 'react'


export default function Galery() {
  const images = [
    { src: '/images/portfolio-1.jpg'},
    { src: '/images/portfolio-2.jpg'},
    { src: '/images/portfolio-3.jpg'},
    { src: '/images/portfolio-4.jpg'},
    { src: '/images/portfolio-5.jpg'},
    { src: '/images/portfolio-6.jpg'},
    { src: '/images/portfolio-7.jpg'},
    { src: '/images/portfolio-8.jpg'}
  ]
  return (
    <section className="gallery-section" id="gallery">
    <div className="section_heading">
      <h3>Trendy Salon & Spa</h3>
      <h2>Barbers Gallery</h2>
      <div className="heading-line"></div>
    </div>
    <div className="container">
      <div className="row">
        {images.map((img, index) => (
          <div className="col-lg-3 col-md-6 gallery-column mb-3 px-2 " key={index}>
            <div style={{ height: '230px' }}>
              <div
                className="gallery-img"
                style={{
                  backgroundImage: `url('${img.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '230px',
                  width: '100%',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}
