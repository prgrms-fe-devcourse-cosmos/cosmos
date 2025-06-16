import { useNavigate, useNavigation } from 'react-router-dom';

export default function MainNav() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const currentPath = navigation.location?.pathname ?? location.pathname;

  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  return (
    <div className="flex-1 flex justify-center">
      <div className="md:flex space-x-8">
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
              className={`px-3 py-2 rounded-md text-xs xl:text-sm cursor-pointer transition-colors
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
  );
}
