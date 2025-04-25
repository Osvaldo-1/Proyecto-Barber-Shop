import React from 'react'

export default function About() {
  return (
    <section id="about" class="about_section">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="about_content" style={{ textalign: 'center'}}>
                    <h3>Introducing</h3>
                    <h2>The Barber Shop <br />Science 1991</h2>
                    <img src="Design/images/about-logo.png" alt="logo" />
                    <p style={{color: '#777'}}>
                        Barber is a person whose occupation is mainly to cut dress groom style and shave men's and boys' hair. A barber's place of work is known as a "barbershop" or a "barber's". Barbershops are also places of social interaction and public discourse. In some instances, barbershops are also public forums.
                    </p>
                    <a href="#MORE" className="default_btn" style={{ opacity: 1 }}>More about us</a>
                </div>
            </div>
            <div class="col-md-6  d-none d-md-block">
                <div class="about_img" style = {{overflow:'hidden'}}>
                    <img class="about_img_1" src="Design/images/about-1.jpg" alt="about-1" />
                    <img class="about_img_2" src="Design/images/about-2.jpg" alt="about-2" />
                    <img class="about_img_3" src="Design/images/about-3.jpg" alt="about-3" />
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
