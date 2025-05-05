import React, { useState, useEffect } from 'react';
import '../Styles/appointment.css'

export default function Appointment() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    selectedServices: [],
    desiredDateTime: '',
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhoneNumber: '',
  });

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data));

    fetch('/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    const dateInput = document.querySelector("input[type='datetime-local']");
    if (dateInput) dateInput.min = now;
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => {
        const selected = prev.selectedServices;
        if (checked) {
          return { ...prev, selectedServices: [...selected, value] };
        } else {
          return { ...prev, selectedServices: selected.filter(s => s !== value) };
        }
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextPrev = (n) => {
    const newStep = step + n;
    if (newStep === 1 && formData.selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }
    if (newStep === 2 && !formData.selectedEmployee) {
      alert("Please select an employee.");
      return;
    }
    if (newStep === 3 && !formData.desiredDateTime) {
      alert("Please select a date and time.");
      return;
    }
    if (newStep === 4 && (!formData.clientFirstName || !formData.clientLastName || !formData.clientEmail || !formData.clientPhoneNumber)) {
      alert("Please complete all client details.");
      return;
    }
    if (newStep >= 0 && newStep < 4) {
      setStep(newStep);
    } else if (newStep === 4) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(response => alert("Appointment booked successfully!"))
      .catch(err => alert("Error booking appointment."));
  };

  return (
    <div className="container">
      <form>
        {step === 0 && (
          <div>
            <h2>1. Choice of Services</h2>
            {services.map(service => (
              <div key={service.service_id}>
                <label>
                  <input
                    type="checkbox"
                    name="selectedServices"
                    value={service.service_id}
                    onChange={handleChange}
                    checked={formData.selectedServices.includes(String(service.service_id))}
                  />
                  {service.service_name} ({service.service_duration} min - ${service.service_price})
                </label>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>2. Choice of Employee</h2>
            {employees.map(employee => (
              <div key={employee.employee_id}>
                <label>
                  <input
                    type="radio"
                    name="selectedEmployee"
                    value={employee.employee_id}
                    onChange={handleChange}
                    checked={formData.selectedEmployee === String(employee.employee_id)}
                  />
                  {employee.first_name} {employee.last_name}
                </label>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>3. Choice of Date and Time</h2>
            <input
              type="datetime-local"
              name="desiredDateTime"
              value={formData.desiredDateTime}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>4. Client Details</h2>
            <input
              type="text"
              name="clientFirstName"
              placeholder="First Name"
              value={formData.clientFirstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="clientLastName"
              placeholder="Last Name"
              value={formData.clientLastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="clientEmail"
              placeholder="Email"
              value={formData.clientEmail}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="clientPhoneNumber"
              placeholder="Phone Number"
              value={formData.clientPhoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
          <button type="button" onClick={() => nextPrev(-1)} disabled={step === 0}>Previous</button>
          <button type="button" onClick={() => nextPrev(1)}>{step === 3 ? 'Submit' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
}
