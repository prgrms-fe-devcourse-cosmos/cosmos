import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/common/Footer";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function RootLayout() {
  // 로딩상태 관리
  const navigation = useNavigation();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage)
    return (
      <div
        className="flex flex-col min-h-screen  text-[#c9d1d9] w-full"
        style={{
          backgroundImage: "url('/images/cosmos/galaxy_bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <main className="flex-grow w-full flex justify-center items-center">
          <Outlet />
        </main>
      </div>
    );
  const isLoading =
    navigation.state === "loading" &&
    navigation.location?.pathname === "/daily";

  return (
    <>
      <div
        className="flex flex-col min-h-screen text-[#c9d1d9] w-full"
        style={{
          backgroundImage: "url('/images/cosmos/galaxy_bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Header />

        <main className="flex-grow w-full flex justify-center items-center">
          {isLoading ? <LoadingSpinner /> : <Outlet />}
        </main>
        <Footer />
      </div>
    </>
  );
}
