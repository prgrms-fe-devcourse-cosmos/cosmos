export default function Signup() {
  return (
    <div className="h-[88vh] w-full flex">
      <div className="w-1/2 flex items-center justify-center"></div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-xl bg-white/10 backdrop- w-full h-full flex flex-col justify-center items-center gap-8">
          <div className="text-[32px] font-yapari">SIGN UP</div>
          <form className="flex flex-col justify-center w-[72.2%] gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Username</div>
                <input type="text" className="login-input" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Email</div>
                <input type="email" className="login-input" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Password</div>
                <input type="password" className="login-input" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Confirm Password</div>
                <input type="password" className="login-input" />
              </div>
              <div className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  id="agree"
                  className="accent-[var(--primary-300)]"
                />
                <label htmlFor="agree" className="text-sm">
                  이용약관 및 개인정보처리방침에 동의합니다.
                </label>
              </div>
              <button className="login-btn font-yapari text-[12px] font-medium text-[var(--bg-color)] bg-[var(--primary-300)]">
                SIGN UP
              </button>
              <div className="flex justify-center mt-3 gap-5">
                <a href="https://www.google.com">
                  <img
                    src="https://static.wikia.nocookie.net/logopedia/images/2/2b/Google_icon-Sep15.svg"
                    alt="google"
                    className="size-5"
                  />
                </a>
                <a href="https://www.facebook.com">
                  <img
                    src="https://static.wikia.nocookie.net/logopedia/images/8/82/Facebook_icon_2023.svg"
                    alt="facebook"
                    className="size-5"
                  />
                </a>
                <a href="https://www.github.com">
                  <img
                    src="https://static.wikia.nocookie.net/logopedia/images/0/0e/Github_Icon_White.svg"
                    alt="github"
                    className="size-5"
                  />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
