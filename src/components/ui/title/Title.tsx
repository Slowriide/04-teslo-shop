import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({ title, className, subTitle }: Props) => {
  return (
    <div className={`mt-3  ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-4`}
      >
        {" "}
        {title}
      </h1>
      {subTitle && <h3 className="text-xl mb-5">{subTitle}</h3>}
    </div>
  );
};
