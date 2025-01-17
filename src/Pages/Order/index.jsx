import React, { useState, useEffect } from "react";
import { deleteOrder, getOrder } from "../../app/Api/order";
import { getPayment } from "../../app/Api/payment";
import { createInvoice } from "../../app/Api/invoice";
import { useNavigate, NavLink } from "react-router-dom"; // Import useNavigate untuk navigasi
import { FaChevronLeft } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "./index.css";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [orderedStatus, setOrderedStatus] = useState({});
  const [paymentSelections, setPaymentSelections] = useState({});
  const token = localStorage.getItem("Token");

  // useNavigate hook untuk navigasi
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrder(token);
        setOrders(data);

        const storedOrderedStatus =
          JSON.parse(localStorage.getItem("OrderedStatus")) || {};
        const initialStatus = {};
        data.forEach((order) => {
          initialStatus[order._id] = storedOrderedStatus[order._id] || false;
        });
        setOrderedStatus(initialStatus);

        const storedPaymentSelections =
          JSON.parse(localStorage.getItem("PaymentSelections")) || {};
        const initialSelections = {};
        data.forEach((order) => {
          initialSelections[order._id] =
            storedPaymentSelections[order._id] || "";
        });
        setPaymentSelections(initialSelections);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [token]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayment();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order._id !== orderId));
      console.log("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleOptionChange = (orderId, paymentId) => {
    setPaymentSelections((prevSelections) => ({
      ...prevSelections,
      [orderId]: paymentId,
    }));

    localStorage.setItem(
      "PaymentSelections",
      JSON.stringify({
        ...paymentSelections,
        [orderId]: paymentId,
      })
    );
  };

  const handleSubmitInvoice = async (orderId) => {
    try {
      const selectedPayment = paymentSelections[orderId];

      if (!selectedPayment) {
        alert("Pilih metode pembayaran terlebih dahulu.");
        return;
      }

      const payload = {
        order_id: orderId,
        payment_id: selectedPayment,
      };

      const response = await createInvoice(payload, token);
      console.log("Invoice created:", response);

      setOrderedStatus((prevStatus) => ({
        ...prevStatus,
        [orderId]: true,
      }));

      localStorage.setItem(
        "OrderedStatus",
        JSON.stringify({
          ...orderedStatus,
          [orderId]: true,
        })
      );

      alert("Invoice berhasil dibuat!");

      // Navigasi ke halaman invoice setelah invoice dibuat
      navigate("/voice"); // Mengarahkan ke halaman invoice
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Terjadi kesalahan saat membuat invoice.");
    }
  };

  const renderSubmitButton = (order) => {
    if (orderedStatus[order._id]) {
      return (
        <Button variant="secondary" disabled>
          Sudah diorder
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          onClick={() => handleSubmitInvoice(order._id)}
        >
          Submit
        </Button>
      );
    }
  };

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date";
    }
  }

  return (
    <div>
      <div className="HeaderOrderan">
        <button>
          <NavLink to="/Menu">
            <FaChevronLeft size={24} color="white" />
          </NavLink>
        </button>
        <h2>Orderan Sekarang</h2>
      </div>

      {orders.map((order, index) => (
        <div key={index} className="order-container">
          <div className="order-date">
            <p>Tanggal: {formatDate(order.orderDate)}</p>
          </div>
          <table className="order-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((o, i) => (
                <tr key={i}>
                  <td>{o.name}</td>
                  <td>{o.price}</td>
                  <td>{o.quantity}</td>
                  <td>{o.price * o.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="payment-buttons">
            <select
              className="dropdown-select"
              value={paymentSelections[order._id]}
              onChange={(e) => handleOptionChange(order._id, e.target.value)}
            >
              <option value="">Pilih Metode Pembayaran</option>
              {payments.map((payment) => (
                <option key={payment._id} value={payment._id}>
                  {payment.Name}
                </option>
              ))}
            </select>
            <div className="button-container">
              <Button
                variant="danger"
                onClick={() => handleDeleteOrder(order._id)}
              >
                Hapus
              </Button>{" "}
              {renderSubmitButton(order)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderPage;
