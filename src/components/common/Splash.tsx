import splashImg from "@assets/common/splash.png";

export const Splash = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src={splashImg} alt="splash-image" />
    </div>
  );
};
