
import { Login } from "../../Api/auth"; 

const useLogin = () => {
    const sendRequest = async (email, password) => {
        try {
            const res = await Login({ email, password }); // Call Login function from auth.js
            localStorage.setItem('Token', res.data.token);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return sendRequest; // Mengembalikan fungsi sendRequest
}

export default useLogin;