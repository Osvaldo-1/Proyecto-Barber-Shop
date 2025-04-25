import React from 'react';

export default function Appointment() {
    return(
        <section className="book_section" id="booking">
            <div className="book_bg"></div>
            <div className="map_pattern"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-6">
                        <form action="appointment.php" method="post" id="appointment_form" class="form-horizontal appointment_form">
                            <div className="book_content">
                                <h2 style={{color: 'white'}}>Make an appointment</h2>
                                <p style={{color: '#999'}}>
                                    Barber is a person whose occupation is mainly to cut dress groom <br/>style and shave men's and boys hair.
                                </p>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-6 padding-10">  
                                    <input type="date" class="form-control"/>
                                </div>
                                <div className="col-md-6 padding-10">
                                    <input type="time" class="form-control"/>
                                </div>
                            </div>
    
                            <button id="app_submit" className="default_btn" type="submit">
                                Make Appointment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

