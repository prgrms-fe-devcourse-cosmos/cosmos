import logo from "/images/cosmos/main-logo.svg";

export default function WelcomeSection() {
  return (
    <div className="text-2xl space-y-2">
      <img src={logo} className="size-12" />
      <div className="space-y-1">
        <p>WELCOME</p> <p>COSMOS</p>
      </div>
    </div>
  );
}
