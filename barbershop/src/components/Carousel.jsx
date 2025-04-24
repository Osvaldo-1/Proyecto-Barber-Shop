
export default function carousel() {
    const images = [
        {
            id: 0,
            class: "carousel-item active",
            state: "active",
            img: "/images/barbershop_image_1.jpg" 
        }, 
        {
            id: 1,
            class: "carousel-item",
            state: "",
            img: "/images/barbershop_image_2.jpg"
        },
        {
            id: 2,
            class: "carousel-item",
            state: "",
            img: "/images/barbershop_image_3.jpg"
        }
    ]

  return (
    <div class="d-flex justify-content-center align-items-center my-4 w-full">
        <section class="carousel slide w-75 mx-auto"  id="home-section" data-bs-ride="carousel">
            <div class="carousel-indicators">
                {images.map((image) => (
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={image.id} class={image.state} aria-current="true" aria-label={`Slide ${image.id}`}></button>
                ))}
            </div>

            <div class="carousel-inner">
                {images.map((image) => (
                    <div class={image.class} key={image.id}>
                        <img class="d-block w-100" src={image.img} alt="First slide" />
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
