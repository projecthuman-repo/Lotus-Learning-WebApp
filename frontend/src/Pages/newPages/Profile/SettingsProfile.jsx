import React, { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { MdClose } from "react-icons/md";
import OnHoverExtraHud from "../../../components/OnHoverExtraHud";
import styles from "../../../Styles";
import { CgDanger } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

const SettingsProfile = () => {
  const authUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState(authUser);
  const [selectedInput, setSelectedInput] = useState(null);

  const checkSelectedInput = (value) => {
    if(selectedInput === value) {
        return true;
    }
    else{
        return false;
    }

  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <div className="bg-white rounded-full flex justify-between items-center py-2 px-4  ">
        <p className="font-semibold text-lg">Settings</p>
        <div className="flex space-x-1">
          <div className="flex items-center space-x-3 bg-green-400 w-[30px] h-[30px] justify-center rounded-full cursor-pointer hover-parent">
            <p className="text-lg font-semibold text-green-100">
              <OnHoverExtraHud name="save" />
              <MdOutlineDone />
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-red-400 w-[30px] h-[30px] justify-center rounded-full cursor-pointer hover-parent">
            <p className="text-lg font-semibold text-red-200">
              <OnHoverExtraHud name="discard" />
              <MdClose />
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 font-bold text-xl">User Information</p>
      <div className="p-2 bg-white rounded-lg mt-1 no-select">
        <table className="table-auto w-full  ">
          <tbody>
            <tr>
              <td>
                <label
                  htmlFor="username"
                  className="font-medium cursor-pointer flex justify-between"
                >
                  <span>Username</span>
                </label>
              </td>
              <td className="text-end">
                {checkSelectedInput('username') ? (
                  <div className="flex  items-center justify-end space-x-2 ">
                    <input
                      value={user.username}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      id="username"
                      placeholder="Username"
                      type="text"
                      className={`${styles.simple_text_input} border`}
                    />
                    <MdOutlineClose
                      onClick={() => setSelectedInput(null)}
                      className="text-stone-500 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setSelectedInput("username")}
                    className="flex  items-center justify-end space-x-2 cursor-pointer"
                  >
                    <p className="text-sm">{user.username}</p>
                    <div className="hover:bg-stone-200 p-2 rounded-full transition-all hover-parent">
                      <OnHoverExtraHud name="edit" />
                      <FiChevronRight className="text-stone-500" />
                    </div>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor="email"
                  className="font-medium cursor-pointer flex justify-between"
                >
                  <span>Email</span>
                </label>
              </td>
              <td className="text-end">
                {checkSelectedInput('email') ? (
                  <div className="flex  items-center justify-end space-x-2 ">
                    <input
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      id="email"
                      placeholder="Email"
                      type="text"
                      className={`${styles.simple_text_input} border`}
                    />
                    <MdOutlineClose
                      onClick={() => setSelectedInput(null)}
                      className="text-stone-500 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setSelectedInput("email")}
                    className="flex  items-center justify-end space-x-2 cursor-pointer"
                  >
                    <p className="text-sm">{user.email}</p>
                    <div className="hover:bg-stone-200 p-2 rounded-full transition-all hover-parent">
                      <OnHoverExtraHud name="edit" />
                      <FiChevronRight className="text-stone-500" />
                    </div>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor="password"
                  className="font-medium cursor-pointer flex justify-between"
                >
                  <span>Password</span>
                </label>
              </td>
              <td className="text-end">
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  className={`${styles.simple_text_input} border`}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor="code"
                  className="font-medium cursor-pointer flex justify-between"
                >
                  <span>Institution Code</span>
                </label>
              </td>
              <td className="text-end">
                <input
                  id="code"
                  placeholder="Code"
                  type="text"
                  className={`${styles.simple_text_input} border`}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SettingsProfile;
