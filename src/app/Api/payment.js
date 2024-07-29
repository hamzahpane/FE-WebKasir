// File Api createsubtotal.js
import axios from "axios";

export async function createPay(payload) {
    console.log(payload);
    try {
        const response = await axios.post(`http://203.194.113.156/api/postpay`,payload)
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function  getPayment() {
    try {
        const response = await axios.get(`http://203.194.113.156/api/getpay`);
        return response.data;
    } catch (error) {
        console.error("Error fetching subtotal:", error);
        throw error;
    }
}
