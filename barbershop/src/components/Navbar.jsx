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
      link: "/about"
    },
    {
      id: 2,
      nombre: "Services",
      link: "/services"
    },
    {
      id: 3,
      nombre: "Gallery",
      link: "/gallery"
    },
    {
      id: 4,
      nombre: "Pricing",
      link: "/pricing"
    },
    {
      id: 5,
      nombre: "Contact",
      link: "/contact"
    }
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand text-light">BarberShop</Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {opciones.map((opcion) => (
              <li className="nav-item" key={opcion.id}>
                <Link to={opcion.link} className="nav-link active text-light">
                  {opcion.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <span className="navbar-text">
          <Link to="/appointment" className="btn btn-secondary">
            Make Appointment
          </Link>
        </span>
      </div>
    </nav>
  );
}
