import axios from "axios";

export async function getAddress(token) {
  return await axios.get(`http://localhost:4000/api/deliveryAddres`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export async function getAddressById(addressId) {
  let { token } = localStorage.getItem("aut")
    ? JSON.parse(localStorage.getItem("aut"))
    : {};

  return await axios.get(
    `http://localhost:4000/api/deliveryAddres/${addressId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
}

export async function createAddress(payload, token) {
  return await axios.post(`http://localhost:4000/api/deliveryAddres`, payload, {
    headers: {
      Authorization: `${token}`,
    },
  });
}
