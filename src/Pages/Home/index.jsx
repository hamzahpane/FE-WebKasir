
import React from 'react';
import Navbar from '../../components/Navbar/index';
import { NavLink } from 'react-router-dom';
import Gambar from '../../asstes/Landing_page.jpg';
import './index.css';

function Index() {

  return (

    <>
    <div  className='container_landing_Page'>
            <div className='container_Nav'>
            <Navbar/>
            </div>     
          
      <div className='Container_Box'>
          <div className='Box1'>
            <div className='text_Hero'>
              <h1> Coffe Shop </h1>
              
              <p>  "Selamat datang di Coffee Haven, tempat di mana aroma kopi mempertemukan keluarga. 
                Di sini, setiap tegukan adalah kenangan manis, dan setiap momen adalah pelukan hangat 
                bagi hati yang damai."</p>
            
              <div className='Button'>
              <NavLink  to="/Menu"> <button className='Order'>  Order Now </button> </NavLink>

              </div>
            </div>

  
          </div>

          <div className='Box2 '>
                <img src={Gambar} alt='' className='Hero'/>
          </div>

        
      </div>

    </div>
    </>
    
    )
}


export default Index;