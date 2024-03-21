import { useState } from "react";
import { signupFields, Field } from "../utils/formField";
import Input from "./core/Input";
import {signupService} from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

interface SignupState {
  [key: string]: string;
}

const Signup = () => {
  const [signupState, setSignupState] = useState<SignupState>({});
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate()

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, confirmPassword } = signupState;
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const response = await signupService(signupState);
        if(response) {
            toast.success("User successfully registered!");
            navigate('/login');
        }
        console.log("response: ", response);
      } catch (error: any) {
        toast.error(error.error || "An error occurred");
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create your account
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 md:space-y-6">
          <div className="">
            {signupFields.map((field: Field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id] || ""}
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
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!isChecked}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
