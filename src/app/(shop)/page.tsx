export const revalidate = 60;

import { Pagination, Title } from "@/components";
import { ProductGrid } from "./products/product-grid/ProductGrid";
import { getPaginatedPorductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const pageString = (await searchParams).page;

  const page = pageString ? parseInt(pageString) : 1;

  const { products, totalPages, currentPage } =
    await getPaginatedPorductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
