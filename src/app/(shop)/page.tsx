import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { ProductGrid } from "./products/product-grid/ProductGrid";

export default function Home() {
  const products = initialData.products;

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
