import React from 'react'
import "./Styles/Comp02.css";
const Comp02 = ({ data }) => {
  return (
    <div className='Comp02'>
        {
          data.map((ele,ind)=>{
            return <div key={ind} className='Comp02Wrapper'>
              <img src={ele.image} alt="" />
              <h3>{ele.title}</h3>
              <p>{ele.desc}</p>
            </div>
          })
        }
    </div>
  )
}

export default Comp02