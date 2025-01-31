"use server";
import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";

export const UpsertProduct = async (data: upsertProductSchema) => {
  upsertProductSchema.parse(data);
  await db.product.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });
  revalidatePath("/products");
};
