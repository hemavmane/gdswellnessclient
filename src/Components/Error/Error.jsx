import React from 'react';
import "./Style/Error.css";
import { useNavigate } from 'react-router-dom';
import TabsTitle from '../Utils/TabsTitle';

const Error = () => {
  // TabsTitle("Error Page : Oops! This page doesn't exist")
    const navigate = useNavigate();
  return (
    <div className='Error'>
        <div className='ErrorWrapper'>
            {/* <img src="https://media1.giphy.com/media/YyKPbc5OOTSQE/giphy.gif?cid=ecf05e47e120uhjffkelp24voqxnakntehjbbjudg7h0fovr&ep=v1_gifs_related&rid=giphy.gif&ct=g" alt="" /> */}
            <h1>404</h1>
            <h1>Oops! This page doesn't exist</h1>
            <p>We are very sorry for the inconvenience. It looks like you are trying to access a page that has been
deleted or never even existed.</p>
            <button onClick={()=>navigate("/")}>Back To Home Page</button>
        </div>
    </div>
  )
}

export default Error