import React, { useState, useEffect } from 'react';
import { deletInvo, getInvo, getInvoId } from '../../app/Api/invoice';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import './index.css';
import Button from 'react-bootstrap/esm/Button';

const Index = () => {
  const [Invoices, setInvoices] = useState([]);
  const token = localStorage.getItem('Token');

  // Mengambil daftar invoice saat komponen dimuat
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvo(token);
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, [token]);



  const handleDeleteInvoce = async (invoiceId) => {
    try {
        await deletInvo(invoiceId);
        console.log('Invoice deleted successfully');
        setInvoices(Invoices.filter(invoice => invoice._id !== invoiceId));
        console.log('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting Invoice:', error);
    }
};

const handleShowInvoice = async (invoiceId) => {
  try {
    const response = await getInvoId(token, invoiceId);
    const pdfBase64 = response
    const byteCharacters = atob(pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank'); // Buka PDF dalam tab baru
} catch (error) {
    console.error('Error fetching Invoice PDF:', error);
}
};

  return (
    <div>
      <div className="HeaderInvoice">
        <button>
          <NavLink to="/Menu">
            <FaChevronLeft size={24} color="white" />
          </NavLink>
        </button>
        <h2>Invoice Sekarang</h2>
      </div>
      {Invoices.map((invoice, i) => (
        <div key={i} className="invoice_container">
          <div className="order-date">
            <p>Tanggal: {formatDate(invoice.order.orderDate)}</p>
          </div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Nama : </th>
                <th>Price : </th>
                <th>Quantity : </th>
                <th>Subtotal : </th>
                <th>Pembayaran : </th>  
              </tr>
            </thead>
            <tbody>
              {invoice.order.orderItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * item.price}</td>
                  <td>{invoice.payment}</td> 
                </tr>
              ))}
            </tbody>
          </table>
          <div className='toltalMount'> <h3> Pembayaran: {invoice.payment} Rp.{invoice.order.totalAmount} </h3></div>
          <div className="button-container">
            <Button variant="danger" className="delete-button" onClick={() => handleDeleteInvoce(invoice._id)} >Hapus Invoice</Button>
            <Button variant="primary" className="submit-button"  onClick={() => handleShowInvoice(invoice._id)}>Tampilkan Invoice</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

function formatDate(dateString) {
  try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
          throw new Error('Invalid date');
      }
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
  } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid Date';
  }
}

export default Index;
