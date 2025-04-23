import logo from "../logo.svg";

export default function carousel() {
    const images = [
        {
            id: 0,
            class: "carousel-item active",
            state: "active",
            texto: "hola que tal",
            img: logo 
        }, 
        {
            id: 1,
            class: "carousel-item",
            state: "",
            texto: "esto es una prueba",
            img: logo
        },
        {
            id: 2,
            class: "carousel-item",
            state: "",
            texto: "para mostrar datos dinámicos",
            img: logo
        }
    ]

  return (
    <div class="d-flex justify-content-center align-items-center mt-4">
        <section class="carousel slide" style={{width: "600px"}} id="home-section">
            <div class="carousel-indicators">
                {images.map((image) => (
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={image.id} class={image.state} aria-current="true" aria-label={`Slide ${image.id}`}></button>
                ))}
            </div>

            <div class="carousel-inner">
                {images.map((image) => (
                    <div class={image.class} key={image.id}>
                        <img class="d-block w-100" src={image.img} alt="First slide" />
                        <div class="carousel-caption d-none d-md-block">
                            <h3>{image.texto}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#home-section" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#home-section" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
	    </section>
    </div>
  )
}
