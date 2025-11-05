export const revalidate = 60;

import { Pagination, Title } from "@/components";
import { Gender } from "@/generated/prisma";
import { ProductGrid } from "../../products/product-grid/ProductGrid";
import { getPaginatedPorductsByGender } from "@/actions/products/get-product-by-gender";

interface Props {
  params: Promise<{
    gender?: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

const labelByGender = (gender: Gender): string => {
  switch (gender) {
    case "kid":
      return "Ropa para niño";
    case "men":
      return "Ropa para hombre";
    case "women":
      return "Ropa para mujer";

    default:
      return "Ropa unisex";
  }
};

export default async function GenderPage({ params, searchParams }: Props) {
  const { page: pageString } = await searchParams;
  const page = pageString ? parseInt(pageString) : 1;

  const { gender: genderString } = await params;
  const gender = genderString as Gender;

  const { products, totalPages, currentPage } =
    await getPaginatedPorductsByGender({ page, gender });

  return (
    <>
      <Title title="Tienda" subTitle={labelByGender(gender)} className="mb-2" />
      <ProductGrid products={products} />
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
