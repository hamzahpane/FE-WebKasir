import React, { useState  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

//API
import { useStoreproduct } from '../../app/State/setProduct';
import { createItem } from '../../app/Api/cart';
//
import { Offcanvas, Button, Modal  } from 'react-bootstrap';
import './index.css';


const Sidebar = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const selectedProducts = useStoreproduct((state) => state.selectedProducts);
  const [productQuantities, setProductQuantities] = useState({});
  const removeSelectedProduct = useStoreproduct((state) => state.removeSelectedProduct);
  const clearAllSelectedProducts = useStoreproduct((state) => state.clearAllSelectedProducts);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const [isProductsSelected, setIsProductsSelected] = useState(false);
  const [showOrder, setShowOrderNow] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // State untuk status pesanan
  const token = localStorage?.getItem('Token');

  // Menaikkan kuantitas produk
  const incrementQuantity = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
    setIsProductsSelected(true); // Produk telah dipilih
  };

  // Menurunkan kuantitas produk
  const decrementQuantity = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(0, (prevQuantities[productId] || 0) - 1),
    }));
    setIsProductsSelected(true); // Produk telah dipilih
  };

  // Menghitung total harga
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach((product) => {
      totalPrice += product.price * (productQuantities[product._id] || 0);
    });
    return totalPrice;
  };

  // Menghapus satu pesanan
  const handleRemoveOrder = (productId) => {
    setProductToRemove(productId);
    setShowConfirmationModal(true);
  };

  // Menghapus semua pesanan
  const handleClearOrder = () => {
    setShowConfirmationModal(true);
  };

  // Modal untuk konfirmasi sebelum menghapus
  const confirmRemoveOrder = () => {
    if (productToRemove) {
      removeSelectedProduct(productToRemove);
    } else {
      clearAllSelectedProducts();
      setProductQuantities({});
    }
    setShowConfirmationModal(false);
  };

  // Menutup modal konfirmasi
  const closeModal = () => {
    setShowConfirmationModal(false);
  };


  // Menutup modal order
  const CloseModalOrder = () => {
    setShowOrderNow(false);
  };

  // Menangani proses order
  const handleOrderNow = async () => {
    const orderdata = {
      products: selectedProducts.map((product) => ({
        Nama: product.name,
        Harga: product.price,
        quantity: product.quantity || (productQuantities[product._id] || 0),
      })),
      totalPrice: calculateTotalPrice(),
    };

    try {
      const resOrderItem = await createItem(orderdata, token);
      console.log('Order item created successfully:', resOrderItem);
      setOrderStatus('success'); // Pesanan berhasil
      navigate('', { state: { orderData: orderdata } });
    } catch (error) {
      console.error('Failed to create order item:', error);
      setOrderStatus('failure'); // Pesanan gagal
    } finally {
      setShowOrderNow(true); // Tampilkan modal setelah proses pesanan selesai
    }
  };

  // Komponen untuk menampilkan status pesanan
  const ModalOrderStatus = () => {
    return (
      <Modal show={showOrder} onHide={CloseModalOrder}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {orderStatus === 'success' ? (
            <h4>Pesanan Anda telah berhasil ditambahkan!</h4>
          ) : (
            <h4>Gagal menambahkan pesanan. Silakan coba lagi.</h4>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseModalOrder}>
            Tutup
          </Button>
          {orderStatus === 'success' && (
             <NavLink to="/Order"> <Button variant="secondary">
              Lanjut
            </Button>
            </NavLink>
          )}
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Order Pesanan</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className="container_Header">
          {selectedProducts.map((product) => (
            <li key={product._id} className="List_product">
              <span>{product.name}</span>
              <span style={{ marginRight: '10px' }}>{product.price}</span>
              <span>Quantity: {productQuantities[product._id] || 0}</span>
              <div style={{ display: 'flex', marginTop: '25px' }}>
                <Button className="circle-btn" onClick={() => incrementQuantity(product._id)}>
                  <h3 style={{ textAlign: 'center', fontSize: '10px' }}> + </h3>
                </Button>
                <Button className="circle-btn" onClick={() => decrementQuantity(product._id)}>
                  <h3 style={{ textAlign: 'center', fontSize: '10px' }}> - </h3>
                </Button>
              </div>
              <Button variant="danger" href="#" className="Hapus_order" onClick={() => handleRemoveOrder(product._id)}>
                <h3 style={{ textAlign: 'center', fontSize: '10px' }}>Hapus Order</h3>
              </Button>
            </li>
          ))}
        </ul>

        <p style={{ margin: '10px' }}>Total: {calculateTotalPrice()}</p>

        <div className="button_clear">
          <Button onClick={handleOrderNow} disabled={!isProductsSelected}>
            Order Now
          </Button>
          <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleClearOrder}>
            Clear Order
          </Button>
        </div>
      </Offcanvas.Body>

      {/* Modal untuk konfirmasi penghapusan pesanan */}
      <Modal show={showConfirmationModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToRemove ? 'Anda yakin ingin menghapus pesanan ini?' : 'Anda yakin ingin menghapus semua pesanan?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmRemoveOrder}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalOrderStatus />
    </Offcanvas>
  );
};

export default Sidebar;
