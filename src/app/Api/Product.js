import axios from "axios";

export async function fetchProducts(
  searchQuery,
  selectedTag,
  selectedCategory
) {
  try {
    const response = await axios.get("http://localhost:4000/api/products", {
      params: {
        q: searchQuery,
        tags: selectedTag,
        category: selectedCategory,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function buatProduct(payload) {
  console.log(payload);
  try {
    const response = await axios.post(
      `http://localhost:4000/api/products`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/products/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
