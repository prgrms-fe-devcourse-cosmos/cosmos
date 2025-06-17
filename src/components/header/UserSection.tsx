import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../../stores/authStore';
import supabase from '../../utils/supabase';
import Dropdown, { DropdownItem } from '../common/Dropdown';
import { LogOut, User } from 'lucide-react';

export default function UserSection() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, userData, setUser, clearUser } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const profileImage = '/images/cosmos/alien.svg';

  function handleClickOutside(event: MouseEvent) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as HTMLElement)
    ) {
      setMenuOpen(false);
    }
  }

  async function loginCheck() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id);
      if (profile) {
        setUser(data.session.access_token, profile[0]);
      }
    } else if (error) console.log('getSession() 오류:', error);
    else clearUser();
  }

  useEffect(() => {
    loginCheck();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        if (
          event === 'SIGNED_IN' &&
          session?.user.email &&
          !session?.user.user_metadata.usercode
        ) {
          const new_usercode = Math.random()
            .toString(16)
            .replace('0.', session?.user.email.substring(0, 3));
          const { error } = await supabase.auth.updateUser({
            data: { usercode: new_usercode },
          });
          if (error) console.log('Auth Usercode 업데이트 실패:', error);
          else {
            const { error } = await supabase
              .from('profiles')
              .update({ usercode: new_usercode })
              .eq('id', session.user.id);
            if (error) console.log('Profile Usercode 업데이트 실패:', error);
            else loginCheck();
          }
        }
      }, 0);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuRef]);

  const logOutHandler = () => {
    setMenuOpen(false);
    supabase.auth.signOut();
    clearUser();
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  const items: DropdownItem[] = [
    {
      icon: <User size={16} />,
      label: '마이페이지',
      onClick: () => {
        navigate(`/user/${userData?.usercode}`);
        setMenuOpen(false);
      },
    },
    {
      icon: <LogOut size={16} />,
      label: '로그아웃',
      onClick: logOutHandler,
      danger: true,
    },
    {
      customElement: (
        <div className="w-full flex justify-center">
          <ThemeToggle />
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoggedIn && (
        <>
          <div ref={menuRef} className="h-full flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src={userData?.avatar_url || profileImage}
                alt=""
                className="cursor-pointer size-6 rounded-full aspect-square object-cover object-center"
              />
            </button>

            {menuOpen && (
              <div className="fixed z-10 right-10 xl:right-20 top-14">
                <Dropdown items={items} size="mypage" />
              </div>
            )}
          </div>
        </>
      )}
      {!isLoggedIn && (
        <button
          className="py-1 px-3 border-1 hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-300)] text-xs rounded-full cursor-pointer"
          onClick={() => navigate('/login')}
        >
          JOIN
        </button>
      )}
    </>
  );
}
