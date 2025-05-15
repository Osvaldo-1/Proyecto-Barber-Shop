import { Link } from 'react-router-dom'
import Btn from '../components/Btn'

export default function About() {
  return (
    <div className="text-center about_section">
      <div className="row">
        <div className="col-12 col-md-6">
          <section className="">
            <h2 className="titles">The Barber Shop <br />Since 1991</h2>
            <img src="/images/about-logo.png" alt="about"  />
            <p>Barber is a person whose occupation is mainly to cut dress groom style and shave men's and boys' hair. A barber's place of work is known as a "barbershop" or a "barber's". Barbershops are also places of social interaction and public discourse. In some instances, barbershops are also public forums.</p>
            
            <Link to="/about">
              <Btn classStyle="btn-color" text="More about us"/>
            </Link>
          </section>
        </div>
        <div className="col-12 col-md-6">
          <div className="col-md-6 d-none d-md-block">
            { <div className="about_img">
              <img className="about_img_1" src="/images/about-1.jpg" alt="about-1" />
              <img className="about_img_2" src="/images/about-2.jpg" alt="about-2" />
              <img className="about_img_3" src="/images/about-3.jpg" alt="about-3" />
            </div> }
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}
