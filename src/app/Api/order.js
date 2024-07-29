import axios from "axios";

export async function createOrder( payload , token) {

    try {
        const response = await axios
        .post(`http://203.194.113.156/api/orders`, payload, {
            headers: {
            Authorization: `${token}`,
            }
        });
        return response.data;

    } catch (error) {
        throw error;
    };
    };


    export async function getOrder(token) {
        try {
            const response = await axios.get('http://203.194.113.156/api/getOrders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('API response data:', response.data); // Tambahkan log ini
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }
    


    export async function deleteOrder(orderId ){

        try {   
            const response = await axios.delete(`http://203.194.113.156/api/Orders/${orderId}`)
            return response;
        } catch (error) {
            throw error;
        }
    }