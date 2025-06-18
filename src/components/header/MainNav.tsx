import { matchRoutes, useNavigate, useNavigation } from 'react-router-dom';
import { router } from '../../routes';

export default function MainNav() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const currentPath = navigation.location?.pathname ?? location.pathname;

  const navItems = [
    { name: 'Daily Space', path: '/daily' },
    { name: 'Lounge', path: '/lounge' },
    { name: 'Cosmo Lab', path: '/lab' },
  ];

  const isValidPath = (path: string) => {
    const matched = matchRoutes(router.routes, currentPath);
    if (!matched) return false;

    return matched.some((match) => match.pathnameBase.startsWith(path));
  };

  return (
    <div className="flex-1 flex justify-center">
      <div className="md:flex space-x-8">
        {navItems.map((item) => {
          const active = isValidPath(item.path);
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
