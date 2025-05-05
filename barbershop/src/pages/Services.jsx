import Carousel from "../components/Carousel";

export default function Services() {
  const images = [
    {
        id: 0,
        class: "carousel-item active",
        state: "active",
        img: "/images/about-1.jpg" 
    }, 
    {
        id: 1,
        class: "carousel-item",
        state: "",
        img: "/images/about-2.jpg"
    },
    {
        id: 2,
        class: "carousel-item",
        state: "",
        img: "/images/about-3.jpg"
    }
]
  return (
    <>
      <Carousel img={images} />
      <h2>Imagen de prueba</h2>
      <img src="/images/about-1.jpg" alt="Prueba" style={{ width: '300px' }} />
    </>
  )
}
