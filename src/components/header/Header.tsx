import Logo from "./Logo";
import MainNav from "./MainNav";
import SideMenu from "./SideMenu/SideMenu";
import UserSection from "./UserSection";

export default function Header() {
  return (
    <>
      <nav className="hidden md:block font-[yapari] text-white sticky top-0 z-50 ">
        <div className="flex items-center justify-between h-16 w-full px-10 xl:px-20">
          <Logo />
          <MainNav />
          <UserSection />
        </div>
      </nav>

      <nav className="md:hidden font-[yapari] text-white sticky top-0 z-50 border-b border-[#30363d]">
        <div className="flex items-center justify-between h-16 w-full px-10">
          <Logo />
          <SideMenu />
        </div>
      </nav>
    </>
  );
}
