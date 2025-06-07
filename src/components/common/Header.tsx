import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      // 라우터와 같거나 라우터의 하위문서로가도 작동한다.
      location.pathname === path || location.pathname.startsWith(path + '/')
    );
  };

  return (
    <nav className="font-[yapari] text-white sticky top-0 z-50 border-b border-[#30363d]">
      <div className="flex items-center justify-between h-16 w-full px-20">
        <div
          className="flex-shrink-0 flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="ml-2 text-xl">COSMOS</span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Daily Space', path: '/daily' },
              { name: 'Lounge', path: '/lounge' },
              { name: 'Cosmo Lab', path: '/lab' },
            ].map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
                    ${
                      active
                        ? 'text-[color:var(--primary-300)]'
                        : 'text-[color:var(--white)] hover:text-[color:var(--primary-300)]'
                    }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <button
          className="py-2 px-4 border-1 hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-300)] text-xs rounded-lg cursor-pointer"
          onClick={() => navigate('/login')}
        >
          JOIN
        </button>
      </div>
    </nav>
  );
}
