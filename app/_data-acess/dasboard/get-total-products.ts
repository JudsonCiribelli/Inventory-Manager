import "server-only";
import { db } from "@/app/lib/prisma";

export const getTotalProducts = async (): Promise<number> => {
  return db.product.count();
};
