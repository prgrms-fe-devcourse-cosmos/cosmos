import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#0D1117] text-[#c9d1d9]">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
