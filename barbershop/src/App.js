//import logo from './logo.svg';
//import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import Services from './pages/Services.jsx'
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Galery from './pages/Galery.jsx';
import Contact from './pages/Contact.jsx';
import Navbar from './components/Navbar.jsx';
import Appointment from './pages/Appointment.jsx';
import Header from './components/Header.jsx';


function App() {
  return (
    <div className="App">
 
      <Navbar />
      <Header />
      <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />  
          <Route path="/pricing" element={<Pricing />} />  
          <Route path="/about" element={<About />} />  
          <Route path="/gallery" element={<Galery />} />  
          <Route path="/contact" element={<Contact />} />  
          <Route path="/appointment" element={<Appointment />} />"
      </Routes> 
    </div>
  );
}

export default App;
