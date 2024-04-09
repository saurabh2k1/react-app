
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";
import MenuAvatar from "../components/core/MenuAvatar";
import LoginPage from "./LoginPage";

const ProfilePage = () => {
    const {userName, isLoggedIn} = useAuth();



    return (
        isLoggedIn ? (
            <div className="">
            <div className="h-32 overflow-hidden">
                <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
            </div>
            <div className="flex justify-center px-5 -mt-12">
                <MenuAvatar size={32} className="border-4 border-white dark:border-gray-800 mx-auto my-4" />
            </div>
            <div className="">
                <div className="text-center px-14">
                    <h2 className="text-gray-800 text-3xl font-bold dark:text-gray-100">
                        {userName}
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm dark:text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
            </div>
        </div>
        ): (
            <LoginPage />
        )
    )
}

export default ProfilePage;