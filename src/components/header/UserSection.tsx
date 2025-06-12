import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '../../assets/images/profile.svg';
import userIcon from '../../assets/images/user.svg';
import logoutIcon from '../../assets/images/log-out.svg';
import light from '../../assets/images/lightMode.svg';
import dark from '../../assets/images/darkMode.svg';
import { useAuthStore } from '../../stores/authStore';
import supabase from '../../utils/supabase';

export default function UserSection() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    // 바깥 클릭을 감지하여 메뉴 상태 업데이트
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    // 바깥 클릭 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  async function logOutHandler() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('오류가 발생했습니다.');
      console.log(error);
    } else {
      setMenuOpen(false);
      clearUser();
      sessionStorage.removeItem('auth-store');
      alert('로그아웃되었습니다.');
      navigate('/');
    }
  }

  return (
    <>
      {user && localStorage.getItem('sb-qwntelixvmmeluarhlrr-auth-token') ? (
        <div ref={menuRef}>
          <button
            type='button'
            className='cursor-pointer'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={user.avatar_url || profileImage}
              alt='profileImage'
              className='rounded-full size-8'
            />
          </button>
          {menuOpen && (
            <div className='flex flex-col gap-4 fixed z-1 right-10 xl:right-20 top-14 rounded-lg px-6 py-4 bg-[var(--bg-color)] border-[var(--gray-200)] border'>
              <div className='flex flex-col gap-2.5 items-center'>
                <Link
                  className='flex gap-2 items-center cursor-pointer'
                  to={`/user/${user.usercode}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <img src={userIcon} alt='' />
                  <span className='font-medium text-sm'>마이페이지</span>
                </Link>
                <button
                  type='button'
                  className='flex gap-2 items-center cursor-pointer'
                  onClick={logOutHandler}
                >
                  <img src={logoutIcon} alt='' />
                  <span className='font-medium text-sm mt-1 text-[var(--red)]'>
                    로그아웃
                  </span>
                </button>
              </div>
              <div className='flex gap-3 justify-center'>
                <button className='cursor-pointer'>
                  <img src={light} alt='' className='size-4' />
                </button>
                <button className='cursor-pointer'>
                  <img src={dark} alt='' className='size-4' />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className='py-2 px-4 border-1 hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-300)] text-xs rounded-lg cursor-pointer'
          onClick={() => navigate('/login')}
        >
          JOIN
        </button>
      )}
    </>
  );
}
