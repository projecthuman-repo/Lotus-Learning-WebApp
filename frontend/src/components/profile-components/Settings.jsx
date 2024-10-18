import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscEdit } from "react-icons/vsc";
import styles from "../../Styles";
import { useDispatch, useSelector } from "react-redux";
import { noPfpGenerator } from "../../components/navbar/GeneralNavbar"; // Importing the noPfpGenerator function

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState(authUser.username);
  const [editingUserName, setEditingUserName] = useState(false);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setProfilePicture(URL.createObjectURL(selectedImage));
  };

  const navigateTo = () => {
    navigate('/profile/profile-settings/ChangePassword');
  };

  return (
    <div className="min-h-[80vh]">
      <div className="flex items-center mx-auto mt-2  max-w-[1400px] ">
        <div className="flex items-center space-x-3 px-2 md:px-0">
          <div className="flex flex-col items-center  justify-center space-y-2">
            <div className="md:h-[150px] md:w-[150px] sm:h-[100px] sm:w-[100px] h-[75px] w-[75px] bg-black rounded-full flex items-center justify-center overflow-hidden">
              {profilePicture === "" ? (
                <p className="text-white md:text-5xl text-2xl font-bold">{noPfpGenerator(authUser.username)}</p> // Using noPfpGenerator function to generate initials
              ) : (
                <img
                  src={profilePicture}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <button className="font-semibold linearGradient_ver1 text-white p-2 text-xs rounded-full relative ">
              Change Picture
              <input
                type="file"
                name=""
                onChange={handleImageChange}
                accept="image/*"
                id=""
                className="absolute left-0 top-0 h-full opacity-0 cursor-pointer"
              />
            </button>
            <button className="font-semibold linearGradient_ver1 text-white p-2 text-xs rounded-full relative" onClick={navigateTo}>
              Change Password
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-stone-700 font-semibold md:text-2xl text-xl flex items-center ">
              {editingUserName ? (
                <input placeholder="New Username" value={username} onChange={(e) => setUsername(e.target.value)} className={`${styles.simple_text_input} text-base`} autoFocus onBlur={() => setEditingUserName(false)}/>
              ) : (
                <>
                  {username}
                  <VscEdit
                    className="text-sm mx-2 cursor-pointer"
                    onClick={() => setEditingUserName(true)}
                  />
                </>
              )}
            </p>
            <p className="text-stone-600 md:text-base text-xs font-ligth ">
                      <p className="text-xs text-stone-500">{authUser.email}</p>
            </p>

          </div>
        </div>
      </div>
      <div className="w-full border-b my-4"></div>
      <div className="flex justify-center flex-col mx-auto px-2 max-w-[1400px] mt-2">
        <p className="font-semibold text_linearGradient_ver1 text-md text-end">
          Account Info
        </p>
        <div className="flex md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0">
          <div className="flex flex-col">
            <label htmlFor="county" className="font-semibold text-stone-700">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder=". . ."
              className={`${styles.simple_text_input} text-sm`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="font-semibold text-stone-700">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder=". . ."
              className={`${styles.simple_text_input} text-sm`}
            />
          </div>
        </div>
        <div className="flex flex-col my-3">
          <label htmlFor="city" className="font-semibold text-stone-700">
            Biography
          </label>
          <textarea
            id="city"
            type="text"
            rows={5}
            placeholder=". . ."
            className={`${styles.simple_text_input} text-sm`}
          />
        </div>
      </div>
      <div className="w-full border-b my-4"></div>
      <div className="flex justify-center flex-col mx-auto px-2 max-w-[1400px] mt-2">
        <p className="font-semibold text_linearGradient_ver1 text-md text-end">
          Notification Settings
        </p>
        <div className="flex md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0">
          <div className="flex flex-col">
            <label htmlFor="county" className="font-semibold text-stone-700">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder=". . ."
              className={`${styles.simple_text_input} text-sm`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="font-semibold text-stone-700">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder=". . ."
              className={`${styles.simple_text_input} text-sm`}
            />
          </div>
        </div>
        <div className="flex flex-col my-3">
          <label htmlFor="city" className="font-semibold text-stone-700">
            Biography
          </label>
          <textarea
            id="city"
            type="text"
            rows={5}
            placeholder=". . ."
            className={`${styles.simple_text_input} text-sm`}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
