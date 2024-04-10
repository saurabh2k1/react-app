import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  IoSettings,
  IoSearch,
  IoAddCircle,
} from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { IoFileTray } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlinePageview, MdDelete } from "react-icons/md";

import Checkbox from "./core/Checkbox";
import UserService from "../services/UserService";
import Pagination from "./Pagination";

import { toast } from "react-toastify";
import AddUser from "./AddUser";

const UserList: React.FC<any> = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  let PageSize = 5;

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setSelected([...selected, id]);

    if (!checked) {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    console.log("checked", checked);
    if (checked && userList) {
      setSelected(
        userList.map((object) => {
          return object.id.toString();
        })
      );
      console.log("Selected", selected);
    } else {
      setSelected([]);
    }
  };

  const handleDiscard = () => {
    toast.warn("You have discarded the operation");
    setUser(null);
    handleShowList();
  };

  const handleShowList = () => {
    setShowPreview(false);
    setShowNew(false);
    setShowEdit(false);
    setShowList(true);
  };

  const handleShowNew = () => {
    setShowPreview(false);
    setShowEdit(false);
    setShowList(false);
    setShowNew(true);
  };

  const handleShowEdit = (user: any) => {
    console.log("selected User:", user);
    setUser(user);
    setShowPreview(false);
    setShowList(false);
    setShowNew(false);
    setShowEdit(true);
  };

  const handleShowPreview = (user: any) => {
    console.log("selected User:", user);
    setUser(user);
    setShowList(false);
    setShowNew(false);
    setShowEdit(false);
    setShowPreview(true);
  };

  useEffect(() => {
    const userService = new UserService();
    const getUsers = async () => {
      const users = await userService.getAll();
      // console.log(users);
      setUserList(users);
    };
    getUsers();
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return userList?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, userList, PageSize]);

  return (
    userList && (
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b border-gray-500 dark:border-gray-700">
          <div className="flex-1 flex items-center space-x-2">
            {selected.length > 0 && showList && (
              <h5 className="text-gray-500 dark:text-gray-400 ml-1">
                Selected {selected.length} rows
              </h5>
            )}
          </div>
          <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3">
            <button
              type="button"
              className="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <IoSettings className="mr-2 w-4 h-4" />
              Table Settings
            </button>
            {!showList && (
              <button
                type="button"
                onClick={handleShowList}
                className="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <FaTableList className="mr-2 w-4 h-4" /> Show List
              </button>
            )}
            {!showNew && (
              <button
                type="button"
                onClick={handleShowNew}
                className="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <IoAddCircle className="mr-2 w-4 h-4" />
                Add User
              </button>
            )}
            {showPreview && !showEdit && (
              <button
                type="button"
                onClick={() => handleShowEdit(user)}
                className="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <LiaUserEditSolid className="mr-2 w-4 h-4" />
                Edit User
              </button>
            )}
            {!showPreview && showEdit && (
              <button
                type="button"
                onClick={() => handleShowPreview(user)}
                className="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <MdOutlinePageview className="mr-2 w-4 h-4" />
                Preview User
              </button>
            )}
          </div>
        </div>

        {showNew && (
          <AddUser onSave={handleDiscard} onDiscard={handleDiscard} />
        )}

        {showEdit && (
          <AddUser
            user={user}
            onSave={handleDiscard}
            onDiscard={handleDiscard}
          />
        )}
        {showPreview && (
          <AddUser
            user={user}
            onSave={handleDiscard}
            onDiscard={handleDiscard}
            readOnly={true}
          />
        )}

        {showList && (
          <div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 ">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IoSearch />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      placeholder="Search"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <FaFilter className="mr-1 -ml-1 w-5 h-5" />
                  Filter options
                  <IoMdArrowDropdown /> <IoMdArrowDropup />
                </button>
                {/* //DropDown */}
              </div>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  type="button"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Actions
                  <IoMdArrowDropdown /> <IoMdArrowDropup />
                </button>
                {/* //Dropdown */}
              </div>
            </div>

            <div className="list">
              <div className="overflow-x-auto">
                {userList.length < 1 ? (
                  <div className="flex justify-center items-center w-full">
                    <IoFileTray className=" font-bold text-7xl text-gray-700 dark:text-gray-200" />
                    <h2>No record found!</h2>
                  </div>
                ) : (
                  <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <Checkbox
                              type="checkbox"
                              isChecked={selected.length === userList.length}
                              handleClick={handleSelectAll}
                              key="chkall"
                              name="chkbox"
                              id="chkall"
                            ></Checkbox>
                          </div>
                        </th>
                        <th scope="col" className="p-4">
                          Name
                        </th>
                        <th scope="col" className="p-4">
                          DoB
                        </th>
                        <th scope="col" className="p-4">
                          Points
                        </th>
                        <th scope="col" className="p-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTableData.map((user: any) => (
                        <tr
                          key={user.id}
                          className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <Checkbox
                                type="checkbox"
                                isChecked={selected.includes(
                                  user.id.toString()
                                )}
                                handleClick={handleSelect}
                                key={user.id}
                                name="chkbox"
                                id={user.id}
                              ></Checkbox>
                            </div>
                          </td>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="flex items-center mr-3">
                              <img
                                src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                                alt="ds"
                                className="h-8 w-8 mr-3 rounded-full"
                              />
                              {user.name}
                            </div>
                          </th>
                          <td className="px-4 py-3">
                            <span className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300">
                              {user.dob}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1.47
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center space-x-4">
                              <button
                                type="button"
                                onClick={() => handleShowEdit(user)}
                                className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 border-violet-700  focus:outline-none bg-white rounded-lg border hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                <LiaUserEditSolid className="h-4 w-4 mr-2 -ml-0.5" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleShowPreview(user)}
                                className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                <MdOutlinePageview className="h-4 w-4 mr-2 -ml-0.5" />
                                Preview
                              </button>
                              <button
                                type="button"
                                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                              >
                                <MdDelete className="h-4 w-4 mr-2 -ml-0.5" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3 p-2">
                <Pagination
                  currentPage={currentPage}
                  totalCount={userList.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
                <h5>
                  <span className="text-gray-500 dark:text-gray-300">
                    Total records:{" "}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">
                    {userList.length}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UserList;
