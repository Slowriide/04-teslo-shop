"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { OrderAddress, OrderItem } from "../../generated/prisma/index";

export const getOrderById = async (id: string) => {
  const session = await auth();
  const userId = session?.user.id;

  //Verificar sesion
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesion de usuario",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw `${id} no existe`;
    }

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw `${id} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Orden inexistente",
    };
  }
};
