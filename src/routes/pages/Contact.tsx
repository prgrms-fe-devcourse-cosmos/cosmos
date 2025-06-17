import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../../components/common/Button";

export default function Contact() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-white">
      <p className="text-2xl sm:text-3xl font-[yapari] uppercase">
        Our stella crew
      </p>
      <DotLottieReact
        src="https://lottie.host/28721b8c-299c-44bb-86eb-6ff6f595d0c2/yQoOd7yeu3.lottie"
        loop
        autoplay
        style={{ width: "400px", height: "200px" }}
      />
      <a
        target="_blank"
        href="https://github.com/prgrms-fe-devcourse-cosmos/cosmos.git"
        className="group font-[yapari] text-[color:var(--primary-300)] my-7  cursor-pointer"
      >
        <Button variant="hover_fill">COSMOS REPO</Button>
      </a>
      <div className="group"></div>
      <div className="mt-4 text-sm sm:text-lg flex gap-10 font-[watermelonSalad]">
        <a target="_blank" href="https://github.com/jieun22222">
          FE 송지은
        </a>
        <a target="_blank" href="https://github.com/keemeunji">
          FE 김은지
        </a>
        <a target="_blank" href="https://github.com/TYss00">
          FE 김태연
        </a>
        <a target="_blank" href="https://github.com/won431236">
          FE 최원일
        </a>
        <a target="_blank" href="https://github.com/hxezu">
          FE 현혜주
        </a>
      </div>
    </div>
  );
}
