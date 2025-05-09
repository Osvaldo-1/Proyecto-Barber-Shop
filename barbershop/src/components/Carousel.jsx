import "../Styles/Carousel.css"
export default function Carousel(props) {
    const result = [props]
    var values = []
    Object.entries(result).forEach(([clave, img]) => {
        var i = img.img

        var iter = i.length 
        
        for(let z = 0; z < iter; z++){
            values.push(i[z])
        }
        console.log(values);
    });

  return (
    <div className="d-flex justify-content-center align-items-center w-full">
        <section className="carousel slide w-full mx-auto"  id="home-section" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {values.map((image) => (
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={image.id} className={image.state} aria-current="true" aria-label={`Slide ${image.id}`}></button>
                ))}
            </div>

            <div className="carousel-inner">
                {values.map((image) => (
                    <div className={image.class} key={image.id} data-bs-interval="1000">
                        <img className="d-block w-100" src={image.img} alt="First slide" />
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#home-section" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#home-section" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
	    </section>
    </div>
  )
}
