import { Link } from "react-router-dom";
import Btn from "./Btn";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto

export default function Navbar() {
  const { user, logout } = useAuth(); // Obtenemos sesión y logout

  const opciones = [
    { id: 0, nombre: "Home", link: "/home" },
    { id: 1, nombre: "About", link: "/about" },
    { id: 2, nombre: "Services", link: "/services" },
    { id: 3, nombre: "Gallery", link: "/gallery" },
    { id: 4, nombre: "Pricing", link: "/pricing" },
    { id: 5, nombre: "Contact", link: "/contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navs">
      <div className="container-fluid px-lg-5">
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
        <Link to="/home" className="navbar-brand text-light">
          <img src="/images/barbershop_logo.png" alt="logo" draggable="false" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {opciones.map((opcion) => (
              <li className="nav-list" key={opcion.id}>
                <Link to={opcion.link} className="nav-link active text-light">
                  <span className="status">{opcion.nombre}</span>
                </Link>
              </li>
            ))}
            {/* Si está logueado como admin, puedes agregar una opción adicional */}
            {user?.user_metadata?.rol === "admin" && (
              <li className="nav-list">
                <Link to="/admin" className="nav-link active text-warning">
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
          <span className="navbar-text d-flex align-items-center gap-3">
            {/* Mostrar botón de cita si está logueado */}
            {user ? (
              <>
                <Link to="/appointment">
                  <Btn text="Make Appointment" classStyle="btn-color" />
                </Link>
                <Btn func={logout} text="Cerrar sesión" classStyle="btn-color"/> 
              </>
            ) : (
              <>
                <Link to="/login" >
                  <Btn text="Login" classStyle="btn-color"/>
                </Link>
                <Link to="/register">
                  <Btn text="Register" classStyle="btn-color"/>
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}
