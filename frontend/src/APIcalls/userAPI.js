import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export class UserAPIs{
    async signupUser(userData){
        try {
            const formData = new FormData();
            formData.append('fullName',userData.fullName);
            formData.append('email',userData.email);
            formData.append('password',userData.password);

            if(userData.avatar[0]){
                formData.append('avatar',userData.avatar[0])
            }

            const response = await axios.post(
                `${baseURL}/api/v1/user/signup`,
                formData,
                {
                    withCredentials: true,
                }
            )

            if(response && response.data.success === true){
                const credentials = {
                    email: userData.email,
                    password: userData.password
                };
                return await this.login(credentials)
            }
        } catch (error) {
            throw error;
        }
    }

    async login(userData){
        try {
            const response = await axios.post(
                `${baseURL}/api/v1/user/login`,
                {
                    email: userData.email,
                    password:userData.password,
                },
                {
                    withCredentials: true
                }
            )

            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async logout(){
        try {
            const response = await axios.post(`${baseURL}/api/v1/user/logout`,
                {},
                {withCredentials: true}
            )

            return response.data;
        } catch (error) {
            throw error
        }
    }
}

const userAPI = new UserAPIs();

export default userAPI;