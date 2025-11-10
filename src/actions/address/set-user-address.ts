"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddres(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo grabar la direccion",
    };
  }
};

const createOrReplaceAddres = async (address: Address, userId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error(`No existe el usuario con id: ${userId}`);
    }

    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    console.log(`userid:${userId}`);

    const addressToSave = {
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      userId: userId,
      city: address.city,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updatesAddress = await prisma.userAddress.update({
      where: {
        userId: userId,
      },
      data: addressToSave,
    });
    return updatesAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la direccion");
  }
};
