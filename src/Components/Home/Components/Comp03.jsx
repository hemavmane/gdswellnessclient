import React from 'react';
import "./Styles/Comp03.css";
import image07 from "../../Images/image07.webp"
import image08 from "../../Images/image08.webp"
import image09 from "../../Images/image09.webp"
import image10 from "../../Images/image10.webp"

import reviewimage01 from "../../Images/reviewimage01.webp"
import reviewimage02 from "../../Images/reviewimage02.webp"
import reviewimage03 from "../../Images/reviewimage03.webp"
import reviewimage04 from "../../Images/reviewimage04.webp"

const Comp03 = () => {
 
  return (
    <div className='Comp03'>
      <img src={image07 } alt="" />
      <img src={image08 } alt="" />
      <img src={image09} alt="" />
      <img src={image10} alt="" />

      <img src={reviewimage01} alt="" />
      <img src={reviewimage02} alt="" />
      <img src={reviewimage03} alt="" />
      <img src={reviewimage04} alt="" />

    </div>
  )
}


export default Comp03