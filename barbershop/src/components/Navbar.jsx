
export default function Navbar() {

  const opciones = [
    {
      id: 0,
      nombre: "Home"
    },
    {
      id: 1,
      nombre: "About"
    },
    {
      id: 2,
      nombre: "Services"
    },
    {
      id: 3,
      nombre: "Galery"
    },
    {
      id: 4,
      nombre: "Pricing"
    },
    {
      id: 5,
      nombre: "Contact"
    }
  ]

  return (
    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand text-light" href="/">BarberShop</a>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  {opciones.map((opcion) => (
                    <li class="nav-list" key={opcion.id}>
                      <a class="nav-link active text-light" href="#home">{opcion.nombre}</a>
                    </li>
                  ))}
                </ul>
            </div>
            <span class="navbar-text">
              <button type="button" class="btn btn-secondary">Make Appointment</button>
            </span>
        </div>
    </nav>
  )
}
