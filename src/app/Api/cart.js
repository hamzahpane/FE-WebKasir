import axios from "axios";

export async function createItem( payload , token) {
    try {
        const response = await axios
        .post(`http://203.194.113.156/api/ordersItem`, payload, {
            headers: {
            Authorization: `${token}`,
            }
        });
        return response.data;

    } catch (error) {
        throw error;
    };
    };



    export async function getItem(token) {
        try {
            const response = await axios.get(`http://203.194.113.156/api/getOrdersItem`, {
                headers: {
                    Authorization: `Bearer ${token}`, // sesuaikan dengan format Authorization yang benar
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
