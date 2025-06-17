import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0  flex justify-center items-center">
      <DotLottieReact
        src="https://lottie.host/b994bb3f-556d-41c4-bb8c-9b0d00752c21/1tS2fFMhvw.lottie"
        loop
        autoplay
        style={{ width: "180px", height: "100px" }}
      />
    </div>
  );
}
