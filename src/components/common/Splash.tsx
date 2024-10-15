import splashImg from "@assets/common/splash.png";
import logo from "@assets/common/logo.png";

export const Splash = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      <img
        src={splashImg}
        alt="splash-image"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={logo}
        alt="logo-image"
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
