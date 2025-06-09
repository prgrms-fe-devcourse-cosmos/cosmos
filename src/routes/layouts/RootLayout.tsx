import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/common/Footer";

export default function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[url('/images/galaxy_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed text-[#c9d1d9] w-full">
        <Header />

        <main className="flex-grow w-full flex justify-center items-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
