import React, { useState } from "react";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { NavLink , useNavigate } from "react-router-dom";
import { Register } from "../../app/Api/auth";
import Modal from 'react-bootstrap/Modal';
import Navbar from '../../components/Navbar/index';
import './index.css';

function Index () {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Data yang akan didaftarkan:", data.username, data.password);
            await Register(data);
            if (!data?.error) {
                navigate("../Login");
            } else {
                handleShow('error');
            }
            console.log("Respon setelah pendaftaran:", data.message); 
        } catch (error) {
            if (error.response && error.response.status === 409) {
                return; 
            }
        }
    };
    
    return (
        <>
            <div className="Container_Register"> 
                <Navbar/>
                <div className="Container_form">    
                    <div className="forms_Regis">
                        <form onSubmit={handleSubmit}>
                            <div className="Text_Register">
                                <i><BiSolidCoffeeBean size={'14px'} color="#503C3C" /></i>
                                <h1>Selamat Datang Kembali</h1>
                            </div>
                            <h2>Daftar akun kamu sekarang !</h2>
                            <label htmlFor="username">Username:</label><br />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Masukan Username Anda"
                                value={data.username}
                                required
                                onChange={handleChange}
                            /><br />
                            <label htmlFor="email">Email:</label><br />
                            <input
                                type="email" 
                                id="email"
                                name="email"
                                placeholder="Masukan Email Anda"
                                value={data.email}
                                required
                                onChange={handleChange}
                            /><br />
                            <label htmlFor="password">Password:</label><br />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Masukan Pasword Anda"
                                value={data.password}
                                required
                                onChange={handleChange}
                            />

                            <div className="Button_SignUp">
                                <button type="submit"> <h2> Sign Up </h2></button>
                                <NavLink to="../Login">Sudah punya akun? <text>Login</text> </NavLink>
                            </div>
                        </form>
                        
                        <Modal show={show} onHide={handleClose} animation={false} size="m">
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>Email terdaftar. Gunakan email lain</Modal.Body>
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
