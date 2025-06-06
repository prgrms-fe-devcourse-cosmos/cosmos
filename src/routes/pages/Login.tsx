import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const signInWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        console.log(error);
        alert("로그인이 정상적으로 완료되지 않았습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("로그인이 정상적으로 완료되지 않았습니다.");
    }
  };
  const signInWithFacebook = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });
      if (error) {
        console.log(error);
        alert("로그인이 정상적으로 완료되지 않았습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("로그인이 정상적으로 완료되지 않았습니다.");
    }
  };
  const signInWithGithub = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) {
        console.log(error);
        alert("로그인이 정상적으로 완료되지 않았습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("로그인이 정상적으로 완료되지 않았습니다.");
    }
  };
  const loginHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });
      console.log([emailInput, passwordInput]);
      if (error) {
        console.log(error);
        alert("로그인이 정상적으로 완료되지 않았습니다.");
      } else if (data) {
        alert("로그인되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("로그인이 정상적으로 완료되지 않았습니다.");
    }
  };

  return (
    <div className="h-[88vh] w-full flex">
      <div className="w-1/2 flex items-center justify-center"></div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-xl bg-white/10 backdrop- w-full h-full flex flex-col justify-center items-center gap-7">
          <div className="text-[32px] font-yapari">WELCOME</div>
          <form className="flex flex-col justify-center w-[72.2%] gap-7">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Email</div>
                <input
                  type="email"
                  className="login-input"
                  placeholder="이메일을 입력해주세요"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Password</div>
                <input
                  type="password"
                  className="login-input"
                  placeholder="비밀번호를 입력해주세요"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>
              <button
                className="login-btn font-yapari mt-4"
                disabled={emailInput.length === 0 || passwordInput.length === 0}
                onClick={loginHandler}
              >
                LOGIN
              </button>
            </div>
            <div className="flex justify-center items-center gap-3 w-full text-center font-yapari text-[var(--primary-300)]">
              <hr className="w-full" />
              <span className="text-sm">OR</span>
              <hr className="w-full" />
            </div>
            <div className="w-full flex flex-col gap-2.5">
              <button className="social-login-btn" onClick={signInWithGoogle}>
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/2/2b/Google_icon-Sep15.svg"
                  alt="google"
                  className="size-5"
                />
                Sign in with Google
              </button>
              <button className="social-login-btn" onClick={signInWithFacebook}>
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/8/82/Facebook_icon_2023.svg"
                  alt="facebook"
                  className="size-5"
                />
                Sign in with Facebook
              </button>
              <button className="social-login-btn" onClick={signInWithGithub}>
                <img
                  // src="https://static.wikia.nocookie.net/logopedia/images/8/8f/25231.svg"
                  src="https://static.wikia.nocookie.net/logopedia/images/0/0e/Github_Icon_White.svg"
                  alt="github"
                  className="size-5"
                />
                Sign in with Github
              </button>
            </div>
            <div className="flex w-full justify-between">
              <button className="text-sm cursor-pointer hover:text-[var(--primary-300)]">
                Forgot Your Password?
              </button>
              <Link
                to="/signup"
                className="text-sm cursor-pointer hover:text-[var(--primary-300)]"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
