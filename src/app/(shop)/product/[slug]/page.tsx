import {
  ProducMobileSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import ProducSlideshow from "@/components/product/slideshow/ProducSlideshow";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ({ params }: Props) {
  const { slug } = await params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }
  return (
    <div className="mt-2 mb-20 grid md:grid-cols-3 cap-3 ">
      {/*Desktop Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <ProducSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />

        {/*Mobile Slideshow */}

        <ProducMobileSlideshow
          className="block md:hidden"
          images={product.images}
          title={product.title}
        />
      </div>
      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>
        {/* Sizes */}
        <SizeSelector selectedSize={"XS"} availableSizes={product.sizes} />

        {/* Quantity */}
        <QuantitySelector quantity={2} />

        {/* Boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
