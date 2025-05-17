import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import AdminDashboard from './pages/Adminhome.jsx';
import { Comentario } from './pages/Comentario.jsx';
import StatusCita from './pages/StatusCita.jsx';

import AdminLayout from './layouts/Adminlayout';

import DashboardOverview from './components/AdminDashboardOverview';
import AppointmentsList from './components/AdminAppointmentsList';
import ServicesManagement from './components/AdminServicesManagement';
import UsersManagement from './components/AdminUsersManagement';
import Settings from './components/AdminSettings';
function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Navbar />
      <Routes>

        {/*/Rutas publicas */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/comentario" element={<Comentario />} />
        <Route path="/status" element={user ? <StatusCita /> : <Navigate to="/login" />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={user ? <Appointment /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
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
