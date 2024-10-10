import React from 'react';
import "./Styles/Comp01C.css";
import { useNavigate } from 'react-router';
import ContactUs from '../../Contact/Contact';
const Comp01C = () => {
  const navigate = useNavigate();
  return (
    <div className='Comp01C'>
        {/* <h1>How Can We Help You?</h1> */}
        {/* <p className='title'>If you have a product or nutrition question, or want to provide feedback, please reach out!</p> */}
        {/* <button onClick={()=>navigate("/contact")}>CONTACT US</button> */}
        <ContactUs />
    </div>
  )
}

export default Comp01C;