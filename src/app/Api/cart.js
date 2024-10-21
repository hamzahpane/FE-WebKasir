import axios from "axios";

export async function createItem(payload, token) {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/ordersItem`,
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

export async function getItem(token) {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/getOrdersItem`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // sesuaikan dengan format Authorization yang benar
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
