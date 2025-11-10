import { Gender } from "@/generated/prisma";
import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { create } from "zustand";
import { countries as countriesSeed } from "./seed-countries";

async function main() {
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.country.deleteMany();

  const { categories, products, users } = initialData;
  const countries = countriesSeed;
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categoriesData,
  });

  await prisma.country.createMany({
    data: countries,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string> //<string = shirt, categoryId>
  );

  //   const { images, type, ...product1 } = products[0];

  //   await prisma.product.create({
  //     data: {
  //       ...product1,
  //       categoryId: categoriesMap["shirts"],
  //     },
  //   });

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });
    //images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed ejecutado correctamente");
}

if (process.env.NODE_ENV !== "production") {
  main();
}
