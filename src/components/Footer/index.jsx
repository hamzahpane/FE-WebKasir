import React from "react";
import { LuInstagram } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import './index.css';

function index () {
return (
        <div className="Background_footer">
            <div className="container_text">
                <div className="Socialmedia">
                    <a ><LuInstagram className="icon" /></a>
                    <a ><IoLogoWhatsapp className="icon" /></a>
                    <a ><FiGithub className="icon" /></a>
                </div>
                
                <div className="container_logo">
                    <h3>RAZZ COFFEE </h3>
                </div>
                
                <div className="address">
                    <p>@2023 Made by upaay</p>
                </div>
            </div>
        </div>
    );

}

export default index; 