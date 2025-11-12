"use server";

import { auth } from "@/auth.config";
import { Size } from "@/generated/prisma";
import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  //Verificar sesion
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesion de usuario",
    };
  }

  //Obtener info de productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  //Calcular montos
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { total, subTotal, tax } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;

      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`${item.productId} no existe - 500`);
      }

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  //Crear transaccion de base de datos

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //actualizar stock de productos

      const updatedProductsPromises = products.map((product) => {
        //acumular valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity no hacer
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      //verificar valores negativos
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene stock suficiente`);
        }
      });

      //crear orden - encabezado - detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      //crear direccion de orden

      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2 ?? "",
          postalCode: address.postalCode,
          phone: address.phone,
          city: address.city,
          orderId: order.id,
          countryId: address.country,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        address: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order.id,
      prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
