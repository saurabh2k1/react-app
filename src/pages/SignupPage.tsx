import Signup from "../components/Signup";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
      <a
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Company Name
      </a>
      <div className="w-full text-gray-700 dark:text-gray-200">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
