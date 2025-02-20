import "server-only";
import { db } from "@/app/lib/prisma";
import { Product } from "@prisma/client";

export type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK";
export interface ProductDto extends Product {
  status: ProductStatus;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
