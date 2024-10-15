import errorImg from "@assets/common/character.png";

export const Errorpage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src={errorImg} alt="error-image" />
    </div>
  );
};
