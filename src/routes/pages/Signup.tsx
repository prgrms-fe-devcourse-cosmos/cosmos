import { useState } from "react";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [usernameInput, setUsernameInput] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const navigate = useNavigate();

  const emailCheck =
    /^[a-zA-Z0-9]([-_\.]?[0-9a-zA-Z])*@[a-zA-Z0-9]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z0-9]([-_\.]?[0-9a-zA-Z]){1,}$/;
  const passwordCheck =
    /[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}$/;

  const signupHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(emailInput);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailInput,
        password: passwordInput,
        options: {
          data: {
            name: usernameInput,
            full_name: usernameInput,
            avatar_url: "",
          },
        },
      });
      if (error) {
        console.log(error);
        alert("회원가입을 정상적으로 완료하지 못했습니다.");
      } else if (data) {
        console.log(data);
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      alert("회원가입을 정상적으로 완료하지 못했습니다.");
    }
    // } finally {
    //   navigate("/");
    // }
  };

  return (
    <div className="h-[88vh] w-full flex">
      <div className="w-1/2 flex items-center justify-center"></div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-xl bg-white/10 backdrop- w-full h-full flex flex-col justify-center items-center gap-7">
          <div className="text-[32px] font-yapari">SIGN UP</div>
          <div className="flex flex-col justify-center w-[72.2%] gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Username</div>
                <input
                  type="text"
                  className="login-input"
                  placeholder="유저네임을 입력해주세요"
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    e.target.value.length > 0 && setInvalidUsername(false);
                  }}
                  onBlur={() => {
                    usernameInput.length < 1
                      ? setInvalidUsername(true)
                      : setInvalidUsername(false);
                  }}
                />
                {invalidUsername && (
                  <div className="text-sm text-red-400">
                    유저네임을 입력해 주세요.
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Email</div>
                <input
                  type="email"
                  className="login-input"
                  placeholder="이메일을 입력해주세요"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    emailCheck.test(e.target.value)
                      ? setInvalidEmail(false)
                      : setInvalidEmail(true);
                  }}
                  onBlur={() => {
                    emailCheck.test(emailInput)
                      ? setInvalidEmail(false)
                      : setInvalidEmail(true);
                  }}
                />
                {invalidEmail && (
                  <div className="text-sm text-red-400">
                    올바른 이메일 형식이 아닙니다.
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Password</div>
                <input
                  type="password"
                  className="login-input"
                  placeholder="8자 이상의 영문/숫자/특수문자로 입력해주세요"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    passwordCheck.test(e.target.value)
                      ? setInvalidPassword(false)
                      : setInvalidPassword(true);
                  }}
                  onBlur={() => {
                    passwordCheck.test(passwordInput)
                      ? setInvalidPassword(false)
                      : setInvalidPassword(true);
                  }}
                />
                {invalidPassword && (
                  <div className="text-sm text-red-400">
                    올바른 비밀번호 형식이 아닙니다.
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px]">Confirm Password</div>
                <input
                  type="password"
                  className="login-input"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    passwordInput === e.target.value
                      ? setInvalidConfirmPassword(false)
                      : setInvalidConfirmPassword(true);
                  }}
                  onBlur={() =>
                    passwordInput !== confirmPassword
                      ? setInvalidConfirmPassword(true)
                      : setInvalidConfirmPassword(false)
                  }
                />
                {invalidConfirmPassword && (
                  <div className="text-sm text-red-400">
                    입력된 값이 비밀번호와 다릅니다.
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  id="agree"
                  className="accent-[var(--primary-300)]"
                  onChange={(e) => setAgreeChecked(e.target.checked)}
                />
                <label htmlFor="agree" className="text-sm">
                  이용약관 및 개인정보처리방침에 동의합니다.
                </label>
              </div>
              <button
                className="login-btn font-yapari"
                disabled={
                  invalidUsername ||
                  usernameInput.length === 0 ||
                  invalidEmail ||
                  emailInput.length === 0 ||
                  invalidPassword ||
                  passwordInput.length === 0 ||
                  invalidConfirmPassword ||
                  confirmPassword.length === 0 ||
                  !agreeChecked
                }
                onClick={signupHandler}
              >
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
          </div>
        </div>
      </div>
    </div>
  );
}
