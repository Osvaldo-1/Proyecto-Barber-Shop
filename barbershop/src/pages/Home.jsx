import Carousel from '../components/Carousel.jsx';
import About from './About.jsx';
import Footer from './Footer.jsx';

export default function Home() {
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
    <>
      <Carousel img={images} />
      <About />
      <Footer />
    </>
  )
}
