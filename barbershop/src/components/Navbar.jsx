import { Link } from "react-router-dom";

export default function Navbar() {

  const opciones = [
    {
      id: 0,
      nombre: "Home",
      link: "/"
    },
    {
      id: 1,
      nombre: "About",
      link: "about"
    },
    {
      id: 2,
      nombre: "Services",
      link: "services"
    },
    {
      id: 3,
      nombre: "Galery",
      link: "gallery"
    },
    {
      id: 4,
      nombre: "Pricing",
      link: "pricing"
    },
    {
      id: 5,
      nombre: "Contact",
      link: "contact"
    }
  ]

  return (
    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <Link to="/" class="navbar-brand text-light">BarberShop</Link>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  {opciones.map((opcion) => (
                    <li class="nav-list" key={opcion.id}>
                      <Link to={opcion.link} class="nav-link active text-light">{opcion.nombre}</Link>
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
