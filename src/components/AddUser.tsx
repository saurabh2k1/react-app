import { TiCancel } from "react-icons/ti";
import {
    IoSaveOutline,
  } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { cn } from "../utils/utils";
import Toggler from "./core/Toggler";


interface IUser {
    name: string,
    email: string,
    dob: string
    password?: string,
} 

interface AddUserProps {
    onSave: (user:IUser) => void;
    user?: IUser;
    readOnly?: boolean
    onDiscard: ()=> void;
}

const AddUser: React.FC<AddUserProps> = ({onSave, user, readOnly= false, onDiscard}) => {
    
    const [newUser, setNewUser] = useState<IUser>({name: '', email: '', dob: '', password: ''});
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewUser((prevState) => {
            return {...prevState, [name]: value};
        });
        setIsDirty(true);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        console.log(newUser);
        onSave(newUser);
    };

    useEffect(() => {
        if (user) {
            setNewUser(user);
        }
    }, [user]);

    return (
        <div className="flex items-center space-x-3 w-full">
            <div className="relative p-4 w-full max-w-exl h-full md:h-auto">
              <div className="relative p-4 bg-gray-100 rounded-lg shadow dark:bg-gray-700 ms:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font0semibold text-gray-900 dark:text-white">
                    { user? readOnly? "Displaying ": "Update ": "Add "} User
                  </h3>
                  
                </div>
                {/* body */}
               
                <form action="" onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={newUser.name}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                        required
                        placeholder="Enter user name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={newUser.email}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={newUser.password}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                        required
                        placeholder="Enter user password"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dob"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={newUser.dob}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3 ">
                    { !readOnly &&<button
                      type="submit"
                      disabled={!isDirty}
                      className={cn("text-white inline-flex items-center bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800",
                      {
                        "cursor-not-allowed bg-gray-400 dark:bg-gray-600" : !isDirty
                      })}
                    >
                      <IoSaveOutline className="mr-1 -ml-1 w-6 h-6" />
                      {user? 'Update User': 'Add User'}
                    </button> }
                    <button
                      type="reset"
                      onClick={onDiscard}
                      className="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <TiCancel className="mr-1 -ml-1 w-6 h-6" />
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    );
}

export default AddUser;