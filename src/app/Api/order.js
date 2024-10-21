import axios from "axios";

export async function createOrder(payload, token) {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/orders`,
      payload,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOrder(token) {
  try {
    const response = await axios.get("http://localhost:4000/api/getOrders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response data:", response.data); // Tambahkan log ini
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function deleteOrder(orderId) {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/Orders/${orderId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
