import { Link } from "react-router-dom";

export default function Login() {
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
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Password</div>
                <input
                  type="password"
                  className="login-input"
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
              <button className="login-btn font-yapari text-[12px] mt-3">
                LOGIN
              </button>
            </div>
            <div className="flex justify-center items-center gap-3 w-full text-center font-yapari text-[var(--primary-300)]">
              <hr className="w-full" />
              <span className="text-sm">OR</span>
              <hr className="w-full" />
            </div>
            <div className="w-full flex flex-col gap-3">
              <button className="login-btn text-white">
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/2/2b/Google_icon-Sep15.svg"
                  alt="google"
                  className="size-5"
                />
                Sign in with Google
              </button>
              <button className="login-btn text-white">
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/8/82/Facebook_icon_2023.svg"
                  alt="facebook"
                  className="size-5"
                />
                Sign in with Facebook
              </button>
              <button className="login-btn text-white">
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/0/0e/Github_Icon_White.svg"
                  alt="github"
                  className="size-5"
                />
                Sign in with Github
              </button>
            </div>
            <div className="flex w-full justify-between">
              <button className="text-sm cursor-pointer">
                Forgot Your Password?
              </button>
              <Link to="/signup" className="text-sm cursor-pointer">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
