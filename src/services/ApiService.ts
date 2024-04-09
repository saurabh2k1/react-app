import axios from "axios";
import TokenService from "./TokenService";
import authHeader from "./AuthHeader";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/register" && err.response) {
            // Access Token expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await instance.post("/auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    }, {headers: authHeader()});

                    const { token} = rs.data;
                    TokenService.updateLocalAccessToken(token);
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default instance;