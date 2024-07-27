
import Navbar from "../../components/Navbar/index";
import React, { useState } from 'react';
import { BiSolidCoffeeBean } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from '../../app/Hooks/useLogin/index';
import Modal from 'react-bootstrap/Modal';
import './index.css';



function Index() {

    const history = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [show, setShow] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    const sendRequest = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(input.email, input.password);
            console.log(responseData);
            if (!responseData.err) {
                history("../Menu");
                console.log(responseData);
            } else 
               handleShow(responseData.message); // Tampilkan pesan kesalahan dari server
    
        } catch (error) {
            console.log(error);
            // Handle error here if needed
        }
    };
    

    return (
        <>
            <div className="Container_Login">
                <Navbar />
                <div className="Container_form">
                <div className="forms_login">
                <form onSubmit={handleSubmit}>
                    <div className="Text_login">
                        <i><BiSolidCoffeeBean size={'14px'} color="#503C3C" /></i>
                        <h1>Selamat Datang Kembali</h1>
                    </div>
                    <h2>Login akun kamu sekarang !</h2>
                    <label htmlFor="email">Email:</label><br />
                    <input type="text" id="email" name="email" 
                    value={input.email} 
                    requiredi da
                    onChange={handleChange} 
                    placeholder="Masukan Email Anda" /><br />
                    
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" 
                    value={input.password} onChange={handleChange} 
                    required 
                    placeholder="Masukan Password Anda" />
                    <a className="text_forgetPassword" href="Lupa_Password"> Lupa Password ?</a>
                    <div className="Button_Login">
                        <button type="submit"> <h2> Login  </h2> </button>
                        <NavLink href="Nav_regis" to="../Regis">tidak punya akun? <text>Daftar</text> </NavLink>
                    </div>
                    </form>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Email atau Password anda salah </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            </div>
    
            </div>
            </div>
        </>
    );
}

export default Index;
