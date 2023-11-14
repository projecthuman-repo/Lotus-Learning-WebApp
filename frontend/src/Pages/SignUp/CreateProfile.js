import React, { useEffect, useState, useRef } from "react";
import PhotoPlaceholder from "../../components/PhotoPlaceholder/PhotoPlaceholder";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../helpers/api/mutations";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// MUI ICONS
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

const CreateProfile = ({
  setCurrentStep,
  setAcceptedEmail,
  setAcceptedPassword,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [accountType, setAccountType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [school, setSchool] = useState("");

  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);

  const handleRegister = async () => {
    const userInput = {
      name,
      email,
      country,
      stateProvince,
      accountType,
      password,
      school,
    };
    try {
      const {data} = await createUserMutation({
        variables: {
          userInput
        },
      });

      setAcceptedEmail(email);
      setAcceptedPassword(password);
      setCurrentStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  // const onProfilePicClick = () => {
  //   profilePic.current.click();
  // };

  return (
    // STYLED USING bootstrap

    // <div className='bgc-lightLightGray p-5'>
    //   <div className='row '>
    //     <div className='col-sm-6 '>
    //       {/* This is repeating only for mobile view */}
    //       <div className='d-flex d-sm-none justify-content-end mt-4'>
    //         <div className='d-flex flex-column'>
    //           <PhotoPlaceholder />
    //           <div className='d-flex mx-auto mt-3'>
    //             <FileUploadOutlinedIcon />
    //             <p className='fw-500'>Upload Profile Photo</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='mt-6 mt-sm-4'>
    //         <label htmlFor='signupFullName'>
    //           <p className='fs-18 fw-500'>Full Name*</p>
    //         </label>
    //         <input
    //           className='form-control'
    //           id='signupFullName'
    //           type='text'
    //           value={name}
    //           onChange={(e) => {
    //             setName(e.target.value);
    //           }}
    //         />
    //       </div>

    //       <div className='mt-4'>
    //         <label htmlFor='signupEmail'>
    //           <p className='fs-18 fw-500'>Email*</p>
    //         </label>
    //         <input
    //           className='form-control'
    //           id='signupEmail'
    //           type='text'
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>

    //       <div className='mt-4'>
    //         <label htmlFor='signupPassword'>
    //           <p className='fs-18 fw-500'>Password*</p>
    //         </label>
    //         <input
    //           className='form-control'
    //           id='signupPassword'
    //           type='password'
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>

    //       <div className='mt-4'>
    //         <label htmlFor='signupConfirmPassword'>
    //           <p className='fs-18 fw-500'>Confirm Password*</p>
    //         </label>
    //         <input
    //           className='form-control'
    //           id='signupConfirmPassword'
    //           type='password'
    //           value={confirmedPassword}
    //           onChange={(e) => setConfirmedPassword(e.target.value)}
    //         />
    //       </div>

    //       <div className='mt-4'>
    //         <label htmlFor='signupCountry'>
    //           <p className='fs-18 fw-500'>Country*</p>
    //         </label>
    //         <input
    //           className='form-control'
    //           id='signupCountry'
    //           type='text'
    //           value={country}
    //           onChange={(e) => setCountry(e.target.value)}
    //         />
    //       </div>

    //       <div className='mt-4'>
    //         <label htmlFor='signupStateProvince'>
    //           <p className='fs-18 fw-500'>State/Province*</p>
    //         </label>
    //         <input
    //           className='form-control'
    //           id='signupStateProvince'
    //           type='text'
    //           value={stateProvince}
    //           onChange={(e) => setStateProvince(e.target.value)}
    //         />
    //       </div>

    //       <div className='mt-4'>
    //         <label htmlFor='signupAccountType'>
    //           <p className='fs-18 fw-500'>Type of Account*</p>
    //         </label>
    //         <select
    //           className='form-select'
    //           id='signupAccountType'
    //           value={accountType}
    //           onChange={(e) => setAccountType(e.target.value)}
    //         >
    //           <option>-</option>
    //           <option value={'Learner'}>Learner</option>
    //           <option value={'Educator'}>Educator</option>
    //           <option value={'Admin'}>Admin</option>
    //         </select>
    //       </div>

    //       <div className='mt-4'>
    //         <label htmlFor='signupSchool'>
    //           <p className='fs-18 fw-500'>School (Optional)</p>
    //         </label>
    //         <input
    //           className='form-control'
    //           id='signupSchool'
    //           type='text'
    //           value={school}
    //           onChange={(e) => setSchool(e.target.value)}
    //         />
    //       </div>
    //     </div>

    // <div className='col-sm-6 d-none d-sm-block'>
    //   <div className='d-flex justify-content-end mt-4'>
    //     <div className='d-flex flex-column'>
    //       <PhotoPlaceholder />
    //       <div className='d-flex mx-auto mt-3'>
    //         <FileUploadOutlinedIcon />
    //         Upload Profile Photo
    //         {/* <input
    //             type='file'
    //             name='profilePic'
    //             ref={profilePic}
    //             style={{ display: 'none' }}
    //           /> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>
    // <div className='row justify-content-sm-end p-3'>
    //   <div className='col-sm-6'>
    //     <div className='d-flex mt-4 mt-sm-0'>
    //       <button
    //         type='submit'
    //         className='btn btn-gray-shadow w-50 fs-22 p-2 mx-auto mx-sm-0 ms-sm-auto'
    //         onClick={handleRegister}
    //       >
    //         Next
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // </div>

    // STYLED USING TAILWIND
    <div className="w-full p-5 bg-zinc-200 rounded-sm flex  flex-col-reverse lg:flex-row text-sm md:text-base">
      {/* INPUTS */}
      <div className="lg:w-[60%] w-full">
        {/* FULL NAME */}
        <div className="flex flex-col">
          <label htmlFor="signupFullName">
            <p className="font-semibold">Full Name *</p>
          </label>
          <FormInput
            placeholder=""
            id="signupFullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* EMAIL */}
        <div className="flex flex-col mt-3">
          <label htmlFor="signupEmail">
            <p className="font-semibold">Email *</p>
          </label>
          <FormInput
            placeholder=""
            id="signupEmail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* PASSWORD - CONFIRM PASSWORD */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* PASSWORD */}
          <div className="flex flex-col mt-3 md:w-[49%] w-full">
            <label htmlFor="signupPassword">
              <p className="font-semibold">Password *</p>
            </label>
            <FormInput
              placeholder=""
              id="signupPassword"
              type="password"
              value={password}
              isPassword={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col mt-3 md:w-[49%] w-full">
            <label htmlFor="signupConfirmPassword">
              <p className="font-semibold">Confirm Password *</p>
            </label>
            <FormInput
              placeholder=""
              id="signupConfirmPassword"
              type="password"
              value={confirmedPassword}
              isPassword={true}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </div>
        </div>
        {/* COUNTRY - STATE */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* COUNTRY */}
          <div className="flex flex-col mt-3 md:w-[49%] w-full">
            <label htmlFor="signupCountry">
              <p className="font-semibold">Country *</p>
            </label>
            <FormInput
              placeholder=""
              id="signupCountry"
              type="type"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          {/* STATE PROVINCE */}
          <div className="flex flex-col mt-3 md:w-[49%] w-full">
            <label htmlFor="signupStateProvince">
              <p className="font-semibold">State/Province *</p>
            </label>
            <FormInput
              placeholder=""
              id="signupStateProvince"
              type="type"
              value={stateProvince}
              onChange={(e) => setStateProvince(e.target.value)}
            />
          </div>
        </div>

        {/* TYPE OF ACCOUNT */}
        <div className="flex flex-col mt-3">
          <label htmlFor="signupAccountType">
            <p className="font-semibold">Type of Account *</p>
          </label>
          <DropDownInput
            value={accountType}
            id="signupAccountType"
            onError={false}
            options={["Learner", "Educator", "Admin"]}
            changeValue={setAccountType}
          />
        </div>
        {/* SCHOOL */}
        <div className="flex flex-col mt-3">
          <label htmlFor="signupSchool">
            <p className="font-semibold">School </p>
          </label>
          <FormInput
            placeholder=""
            id="signupSchool"
            type="type"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <div className="block lg:hidden  w-full">
          <button
          onClick={handleRegister}
          className="hover:bg-zinc-300  mt-3 bg-zinc-200 text-zinc-700 font-semibold rounded-sm py-2 w-full shadow-lg">
            Next
          </button>
        </div>
      </div>
      <div className="lg:w-[40%] w-full mb-3 flex flex-col items-center justify-between">
        <div className="">
          <div className="flex flex-col items-center justify-center mt-4 ">
              <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] flex items-center justify-center text-zinc-100 bg-zinc-300 rounded-full ">
                <AddAPhotoOutlinedIcon 
                sx={{ fontSize: '70px', color: 'white' }}/>
              </div>
              <div className="flex mx-auto mt-3 cursor-pointer">
                <FileUploadOutlinedIcon />
                Upload Profile Photo
                {/* <input
                    type='file'
                    name='profilePic'
                    ref={profilePic}
                    style={{ display: 'none' }}
                  /> */}
              </div>
          </div>
        </div>
        <div className="hidden lg:block  w-[70%]">
          <button 
          onClick={handleRegister}
          className="hover:bg-zinc-300  mt-3 bg-zinc-200 text-zinc-700 font-semibold rounded-sm py-2 w-full shadow-lg">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({
  placeholder,
  value,
  onChange,
  id,
  type,
  onError,
  isPassword = false,
}) => {
  const [visible, setVisible] = useState(!isPassword ? true : false);

  return (
    <div className="relative ">
      <input
        className="w-full focus:outline-none p-2 rounded-md mt-1 border-[0.05rem] border-zinc-400 focus:border-zinc-600"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        type={!isPassword ? type : visible ? "text" : "password"}
      />
      {isPassword && (
        <div
          onClick={() => setVisible(!visible)}
          className="absolute cursor-pointer right-3 top-[25%] text-zinc-500"
        >
          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
      )}
    </div>
  );
};

const DropDownInput = ({ value, id, onError, options, changeValue }) => {
  const dropDownRef = useRef(null);
  const [openDropDown, setOpenDropDown] = useState(false);

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setOpenDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <div className="relative" ref={dropDownRef}>
      <input
        onChange={()=>{}}
        placeholder="-"
        className="w-full focus:outline-none p-2 rounded-md mt-1  border-[0.05rem] border-zinc-400 focus:border-zinc-600"
        value={value}
        id={id}
        onClick={toggleDropDown}
      />
      {/* DROP DOWN */}
      {openDropDown && (
        <div className="absolute w-full overflow-hidden bg- rounded-b-md bg-white border-b-[0.05rem] border-x-[0.05rem] border-zinc-400 z-10 top-[100%]">
          {options.map((item, i) => {
            return (
              <div
                onClick={() => changeValue(item)}
                key={i}
                className="py-1 w-full px-2 cursor-pointer bg-zinc-50 hover:bg-zinc-300 "
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="absolute cursor-pointer right-3 top-[25%] text-zinc-500">
        {openDropDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
    </div>
  );
};

export default CreateProfile;
