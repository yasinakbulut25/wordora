import Image from "next/image";
import Welcome from "./Welcome";
import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";

export type ScreenType = "welcome" | "login" | "register";

export type SetScreenProp = {
  setScreen: (screen: ScreenType) => void;
};

const LoginPage = () => {
  const [screen, setScreen] = useState<ScreenType>("welcome");

  return (
    <div className="h-full flex flex-col items-center justify-center text-white py-10">
      <div className="w-[1400px] h-[1400px] absolute left-1/2 transform -translate-x-1/2 -top-[1050px] bg-indigo-600 rounded-br-full rounded-bl-full z-0"></div>
      <div className="flex min-h-[390px]">
        <Image
          src="/cloud.svg"
          alt="Cloud"
          width={220}
          height={220}
          className="absolute -right-12 top-5 z-10"
        />
        <Image
          src="/cloud.svg"
          alt="Cloud"
          width={220}
          height={220}
          className="absolute -left-8 top-16 z-10"
        />

        <Image
          src="/mascot.svg"
          alt="Mascot"
          width={220}
          height={220}
          className="absolute left-1/2 transform -translate-x-1/2 top-48 z-20"
        />
      </div>

      <div className="">
        {screen === "welcome" && <Welcome setScreen={setScreen} />}
        {screen === "login" && <LoginForm setScreen={setScreen} />}
        {screen === "register" && <RegisterForm setScreen={setScreen} />}
      </div>
    </div>
  );
};

export default LoginPage;
