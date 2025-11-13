import { getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/admin/get-categories";

interface Props {
  params: Promise<{
    slug?: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug ?? "";

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("admin/products");
  }

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <div>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}
