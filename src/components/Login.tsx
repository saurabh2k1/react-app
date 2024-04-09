import React, { useContext, useState } from "react";
import { AuthContext, useAuth } from "../auth/AuthContext";
import { loginFields, Field } from "../utils/formField";
import Input from "./core/Input";
import FormExtra from "./core/FormExtra";
import {loginService} from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { BlockLike } from "typescript";

interface LoginState {
  [key: string]: string;
}

interface MyJwtType {
  email: string;
  name: string;
  
  exp: number;
  iat: number;
  id: number;
  avatar?: string;
}

const Login: React.FC = () => {
  const {login} = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [loginState, setLoginState] = useState<LoginState>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginService(loginState["email"], loginState["password"])
      if (response.token) {
        // const decode = jwtDecode<MyJwtType>(response.token);
        login(response);
        toast.success("Welcome back!");
        navigate("/profile");
      }
    } catch (error:any) {
      // console.error("Error logging in:", error);
      if (error.response.data)
      toast.error(error.response.data.error);
    }
    setIsLoading(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  return (
    <div className="w-full h-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="-space-y-px">
            {loginFields.map((field: Field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id] || ""}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
          </div>
          <FormExtra />

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          >
           {isLoading? "Loading ..." : "Login"} 
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet? <a href="/signup" className="font-medium text-purple-600 hover:underline dark:text-purple-500">signup</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
