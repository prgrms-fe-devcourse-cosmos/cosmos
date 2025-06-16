import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/default-logo.svg';
import greenLogo from '../../assets/images/green-logo.svg';

export default function Logo() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div
      className="flex-shrink-0 flex items-center cursor-pointer"
      onClick={() => navigate('/')}
    >
      {isHome ? (
        <img src={greenLogo} alt="cosmos 아이콘" />
      ) : (
        <img src={logo} alt="cosmos 아이콘" />
      )}

      <span className="ml-2 text-l mt-1">COSMOS</span>
    </div>
  );
}
