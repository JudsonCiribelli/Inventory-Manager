import "server-only";
import { db } from "@/app/lib/prisma";
import dayjs from "dayjs";
import { ProductStatus } from "../product/get-products";

export interface DayTodayRevenue {
  day: string;
  totalRevenue: number;
}
export interface MostSoldProductsDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatus;
  price: number;
}
interface DashboardDto {
  totalProducts: number;
  totalAt14daysRevenue: DayTodayRevenue[];
  mostSoldProducts: MostSoldProductsDto[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
  const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );
  const totalAt14daysRevenue: DayTodayRevenue[] = [];
  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      `SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalAt14daysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: dayTotalRevenue[0].totalRevenue,
    });
  }

  const totalProductsPromise = db.product.count();
  const mostSoldProductsQuery = `
  SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "ProductId"
  FROM "SaleProduct"
  JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
  GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
  ORDER BY "totalSold" DESC
  LIMIT 5
  `;
  const mostSoldProductsPromise = await db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(mostSoldProductsQuery);
  const [totalProducts, mostSoldProducts] = await Promise.all([
    totalProductsPromise,
    mostSoldProductsPromise,
  ]);

  return {
    totalProducts,
    totalAt14daysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
};
