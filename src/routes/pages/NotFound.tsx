import React from "react";
import NotFoundimg from "../../assets/images/404.svg";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-17">
      <img src={NotFoundimg} alt="404" className="w-[470px] h-[370px] ml-30" />
      <div className="w-[245px] h-[122px] flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-medium exo-font mb-3">OOPS!</h1>
        <h2 className="text-2xl font-light exo-font">PAGE NOT FOUND</h2>
      </div>
      <div className="flex gap-20 mt-5">
        <div className="group">
          <Button variant="back" onClick={() => window.history.back()}>
            BACK
          </Button>
        </div>
        <Button
          className=" text-[var(--bg-color)] text-sm font-medium"
          variant="neon_filled"
          onClick={() => navigate("/contact")}
        >
          CONTACT US
        </Button>
      </div>
    </div>
  );
}
