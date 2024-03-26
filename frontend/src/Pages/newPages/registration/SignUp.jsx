import React, { useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import styles from "../../../Styles";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import { useEffect } from "react";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slice/user/userSlice";

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [invalid_email, setInvalidEmail] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [same_password, setSamePassword] = useState(false)
  const [missing_data, setMissingData] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);


  const navigateTo = () => {
    navigate('/registration?screen=login')
  }

  const createAccount = async() => {
    setLoading(true)
    if(email.length > 0 && !invalid_email &&  username.length > 0 && password.length > 0 && !same_password) {
      setMissingData(false)
      try {
        const response = await axios.post('http://localhost:5000/user/create-user',
        {
          email,
          username,
          password,
          confirm_password
        }
        );

        if(response.data.success){
          const saveOnCookies = await axios.post('http://localhost:5000/cookies/save-user', {
            ...response.data.user
          })
  
          console.log(saveOnCookies.data)
          if(saveOnCookies.status === 200) {
            await dispatch(setUser(saveOnCookies.data.data))
            navigate('/')
          }
  
        }
        setLoading(false);

        console.log('created:', response.data);
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      }
    }else{
      setMissingData(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    if(password.length > 0 && confirm_password.length > 0){
      if(password === confirm_password){
        setSamePassword(false)
      }else{
        setSamePassword(true)
      }
    }

    if(email.length > 0){
      const values = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if(values.test(email)){
        setInvalidEmail(false)
      }
      else{
        setInvalidEmail(true)
      }
    }
  },[password,confirm_password, email])


  return (
    <div className="space-y-3 w-[400px] no-select  md:p-0 p-2">
    <div>
      <p className="text-start font-bold text-2xl">Create Account</p>
      <p className="text-start font-ligth text-sm">
        Let's create your account!
      </p>
    </div>
    <div className="flex flex-col">
      <div>
      {missing_data && 
      <div className="flex items-center justify-between text-red-400">
        <p>
          Please fill all the data
        </p>
        <CgDanger className="ml-1
        "/>
      </div>
      }
      </div>
      <label htmlFor="email" className="font-bold cursor-pointer flex justify-between">
        <span>
          Email
        </span>
        <span>
          {invalid_email? <CgDanger className="text-red-400"/>:""}
        </span>
      </label>
      <input
        id="email"
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${styles.simple_text_input}`}
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="username" className="font-bold cursor-pointer">
        Username
      </label>
      <input
        id="username"
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`${styles.simple_text_input}`}
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="password" className="font-bold cursor-pointer">
        Password
      </label>
      <div
        className={`w-full ${styles.simple_text_input} flex justify-between items-center`}
      >
        <input
          id="password"
          placeholder="Password"
          value={password}
          type={passwordVisibility ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          className={`focus:outline-none w-full`}
        />
        {passwordVisibility ? (
          <MdOutlineVisibility onClick={() => {
            setPasswordVisibility(false)
          }} className="mx-1 text-black cursor-pointer" />
        ) : (
          <MdOutlineVisibilityOff onClick={() => setPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
        )}
      </div>
    </div>
    <div className="flex flex-col">
      <label htmlFor="confirm-email" className="font-bold cursor-pointer flex justify-between">
        <span>
          Confirm Password
        </span>
        <span>
          {same_password? 
          <CgDanger className="text-red-400"/>
          : ''}
        </span>
      </label>
      <div
        className={`w-full ${styles.simple_text_input} flex justify-between items-center`}
      >
        <input
          id="confirm-email"
          placeholder="Confirm Password"
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={confirmPasswordVisibility ? "text" : "password"}
          className={`focus:outline-none w-full`}
        />
        {confirmPasswordVisibility ? (
          <MdOutlineVisibility onClick={() => {
            setConfirmPasswordVisibility(false)
          }} className="mx-1 text-black cursor-pointer" />
        ) : (
          <MdOutlineVisibilityOff onClick={() => setConfirmPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
        )}
      </div>
      <p className="text-start font-ligth text-sm">
        Already have an account <span onClick={navigateTo} className="text-blue-500 cursor-pointer font-bold mt-1">Login</span>
      </p>
    </div>
    <button onClick={() => createAccount()} className="py-2 rounded-sm flex items-center justify-center font-semibold transition-all w-full text-white bg-blue-500 hover:bg-blue-400">
      {loading? 
        <SpinnerLoader/>  
        :
        "Create account"
  }
      
      
    </button>
    <button className="py-2 rounded-sm flex items-center justify-center font-ligth transition-all w-full border text-stone-600 hover:bg-stone-50">
    <FaGoogle  className="text-xl mx-2"/>
     Sign with Google 

    </button>

  </div>
  )
}

export default SignUp