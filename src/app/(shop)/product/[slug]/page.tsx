export const revalidate = 604800; //7 dias
export const dynamic = "force-static";

import { getProductBySlug } from "@/actions";
import {
  ProducMobileSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import ProducSlideshow from "@/components/product/slideshow/ProducSlideshow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>
        <AddToCart product={product} />
        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
