"use server";
import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteProductSchema } from "./schema";
import { actionClient } from "@/app/lib/safe-action";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/", "layout");
  });
