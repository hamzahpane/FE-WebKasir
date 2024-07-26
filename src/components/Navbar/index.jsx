import React, { useState  ,useEffect} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
//Icons
import { HiMiniHome } from "react-icons/hi2";
import { MdRestaurantMenu } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { GiCookingPot } from "react-icons/gi";
import { NavLink } from 'react-router-dom';


// import Logo from '../../asstes/Logo.png';
import useLogout from '../../app/Hooks/useLogut/index';
import Modal from 'react-bootstrap/Modal';
import Sidebar from '../SideBar';
import './index.css';


const Navigation = () => {
    const [cliked, setClicked] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('Token'));
    const logoutUser = useLogout();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [loading, setLoading] = useState(true); 

    const handleCloseSidebar = () => {
        setShowSidebar(false);
    }

    const handleLogout = () => {
        logoutUser();
        try {
            localStorage.removeItem('Token');
            setToken(null);
        } catch (error) {
            console.error('Gagal logout', error.message);
        }
    }

    const handleOrderClick = () => {
        if (!token) {
            setShowLoginModal(true);
        } else {
            window.location.href = "/Order";
        }
    }

    const handleInvo = () =>{
        if(!token) {

            setShowLoginModal(true)

        } else{
            window.location.href = "/voice"
        }

    }

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false); 
        }, 3000);

        
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div>
                <div className='Navbar_container'>
                    <div className='logo'>
                        <h2> Razz Coffee</h2>
                    </div>

                    <div className='Container_Bar'>
                        {/* Tampilkan loading spinner jika loading masih true */}
                    {loading ? (
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <ClipLoader
                        color={"#FFFFFF"} 
                        loading={loading}
                        size={30} 
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        />
                        </div>
                        ) : (
                            <ul id='container_Header' className={cliked ? "#container_Header active" : " #container_Header"}>
                            <li> <NavLink to="/" activeClassName="active-link" exact> <HiMiniHome className='icon' /> Home </NavLink> </li>
                            <li> <NavLink to="/Menu" activeClassName="active-link"> <MdRestaurantMenu className='icon' /> Menu </NavLink> </li>
                            <li> <NavLink to="#" onClick={handleOrderClick}> <IoCartSharp className='icon' />Order </NavLink> </li>
                            <li> <NavLink to="#" onClick={handleInvo}> <GiCookingPot className='icon' /> Invoice </NavLink> </li>
                        </ul>
                    )}
            </div>

                    <div className='tombol_icon'>
                        <NavLink href=' icon Cart' onClick={() => setShowSidebar(true)}> <FaShoppingCart size={16} color='#F3EEEA' /> </NavLink>
                        {token ? (
                            <button onClick={handleLogout}> <NavLink to="/"> Logout </NavLink> </button>
                        ) : (
                            <button> <NavLink to="../login"> Login </NavLink> </button>
                        )}

                        {token && (
                        <div id="Mobile">
                        <i id="bar" className={cliked ? 'menu-icon' : 'close-icon'} onClick={() => setClicked(!cliked)}>
                            {cliked ? <AiOutlineClose color="white" /> : <FaBars color="white" />}
                        </i>
                        </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal login */}
            {showLoginModal && (
                <Modal show={showLoginModal} onClick={() => setShowLoginModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You need to login to place an order </Modal.Body>
                    <button onClick={() => setShowLoginModal(false)}>Close</button>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Panggil komponen Sidebar */}
            <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />
        </>
    );
}

export default Navigation;
