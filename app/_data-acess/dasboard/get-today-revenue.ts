import { db } from "@/app/lib/prisma";

export const getTodayRevenue = async () => {
  const todayRevenueQuery = `SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "todayRevenue"
  FROM "SaleProduct"
  JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id" 
  WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2
`;
  const todayRevenue =
    await db.$queryRawUnsafe<{ todayRevenue: number }[]>(todayRevenueQuery);
  return todayRevenue[0].todayRevenue;
};
