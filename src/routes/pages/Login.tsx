import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabase';
import { useAuthStore } from '../../stores/authStore';

export default function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const TextLogo = '/images/cosmos/main-text-logo.svg';
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const socialLoginHandler = async (p: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: p,
    });
    if (error) {
      console.log('OAuth 로그인 오류:', error);
      switch (error.message) {
        case 'Invalid login credentials':
          alert('존재하지 않는 유저입니다.');
          break;
        default:
          alert('로그인에 실패하였습니다.');
          return;
      }
    }
  };

  const loginHanlder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });
    if (error) {
      console.log('Email 로그인 오류:', error);
      switch (error.message) {
        case 'Invalid login credentials':
          alert('이메일 또는 비밀번호를 잘못 입력하셨습니다.');
          break;
        default:
          alert('로그인에 실패하였습니다.');
          return;
      }
    } else if (data) {
      alert('로그인되었습니다.');
      const { data: loginData, error } = await supabase.auth.getSession();
      if (loginData.session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', loginData.session.user.id);
        if (profile) {
          setUser(data.session.access_token, profile[0]);
        }
      } else if (error) console.log('getSession() 오류:', error);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="hidden min-h-screen md:w-1/2 md:flex items-center justify-center ">
        <img
          src={TextLogo}
          className="cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="w-full min-h-screen md:w-1/2 md:flex items-center justify-center">
        <div className="text-xl bg-white/10 w-full min-h-screen flex flex-col justify-center items-center gap-7">
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
                disabled={emailInput.length < 1 || passwordInput.length < 1}
                onClick={loginHanlder}
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
              <button
                type="button"
                className="social-login-btn"
                onClick={() => socialLoginHandler('google')}
              >
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/2/2b/Google_icon-Sep15.svg"
                  alt="google"
                  className="size-5"
                />
                Sign in with Google
              </button>
              <button
                type="button"
                className="social-login-btn"
                onClick={() => socialLoginHandler('github')}
              >
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/0/0e/Github_Icon_White.svg"
                  alt="github"
                  className="size-5"
                />
                Sign in with Github
              </button>
            </div>
            <div className="flex w-full justify-between">
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
