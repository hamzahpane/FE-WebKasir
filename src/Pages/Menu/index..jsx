import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Navigation from '../../components/Navbar';
import { useStoreproduct } from '../../app/State/setProduct';
import { fetchProducts } from '../../app/Api/Product';
import './index.css';
import Sidebar from '../../components/SideBar/index';
import Footer from '../../components/Footer/index';
import axios from 'axios';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '' });

    const addSelectedProduct = useStoreproduct((state) => state.addSelectedProduct);
    const selectedProducts = useStoreproduct((state) => state.selectedProducts);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProducts(searchQuery, selectedTag, selectedCategory);
            setProducts(data);
        };

        fetchData();
    }, [searchQuery, selectedTag, selectedCategory]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    const handleTagClick = async (tag) => {
        setSelectedTag((prevTag) => (prevTag === tag ? '' : tag)); // Toggle selected tag
    };

    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
    };

    const tags = ['Kopi&Teh', 'Juice', 'Milkshake', 'Mie', 'Nasi', 'Snack'
      , 'Dimsum', 'ManualBrew','NonCoffe'];

    const handleAddProduct = (product) => {
        const isProductAdded = selectedProducts.some((selectedProduct) => selectedProduct._id === product._id);

        if (!isProductAdded) {
            addSelectedProduct(product);
            setShowSidebar(true);
            setNotification({ show: true, message: `${product.name} telah ditambahkan.` });
            setTimeout(() => {
                setNotification({ show: false, message: '' });
            }, 5000);
        } else {
            setNotification({ show: true, message: `${product.name} sudah ditambahkan sebelumnya.` });
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/products/${productId}`);
            if (response.status === 200) {
                setProducts(products.filter((product) => product._id !== productId));
                setNotification({ show: true, message: 'Produk berhasil dihapus.' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            setNotification({ show: true, message: 'Gagal menghapus produk.' });
        }
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 5000);
    };

    const handleNotificationClose = () => {
        setNotification({ show: false, message: '' });
    };

    return (
        <>
            <div className='Menu_Container'>
                <div className='Navbar_Menu_Container'>
                    <Navigation />
                    <form className="d-flex Seacrh_bar" onSubmit={handleSearchSubmit}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>

                <div className='Body_MenuContainer'>
                    <div className='Tags_Container'>
                        {tags.map((tag) => (
                            <Button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                style={{
                                    background: selectedTag === tag ? "#6B4E3D" : "#FFFFFF",
                                    color: selectedTag === tag ? "#FFFFFF" : "#000000",
                                    border: "1px solid #6B4E3D",
                                    boxShadow: "1px 1px 3px #888888",
                                    borderRadius: "5px"
                                }}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>

                    <div className='Category_Container'>
                        <DropdownButton id="dropdown-item-button" title="Category" onSelect={handleCategorySelect} variant="dark">
                            <Dropdown.Item eventKey="Minuman">Minuman</Dropdown.Item>
                            <Dropdown.Item eventKey="Makanan">Makanan</Dropdown.Item>
                        </DropdownButton>

                        <Button size='sm' variant="dark">
                            <NavLink to="/tambahP" style={{ textDecoration: 'none', color: 'white' }}>
                                Tambahkan Product
                            </NavLink>
                        </Button>
                    </div>

                    <div className='Container_Card'>
                        <div className="product-list">
                            {products.map((product) => (
                                <div key={product._id} className="product-card">
                                    <img src={`http://localhost:4000/images/products/${product.image_url}`} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <h3 className="product-title">{product.name}</h3>
                                        <p className="product-price">Rp.{product.price}</p>
                                        <div className="button-container">
                                            <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>Hapus</button>
                                            <button className="add-button" onClick={() => handleAddProduct(product)}>Tambahkan</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Tampilkan Sidebar */}
            <Sidebar show={showSidebar} handleClose={() => setShowSidebar(false)} />

            {/* Notifikasi */}
            <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <Alert show={notification.show} variant="info" onClose={handleNotificationClose} dismissible>
                    <Alert.Heading>{notification.message}</Alert.Heading>
                </Alert>
            </div>
        </>
    );
};

export default Menu;
