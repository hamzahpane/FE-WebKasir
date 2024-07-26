import React, { useState } from 'react';
import { buatProduct } from '../../app/Api/Product';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap'; 
import './index.css';

function Index() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image_url: null,
        category: '',
        tags: ''
    });

    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image_url: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('price', formData.price);
            formDataToSubmit.append('image_url', formData.image_url);
            formDataToSubmit.append('category', formData.category);
            formDataToSubmit.append('tags', formData.tags.join(','));

            await buatProduct(formDataToSubmit);

            setFormData({
                name: '',
                price: '',
                image_url: null,
                category: '',
                tags: ''
            });

            setShowModal(true); // Buka modal setelah submit berhasil
        } catch (error) {
            console.error('Error saat membuat produk:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false); // Fungsi untuk menutup modal
    };

    return (
        <div>
            <div className="HeaderPesanan">
                <button>
                    <NavLink to="/Menu">
                        <FaChevronLeft size={24} color="white" />
                    </NavLink>
                </button>
                <h2>From Buat Product</h2>
            </div>
            <div className="containerPesanan">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nama Produk:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="inputField" // Gunakan className form-control untuk input
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Harga:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min="0"
                            step="any"
                            value={formData.price}
                            onChange={handleChange}
                            className="inputField" // Gunakan className form-control untuk input
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image_url">Pilih Gambar Produk:</label>
                        <input
                            type="file"
                            id="image_url"
                            name="image_url"
                            onChange={handleImageChange}
                            className="form-control" // Gunakan className form-control-file untuk file input
                        
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Kategori:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="inputField" // Gunakan className form-control untuk input
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags:</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="inputField" // Gunakan className form-control untuk input
                        />
                    </div>

                    <button type="submit" className="submitButton">Submit</button> 
                </form>
            </div>

            {/* Modal menggunakan React Bootstrap */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Produk berhasil dibuat!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Tutup
                    </Button>
                    <Button variant="primary" onClick={() => {
                        closeModal();
                        window.location.href = '/Menu';
                    }}>
                        Lanjut ke Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Index;
