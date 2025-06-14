import supabase from '../../../utils/supabase';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function AuthButtons({
  isLoggedIn,
  toggleMenu,
}: {
  isLoggedIn: boolean;
  toggleMenu: () => void;
}) {
  const { userData, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const logOutHandler = () => {
    supabase.auth.signOut();
    clearUser();
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <div className='text-xs w-full'>
      {isLoggedIn ? (
        <div className='flex justify-center gap-10'>
          <button
            className='cursor-pointer hover:text-[color:var(--primary-300)]'
            onClick={() => {
              navigate(`/user/${userData?.usercode}`);
              toggleMenu();
            }}
          >
            MY PAGE
          </button>
          <button
            className='cursor-pointer hover:text-[color:var(--primary-300)]'
            onClick={logOutHandler}
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <div className='w-full flex justify-center'>
          <button
            className='cursor-pointer hover:text-[color:var(--primary-300)]'
            onClick={() => {
              navigate('/login');
              toggleMenu();
            }}
          >
            JOIN
          </button>
        </div>
      )}
    </div>
  );
}
