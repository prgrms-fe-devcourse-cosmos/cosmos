import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/common/Footer";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function RootLayout() {
  // 로딩상태 관리
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage)
    return (
      <div className="flex flex-col min-h-screen bg-[url('/images/cosmos/galaxy_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed text-[#c9d1d9] w-full">
        <main className="flex-grow w-full flex justify-center items-center">
          <Outlet />
        </main>
      </div>
    );

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[url('/images/cosmos/galaxy_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed text-[#c9d1d9] w-full">
        <Header />

        <main className="flex-grow w-full flex justify-center items-center">
          {isLoading ? <LoadingSpinner /> : <Outlet />}
        </main>
        <Footer />
      </div>
    </>
  );
}
