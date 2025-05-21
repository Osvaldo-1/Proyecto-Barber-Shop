import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Navbar from './components/Navbar.jsx';
import Appointment from './pages/Appointment.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import Adminhome from './pages/Adminhome.jsx';
import { Comentario } from './pages/Comentario.jsx';
import StatusCita from './pages/StatusCita.jsx';

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  // Mostrar Navbar solo si NO estamos en ruta /admin
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/admin/*" element={
          user?.rol === 1  // validar que rol sea número 1
            ? <Adminhome />
            : <Navigate to="/login" />
        } />
        <Route path="/home" element={<Home />} />
        <Route path="/comentario" element={<Comentario />} />
        <Route path="/status" element={user ? <StatusCita /> : <Navigate to="/login" />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/appointment"
          element={user ? <Appointment /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
