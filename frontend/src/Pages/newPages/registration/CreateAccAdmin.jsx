import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import BlobComposition from "../../../components/backgrounds/BlobComposition/BlobComposition";
import { MdContentCopy, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import OnHoverExtraHud from "../../../components/OnHoverExtraHud";
import checkInvitationCode from "../../../BackendProxy/userProxy/checkInvitationCode";
import { IoMdSend } from "react-icons/io";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import styles from "../../../Styles";
import { CgDanger } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slice/user/userSlice";
import saveUserOnCookies from "../../../BackendProxy/cookiesProxy/saveUserCookies";

const CreateAccAdmin = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("phase");

  const [validCode, setValidCode] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/registration?screen=admin&phase=1");
    }
  }, [id]);

  return (
    <div className="relative min-h-[80vh]">
      <BlobComposition
        blobsData={[
          { top: "10%", left: "-20%", size: "700px" },
          { top: "-30%", left: "70%", size: "700px" },
        ]}
      />
      {id == 1 && <PhaseOne setValidCode={setValidCode} />}
      {id == 2 && <PhaseTwo />}
    </div>
  );
};

const PhaseOne = ({ setValidCode }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const sendInvitatonCode = async (code) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const checkedCode = await checkInvitationCode(code);
      console.log(checkedCode);
      if (checkedCode.success) {
        setValidCode(true);
        navigate("/registration?screen=admin&phase=2&code=" + code);
      }
      setLoading(false);
    } catch (err) {
      setNotFound(true);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCode(e.target.value);
    setNotFound(false);
  };

  const handlePasteButtonClick = () => {
    navigator.clipboard.readText()
      .then(text => {
        setCode(text);
        inputRef.current.focus();
      })
      .catch(err => {
        console.error('Error reading clipboard:', err);
        alert('Could not read clipboard.');
      });
  };

  return (
    <div className="m-auto max-w-[1200px] h-[80vh] flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-full w-full py-2 px-[3rem] flex items-center justify-center">
          <p className="font-medium text-2xl">Enter your invitation code here</p>
        </div>
        <div
          className={` ${notFound && "border-2 border-red-400"} mt-4 max-w-[500px] bg-white px-3 py-2 rounded-full flex items-center space-x-2 transition-all border`}
        >
          <div className="p-2 rounded-full hover:bg-stone-100 cursor-pointer hover-parent" onClick={handlePasteButtonClick}>
            <OnHoverExtraHud name="paste" />
            <MdContentCopy className="text-stone-500" />
          </div>
          <input
            ref={inputRef}
            value={code}
            onChange={(e) => handleInputChange(e)}
            placeholder="#000000"
            className="w-[80%] focus:outline-none text-center "
          />
        </div>
        <button
          onClick={() => sendInvitatonCode(code)}
          className="font-semibold rounded-full hover:bg-stone-100 cursor-pointer mt-3 flex items-center space-x-2 text-white px-3 py-1 transition duration-300 transform hover:-translate-y-1 linearGradient_ver1"
        >
          {loading ? <SpinnerLoader /> : "SUBMIT"}
        </button>
      </div>
      <div className="flex items-center justify-center flex-col text-sm">
        <p className="font-medium cursor-pointer">FAQ</p>
        <p className="cursor-pointer hover:underline">Where can I get my invitation code?</p>
        <p className="cursor-pointer hover:underline">How to request my invitation code?</p>
        <p className="cursor-pointer hover:underline">What's the Invitation Code?</p>
      </div>
    </div>
  );
};

const PhaseTwo = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [invalidEmailFormat, setInvalidEmailFormat] = useState(false);
  const [invalidDomain, setInvalidDomain] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [samePassword, setSamePassword] = useState(false);
  const [missingData, setMissingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const createAccount = async () => {
    setLoading(true);
    setInvalidEmailFormat(false); // Reset email format error state
    setInvalidDomain(false); // Reset domain error state
    setUsernameTaken(false); // Reset username error state

    if (!validateFormData()) {
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post('http://localhost:5000/user/create-user', {
        email,
        accountType: 'admin',
        username,
        password,
        code: code
      });

      if (response.data.success) {
        const savedUser = await saveUserOnCookies({ ...response.data.user });
        await dispatch(setUser(savedUser));
        navigate('/');
      } else {
        if (response.data.message === 'The email is already in use') {
          setInvalidEmailFormat(true);
        } else if (response.data.message === 'The username is already taken') {
          setUsernameTaken(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateFormData = () => {
    setMissingData(false);
    setInvalidEmailFormat(false);
    setInvalidDomain(false);
    setSamePassword(false);

    if (!email || !username || !password || !confirmPassword) {
      setMissingData(true);
      return false;
    }

    // Check if the email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvalidEmailFormat(true);
      return false;
    }

    // Check if the email is from @projecthumancity.com domain
    if (!/^[^\s@]+\.dev@projecthumancity\.com$/.test(email)) {
      setInvalidDomain(true);
      return false;
    }

    if (password.length < 8) {
      return false;
    }

    if (password !== confirmPassword) {
      setSamePassword(true);
      return false;
    }

    return true;
  };

  useEffect(() => {
    setSamePassword(false); // Reset samePassword state when password or confirmPassword changes
  }, [password, confirmPassword]);

  return (
    <div className="space-y-3 w-[400px] no-select md:p-0 p-2 ">
      <div>
        <p className="text-center font-bold text-xl">Create Admin Account</p>
      </div>
      <div className="flex flex-col ">
        <div>
          {missingData && (
            <div className="flex items-center justify-between text-red-400">
              <p>Please fill all the data</p>
              <CgDanger className="ml-1" />
            </div>
          )}
        </div>

        <label htmlFor="email" className="font-bold cursor-pointer pl-2 pt-2 flex justify-between">
          <span>Email</span>
          <span>{(invalidEmailFormat || invalidDomain) && <CgDanger className="text-red-400" />}</span>
        </label>
        <input
          id="email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.simple_text_input}`}
        />
        {invalidEmailFormat && <p className="text-red-500 text-sm">Invalid email format.</p>}
        {invalidDomain && <p className="text-red-500 text-sm">Email must be from @projecthumancity.com domain.</p>}

        <label htmlFor="username" className="font-bold cursor-pointer pl-2 pt-2">
          Academy Name
        </label>
        <input
          id="username"
          placeholder="Academy name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${styles.simple_text_input}`}
        />
        {usernameTaken && <p className="text-red-500 text-sm">Username is already taken, please try a different username</p>}

        <label htmlFor="password" className="font-bold cursor-pointer pl-2 pt-2">
          Password
        </label>
        <div className={`w-full ${styles.simple_text_input} flex justify-between items-center bg-white`}>
          <input
            id="password"
            placeholder="Password"
            value={password}
            type={passwordVisibility ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className={`focus:outline-none w-full`}
          />
          {passwordVisibility ? (
            <MdOutlineVisibility onClick={() => setPasswordVisibility(false)} className="mx-1 text-black cursor-pointer" />
          ) : (
            <MdOutlineVisibilityOff onClick={() => setPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
          )}
        </div>
        {password.length > 0 && password.length < 8 && <p className="text-red-500 text-sm">Password must be at least 8 characters long</p>}

        <label htmlFor="confirm-password" className="font-bold cursor-pointer flex justify-between pl-2 pt-3">
          <span>Confirm Password</span>
          <span>{samePassword && <CgDanger className="text-red-400" />}</span>
        </label>
        <div className={`w-full ${styles.simple_text_input} flex justify-between items-center bg-white`}>
          <input
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={confirmPasswordVisibility ? "text" : "password"}
            className={`focus:outline-none w-full`}
          />
          {confirmPasswordVisibility ? (
            <MdOutlineVisibility onClick={() => setConfirmPasswordVisibility(false)} className="mx-1 text-black cursor-pointer" />
          ) : (
            <MdOutlineVisibilityOff onClick={() => setConfirmPasswordVisibility(true)} className="mx-1 text-black cursor-pointer" />
          )}
        </div>
        {samePassword && <p className="text-red-500 text-sm">Passwords don't match</p>}
      </div>

      <button onClick={() => createAccount()} className="font-semibold text-white linearGradient_ver1 text-sm px-3 py-2 rounded-full w-full">
        {loading ? <SpinnerLoader /> : "Create account"}
      </button>
    </div>
  );
};


export default CreateAccAdmin;
