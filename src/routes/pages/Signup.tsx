import { useState } from 'react';
import supabase from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidCPW, setInvalidCPW] = useState(false);

  const navigate = useNavigate();

  const emailCheck =
    /^[a-zA-Z0-9]([-_\.]?[0-9a-zA-Z])*@[a-zA-Z0-9]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z0-9]([-_\.]?[0-9a-zA-Z]){1,}$/;
  const passwordCheck =
    /[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}$/;

  const signUpHandler = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          avatar_url: '',
          name: username,
          full_name: username,
          usercode: Math.random()
            .toString(16)
            .replace('0.', email.substring(0, 3)),
        },
      },
    });
    if (error) {
      console.log('회원가입 오류:', error);
      alert('회원가입에 실패하였습니다.');
    } else if (data) {
      alert('회원가입되었습니다.');
      // console.log(data.user);
      navigate('/');
    }
  };

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

  return (
    <div className='h-[88vh] w-full flex'>
      <div className='hidden md:w-1/2 md:flex items-center justify-center'></div>
      <div className='w-full md:w-1/2 md:flex justify-center'>
        <div className='text-xl bg-white/10 backdrop- w-full h-full flex flex-col justify-center items-center gap-7'>
          <div className='text-[32px] font-yapari'>SIGN UP</div>
          <div className='flex flex-col justify-center w-[72.2%] gap-8'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px]'>Username</div>
                <input
                  type='text'
                  className='login-input'
                  placeholder='유저네임을 입력해주세요'
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    e.target.value.length > 0 && setInvalidUsername(false);
                  }}
                  onBlur={() => {
                    username.length < 1
                      ? setInvalidUsername(true)
                      : setInvalidUsername(false);
                  }}
                />
                {invalidUsername && (
                  <div className='text-sm text-[var(--red)]'>
                    유저네임을 입력해 주세요.
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px]'>Email</div>
                <input
                  type='email'
                  className='login-input'
                  placeholder='이메일을 입력해주세요'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    emailCheck.test(e.target.value)
                      ? setInvalidEmail(false)
                      : setInvalidEmail(true);
                  }}
                  onBlur={() => {
                    emailCheck.test(email)
                      ? setInvalidEmail(false)
                      : setInvalidEmail(true);
                  }}
                />
                {invalidEmail && (
                  <div className='text-sm text-[var(--red)]'>
                    올바른 이메일 형식이 아닙니다.
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px]'>Password</div>
                <input
                  type='password'
                  className='login-input'
                  placeholder='8자 이상의 영문/숫자/특수문자로 입력해주세요'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    passwordCheck.test(e.target.value)
                      ? setInvalidPassword(false)
                      : setInvalidPassword(true);
                  }}
                  onBlur={() => {
                    passwordCheck.test(password)
                      ? setInvalidPassword(false)
                      : setInvalidPassword(true);
                  }}
                />
                {invalidPassword && (
                  <div className='text-sm text-[var(--red)]'>
                    올바른 비밀번호 형식이 아닙니다.
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-[16px]'>Confirm Password</div>
                <input
                  type='password'
                  className='login-input'
                  placeholder='비밀번호를 한번 더 입력해주세요'
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    password === e.target.value
                      ? setInvalidCPW(false)
                      : setInvalidCPW(true);
                  }}
                  onBlur={() =>
                    password !== confirmPassword
                      ? setInvalidCPW(true)
                      : setInvalidCPW(false)
                  }
                />
                {invalidCPW && (
                  <div className='text-sm text-[var(--red)]'>
                    입력된 값이 비밀번호와 다릅니다.
                  </div>
                )}
              </div>
              <div className='flex items-center gap-2 my-2'>
                <input
                  type='checkbox'
                  id='agree'
                  className='accent-[var(--primary-300)]'
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <label htmlFor='agree' className='text-sm'>
                  이용약관 및 개인정보처리방침에 동의합니다.
                </label>
              </div>
              <button
                className='login-btn font-yapari'
                disabled={
                  username.length < 1 ||
                  invalidUsername ||
                  !emailCheck.test(email) ||
                  invalidEmail ||
                  !passwordCheck.test(password) ||
                  invalidPassword ||
                  password !== confirmPassword ||
                  invalidCPW ||
                  !agree
                }
                onClick={signUpHandler}
              >
                SIGN UP
              </button>
              <div className='flex justify-center mt-3 gap-5'>
                <button
                  type='button'
                  className='cursor-pointer'
                  onClick={() => socialLoginHandler('google')}
                >
                  <img
                    src='https://static.wikia.nocookie.net/logopedia/images/2/2b/Google_icon-Sep15.svg'
                    alt='google'
                    className='size-5'
                  />
                </button>
                <button
                  type='button'
                  className='cursor-pointer'
                  onClick={() => socialLoginHandler('github')}
                >
                  <img
                    src='https://static.wikia.nocookie.net/logopedia/images/0/0e/Github_Icon_White.svg'
                    alt='github'
                    className='size-5'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
