import Signup from "../components/Signup";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6  mx-auto  lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
