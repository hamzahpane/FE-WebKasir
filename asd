import React, { useState } from "react";
import { buatProduct } from "../../app/Api/Product";
import { NavLink } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import './index.css'; 
function Pesanan() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image_url: null,
        category: "",
        tags: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "tags" ? value.split(",").map(tag => tag.trim()) : value
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
            formDataToSubmit.append("name", formData.name);
            formDataToSubmit.append("price", formData.price);
            formDataToSubmit.append("image_url", formData.image_url);
            formDataToSubmit.append("category", formData.category);
            formDataToSubmit.append("tags", formData.tags.join(","));

            await buatProduct(formDataToSubmit);

            setFormData({
                name: "",
                price: "",
                image_url: null,
                category: "",
                tags: ""
            });

            console.log("Produk berhasil dibuat!");
        } catch (error) {
            console.error("Error saat membuat produk:", error);
        }
    };

    return (

        <div >

            <div className="HeaderPesanan">
                <button>  <NavLink > <FaChevronLeft size={24} color="white"/> </NavLink> </button>
                <h2> From Pesanan </h2>
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
                        className="inputField" 
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
                        className="inputField" 
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
                        className="inputField" 
                        required
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
                        className="inputField" 
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
                        className="inputField" 
                    />
                </div>

                <button type="submit" className="submitButton">Submit</button> {/* Menambahkan className untuk button */}
            </form>
        </div>
        </div>
    );
}

export default Pesanan;
