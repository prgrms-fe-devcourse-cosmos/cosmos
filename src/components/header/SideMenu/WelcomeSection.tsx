import React from "react";
import logo from "/images/main-logo.svg";

export default function WelcomeSection() {
  return (
    <div className="text-2xl space-y-2">
      <img src={logo} className="size-12" />
      <div className="space-y-1">
        <p className="text-[color:var(--primary-300)]">WELCOME</p> <p>COSMOS</p>
      </div>
    </div>
  );
}
