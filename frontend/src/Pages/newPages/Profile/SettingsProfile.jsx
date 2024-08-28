import React, { useState, useEffect } from "react";
import { MdOutlineDone, MdClose, MdOutlineClose } from "react-icons/md";
import OnHoverExtraHud from "../../../components/OnHoverExtraHud";
import styles from "../../../Styles";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import updateEmailProxy from "../../../BackendProxy/userProxy/updateEmailProxy"; 
import updateUsernameProxy from "../../../BackendProxy/userProxy/updateUsernameProxy";
import updateInstitutionCodeProxy from "../../../BackendProxy/userProxy/updateInstitutionCodeProxy";
import updatePasswordProxy from "../../../BackendProxy/userProxy/updatePasswordProxy";

const SettingsProfile = () => {
  const authUser = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  console.log("authuser is " + JSON.stringify(authUser));
  const [user, setUser] = useState(authUser); 
  const [selectedInput, setSelectedInput] = useState(null);
  
  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const checkSelectedInput = (value) => {
    return selectedInput === value;
  };

  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleInstitutionCodeChange = (e) => {
    setUser({ ...user, institutionCode: e.target.value });
  };

  const handleUsernameUpdate = async () => {
    try {
        await updateUsernameProxy(user._id, user.username); 
        console.log("Username updated to:", user.username);

        
        dispatch(updateAuthUser({ ...authUser, username: user.username }));

        setSelectedInput(null);
    } catch (error) {
        console.error("Failed to update username:", error);
    }
};

const handleInstitutionCodeUpdate = async () => {
    try {
        await updateInstitutionCodeProxy(user._id, user.institutionCode); 
        console.log("Institution Code updated to:", user.institutionCode);

       
        dispatch(updateAuthUser({ ...authUser, institutionCode: user.institutionCode }));

        setSelectedInput(null);
    } catch (error) {
        console.error("Failed to update institution code:", error);
    }
};

  const updateAuthUser = (newUserData) => {
    return {
      type: 'UPDATE_AUTH_USER',
      payload: newUserData
    };
  };
  const handleEmailUpdate = async () => {
    try {
      await updateEmailProxy(user._id, user.email); 
      console.log("Email updated to:", user.email);
      authUser.email=user.email;

      dispatch(updateAuthUser(user.email));

      setSelectedInput(null);
    } catch (error) {
      console.error("Failed to update email:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
        await updatePasswordProxy(user._id, user.password); 
        console.log("Password updated successfully");


        setSelectedInput(null);
    } catch (error) {
        console.error("Failed to update password:", error);
    }
};

  const handleSave = async () => {
    try {
      if (checkSelectedInput("email")) await handleEmailUpdate();
      if (checkSelectedInput("username")) await handleUsernameUpdate();
      if (checkSelectedInput("institutionCode")) await handleInstitutionCodeUpdate();
      if (checkSelectedInput("password")) await handlePasswordUpdate();

      setSelectedInput(null);
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
        <p className="font-semibold text-lg">Settings</p>
        <div className="flex space-x-1">
          <div
            onClick={handleSave} 
            className="flex items-center space-x-3 bg-green-400 w-[30px] h-[30px] justify-center rounded-full cursor-pointer hover-parent"
          >
            <p className="text-lg font-semibold text-green-100">
              <OnHoverExtraHud name="save" />
              <MdOutlineDone />
            </p>
          </div>
          <div
            onClick={() => setSelectedInput(null)} 
            className="flex items-center space-x-3 bg-red-400 w-[30px] h-[30px] justify-center rounded-full cursor-pointer hover-parent"
          >
            <p className="text-lg font-semibold text-red-200">
              <OnHoverExtraHud name="discard" />
              <MdClose />
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 font-bold text-xl">User Information</p>
      <div className="p-2 bg-white rounded-lg mt-1 no-select">
        <table className="table-auto w-full">
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
                {checkSelectedInput("username") ? (
                  <div className="flex items-center justify-end space-x-2">
                    <input
                      value={user.username}
                      onChange={handleUsernameChange}
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
                    className="flex items-center justify-end space-x-2 cursor-pointer"
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
                {checkSelectedInput("email") ? (
                  <div className="flex items-center justify-end space-x-2">
                    <input
                      value={user.email}
                      onChange={handleEmailChange}
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
                    className="flex items-center justify-end space-x-2 cursor-pointer"
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
              {checkSelectedInput("password") ? (   
                <div className="flex items-center justify-end space-x-2">
                    <input                   
                      id="password"
                      onChange={handlePasswordChange}
                      placeholder="Password"
                      type="password"
                      className={`${styles.simple_text_input} border`}
                    />  
                    <MdOutlineClose
                      onClick={() => setSelectedInput(null)}
                      className="text-stone-500 cursor-pointer"
                />
                </div>
              ): (
                <div
                  onClick={() => setSelectedInput("password")}
                  className="flex items-center justify-end space-x-2 cursor-pointer"
                >
                  <p className="text-sm">password</p>
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
                  htmlFor="code"
                  className="font-medium cursor-pointer flex justify-between"
                >
                  <span>Institution Code</span>
                </label>
              </td>
              <td className="text-end">
              {checkSelectedInput("institutionCode") ? (
                  <div className="flex items-center justify-end space-x-2">
                    <input
                      
                      onChange={handleInstitutionCodeChange}
                      id="code"
                      placeholder="Code"
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
                    onClick={() => setSelectedInput("institutionCode")}
                    className="flex items-center justify-end space-x-2 cursor-pointer"
                  >
                    <p className="text-sm"></p>
                    <div className="hover:bg-stone-200 p-2 rounded-full transition-all hover-parent">
                      <OnHoverExtraHud name="edit" />
                      <FiChevronRight className="text-stone-500" />
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SettingsProfile;
