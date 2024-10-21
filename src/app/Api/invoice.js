import axios from "axios";

export async function createInvoice(payload, token) {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/cretInvoice`,
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

export async function getInvo(token) {
  try {
    const response = await axios.get(`http://localhost:4000/api/getinvoice`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw error; // Melemparkan kembali error untuk ditangani di tempat lain
  }
}

export async function getInvoId(token, invoiceId) {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/getinvoice/${invoiceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw error; // Melemparkan kembali error untuk ditangani di tempat lain
  }
}

export async function deletInvo(invoiceId) {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/deletinvoice/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw error;
  }
}
