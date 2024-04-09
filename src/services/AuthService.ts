import axios, { AxiosError } from 'axios'; 
import { User, Token } from '../types';

interface LoginResponse {
  token: string;
  email: string;
  id: number;
  name: string;
  refreshToken: string;
}

const apiUrl: string = `${process.env.REACT_APP_API_URL}/auth`;








    async function loginService (email: string, password: string) : Promise<User>   {
        try {
            const response = await axios.post<User>(`${apiUrl}/login`, {email, password});
            if (response.data.token) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
           throw error;
        }
    }

   


    

    // async verifyToken(token: string) : Promise<any> {
    //     try {
    //         const response = await axios.post<User>(
    //           `${this.apiUrl}/token/verify`,
    //           { token },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`, // Include token in authorization header
    //             },
    //           }
    //         );
      
    //         if (response.status === 200 && response.data.isValid) {
    //           return response.data.user; // Extract user data from response
    //         } else {
    //           // Handle invalid token cases appropriately (e.g., logout, refresh)
    //           console.error('Token verification failed:', response.status, response.data);
    //           throw new Error('Invalid token.'); // Consider returning different error types for specific cases
    //         }
    //       } catch (error) {
    //         // Handle API errors and network issues gracefully
    //         console.error('Error verifying token:', error);
    //         throw error; // Re-throw for centralized error handling
    //       }
    // }

    async function signupService(props:any): Promise<LoginResponse> {
        const {email, password, name} = props;
      try {
        const response = await axios.post<LoginResponse>(
          `${apiUrl}/register`, {name, email, password}
        );
        return response.data;
      } catch (error) {
        // Handle API errors and network issues gracefully
        const axiosError = error as AxiosError;
        // console.log(axiosError);
        throw axiosError.response ? axiosError.response.data : axiosError.message;
      }
    }
    export  {loginService, signupService,};
    
// }