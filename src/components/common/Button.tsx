import { VARIANT } from "../constants";

type ButtonProps = {
  variant: VARIANT.PRIMARY | VARIANT.SECONDARY;
  children: React.ReactNode;
  onClick: () => void;
};

const PRIMARY_STYLE = "bg-[#617ACA] hover:bg-[#435db5]";
const SECONDARY_STYLE = "border-[1px] border-[#617ACA] hover:bg-[#6179ca31]";

export const Button = ({ variant, children, onClick }: ButtonProps) => {
  return (
    <button
      className={`font-semibold cursor-pointer rounded-md w-full h-[48px] ${
        variant === VARIANT.PRIMARY ? PRIMARY_STYLE : SECONDARY_STYLE
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
