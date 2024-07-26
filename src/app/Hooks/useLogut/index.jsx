import { Logout } from "../../Api/auth";

const useLogout = () => {
    const logoutUser = async () => {
        try {
            const res = await Logout(); 
            localStorage.removeItem('Token');
            return res.data; 
        } catch (error) {
            console.error('Terjadi kesalahan saat logout:', error.message);
            throw error; 
        }
    };

    return logoutUser; 
}

export default useLogout;