"use server";
import prisma from "@/lib/prisma";
export const deleteUserAddres = async (userId: string) => {
  try {
    const deleted = await prisma.userAddress.delete({
      where: { userId },
    });

    return {
      ok: true,
      message: "Direccion Borrada",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo borrar la dirección",
    };
  }
};
