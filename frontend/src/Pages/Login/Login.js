import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Images/BLN_Logo.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import "./login.css";
import { useLazyQuery } from "@apollo/client";
import { useAuth } from "../../context/auth-context";
import { LOGIN_QUERY } from "../../helpers/api/queries";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  /* 
  - useLazyQuery hook from Apollo Client to execute a GraphQL query called `LOGIN_QUERY`.
  - loginQuery is used to trigger the useLazyQuery
  - loading/error/data are the states of the query
  */
  const [loginQuery, { loading, error, data }] = useLazyQuery(LOGIN_QUERY);

  useEffect(() => {
    if (data && data.login) {
      const { token } = data.login;
      login(token);
      navigate("/courses");
    }
  }, [data]);

  useEffect(() => {
	console.log(loading);
	
  },[data])


  const handleLogin = () => {
    loginQuery({ variables: { email, password } });
  };

  return (
    //Styled  using Bootstrap
    // <div className="container h-100 ">
    // 	<div className="row justify-content-center h-100 align-items-center">
    // 		<div className="col-sm-8 ">
    // 			<div className="border border-2 rounded my-5">
    // 				<div className="row justify-content-center ">
    // 					<div className="col-10 text-center ">
    // 						<img
    // 							className="mt-5 me-5 ms-3"
    // 							src={Logo}
    // 							alt="Logo"
    // 							width={"70px"}
    // 						></img>
    // 						<p className="fs-30 border-bottom text-center pe-4 py-3">
    // 							LOGIN
    // 						</p>

    // 						<div className="mt-6">
    // 							<input
    // 								className="form-control "
    // 								placeholder="Email"
    // 								value={email}
    // 								onChange={(e) =>
    // 									setEmail(e.target.value)
    // 								}
    // 							/>
    // 						</div>
    // 						<div className="mt-4">
    // 							<input
    // 								className="form-control "
    // 								placeholder="Password"
    // 								type="password"
    // 								value={password}
    // 								onChange={(e) =>
    // 									setPassword(e.target.value)
    // 								}
    // 							/>
    // 						</div>
    // 						<div className="mt-4 d-flex">
    // 							<button
    // 								className="btn btn-gray-shadow w-100 fs-24 p-2"
    // 								onClick={handleLogin}
    // 							>
    // 								Login
    // 							</button>
    // 						</div>
    // 						<div className="mt-4 d-flex justify-content-center">
    // 							<hr />
    // 							<p className="fs-30">OR</p>
    // 							<hr />
    // 						</div>
    // 						<div className="mt-3 socialSignUp d-flex mx-auto">
    // 							<div className="d-flex mx-auto my-auto">
    // 								<GoogleIcon fontSize="large" />
    // 								<p className="my-auto c-gray fs-18 fw-500 ms-3">
    // 									Sign up with Google
    // 								</p>
    // 							</div>
    // 						</div>
    // 						<div className="mt-3 socialSignUp d-flex mx-auto">
    // 							<div className="d-flex mx-auto my-auto">
    // 								<FacebookRoundedIcon fontSize="large" />
    // 								<p className="my-auto c-gray fs-18 fw-500 ms-3">
    // 									Sign up with Facebook
    // 								</p>
    // 							</div>
    // 						</div>
    // 						<p className="fs-14 text-center pe-4 c-gray mt-4 my-5">
    // 							Need an account?{" "}
    // 							<Link to={"/signup"} className="w-100">
    // 								<span>Create your account</span>
    // 							</Link>
    // 						</p>
    // 					</div>
    // 				</div>
    // 			</div>
    // 		</div>
    // 	</div>
    // </div>

    //Styled using Tailwind
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[520px] h-full md:h-[610px] md:border-[.05rem] border-zinc-300 rounded-md md:shadow-md ">
        <div className="flex flex-col items-center justify-center">
          {/* LOGO - TITLE AND LOGIN / SIGN-UP BUTTON */}
          <div className="w-[200px] flex flex-col items-center mt-10">
            <img src={Logo} className="h-[65px]" alt="logo_img" />
            <div className=" flex items-center justify-center mt-[1.7rem] border-b-[.08rem] border-[#00000070] h-[40px] text-center tracking-wider text-lg md:text-2xl">
              <p className="w-[125px]  h-full font-semibold  border-r-[.08rem] border-[#00000070] cursor-pointer">
                Login
              </p>
              <Link
                to={"/signup"}
                className="w-[125px]  h-full cursor-pointer hover:text-zinc-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
          {/* INPUTS - LOGIN BUTTON*/}
          <div className="w-[250px] flex flex-col justify-center items-center mt-12 ">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="hover:border-zinc-300 focus:border-zinc-400 w-full border-b-[.08rem] py-1 focus:outline-none"
              type="text"
              placeholder="Email or Username"
            />
            <div className="relative w-full">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="hover:border-zinc-300 focus:border-zinc-400 w-full border-b-[.08rem] mt-3 py-1 focus:outline-none"
                type={visiblePassword? 'text': 'password'}
                placeholder="Password"
              />
              <div
                  onClick={() => setVisiblePassword(!visiblePassword)}
                className="absolute cursor-pointer right-3 top-[30%] text-zinc-500"
              >
                {visiblePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="hover:bg-zinc-300 w-full mt-3 bg-zinc-200 text-zinc-700 font-semibold rounded-sm py-2"
            >
              Login
            </button>
          </div>
          {/* OR */}
          <div className="flex items-center justify-center mt-4 ">
            <div className="h-[1px] w-[120px] bg-[#00000070]" />
            <p className="w-full text-center text-lg font-bold text-[#00000070]">
              OR
            </p>
            <div className="h-[1px] w-[120px] bg-[#00000070]" />
          </div>
          {/* SIGN UP - GOOGLE / FACEBOOK / create an account option */}
          <div className="w-[250px] flex flex-col items-center ">
            <button className="hover:text-zinc-700 hover:border-zinc-700 w-full mt-3 text-zinc-500 rounded-sm py-2 border-[.08rem] border-[#00000070] text-sm flex items-center justify-center">
              <GoogleIcon fontSize="medium" />
              <p className="ml-2">Sign up with google</p>
            </button>
            <button className="hover:text-zinc-700 hover:border-zinc-700 w-full mt-3 text-zinc-500 rounded-sm py-2 border-[.08rem] border-[#00000070] text-sm flex items-center justify-center">
              <FacebookRoundedIcon fontSize="medium" />
              <p className="ml-2">Sign up with Facebook</p>
            </button>
            <Link
              to={"/signup"}
              className="font-medium text-xs mt-2 text-center text-zinc-500 hover:text-zinc-600"
            >
              Need an account?{" "}
              <span className="text-zinc-900 cursor-pointer">
                Create an acount
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
