import { useRef, useState } from "react";
import { InputBox } from "../../config/config";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import signUpUser from "../../utils/signUpUser";
import signInUser from "../../utils/signInUser";
import { useDispatch } from "react-redux";

interface authFormPropsType {
  isSignUpPage: boolean;
  switchTab: () => void;
}

const AuthForm = ({ isSignUpPage, switchTab }: authFormPropsType) => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [inputErrorMsg, setInputErrorMsg] = useState<string>("");
  const dispatch = useDispatch();

  function switchIsHidden() {
    setIsHidden((curr) => !curr);
  }

  return (
   <div className="bg-white w-full max-w-[600px] px-6 sm:w-4/5 md:w-1/2 lg:w-1/3 py-10 rounded-2xl shadow-xl flex flex-col justify-evenly space-y-6">
  <div className="pb-2">
    {isSignUpPage ? (
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Sign up</h1>
        <p className="text-sm pt-2 text-gray-600">
          Create an account or{" "}
          <span
            className="text-blue-600 underline cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
            onClick={switchTab}
          >
            sign in
          </span>
        </p>
      </div>
    ) : (
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Sign in</h1>
        <p className="text-sm pt-2 text-gray-600">
          Already an existing user or{" "}
          <span
            className="text-blue-600 underline cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
            onClick={switchTab}
          >
            sign up
          </span>
        </p>
      </div>
    )}
  </div>

  <div className="w-full flex flex-col gap-4">
    <InputBox
      placeholder={`${isSignUpPage ? "Username" : "Username or Email"}`}
      reference={usernameRef}
    />

    {inputErrorMsg.includes("username") && (
      <span className="text-xs text-red-500">{inputErrorMsg}</span>
    )}

    {isSignUpPage && (
      <InputBox placeholder={"Email"} reference={emailRef} />
    )}

    {inputErrorMsg.includes("email") && (
      <span className="text-xs text-red-500">{inputErrorMsg}</span>
    )}

    <InputBox
      placeholder={"Password"}
      reference={passwordRef}
      isPassInput={true}
      isHidden={isHidden}
      switchIsHidden={switchIsHidden}
    />

    {inputErrorMsg.includes("password") && (
      <span className="text-xs text-red-500">{inputErrorMsg}</span>
    )}

    <div className="pt-2">
      <Button
        name={isSignUpPage ? "Sign Up" : "Sign In"}
        onClickHandler={
          isSignUpPage
            ? () =>
                signUpUser(
                  usernameRef,
                  emailRef,
                  passwordRef,
                  setInputErrorMsg,
                  switchTab
                )
            : () =>
                signInUser(
                  usernameRef,
                  passwordRef,
                  setInputErrorMsg,
                  navigate,
                  dispatch
                )
        }
      />
    </div>
  </div>
</div>

  );
};

export default AuthForm;
