import logo from "../logo.svg";

export default function carousel() {
  return (
    <section class="carousel slide w-50" id="home-section">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src={logo} alt="First slide" />
                <div class="carousel-caption d-none d-md-block">
                    <h3>It's Not Just a Haircut, It's an Experience.</h3>
                    <p>
                        Our barbershop is the territory created purely for males who 1 appreciate
                        <br />
                        premium quality, time and flawless look.
                    </p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src={logo} alt="Second slide" />
                <div class="carousel-caption d-none d-md-block">
                    <h3>It's Not Just a Haircut, It's an Experience.</h3>
                    <p>
                        Our barbershop is the territory created purely for males 2 who appreciate
                        <br />
                        premium quality, time and flawless look.
                    </p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src={logo} alt="Third slide" />
                <div class="carousel-caption d-none d-md-block">
                    <h3>It's Not Just a Haircut, It's an Experience.</h3>
                    <p>
                        Our barbershop is the territory created purely for males 3 who appreciate
                        <br />
                        premium quality, time and flawless look.
                    </p>
                </div>
            </div>
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
  )
}
