"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updatedTransaction = prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId: transactionId,
      },
    });

    if (!updatedTransaction) {
      throw `No se pudo actualizar la orden con id ${orderId}`;
    }

    return {
      ok: true,
      updatedTransaction,
    };
  } catch (error) {}
  return {
    ok: false,
    message: "No se pudo actualizar la transaccion",
  };
};
