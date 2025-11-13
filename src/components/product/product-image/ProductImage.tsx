import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
}

export const ProductImage = ({
  alt,
  height,
  width,
  className,
  src,
  style,
}: Props) => {
  const localSrc = src;
  const safeSrc =
    typeof src === "string" && src.length > 0
      ? src.startsWith("http")
        ? src
        : `/products/${src}`
      : "/imgs/placeholder.jpg";

  return (
    <Image
      src={safeSrc}
      width={height}
      height={width}
      alt={alt}
      className={className}
      style={style}
    />
  );
};
