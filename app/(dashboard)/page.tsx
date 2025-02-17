import {
  CircleDollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import HeaderComponent, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "../Components/Header-Component/HeaderComponent";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardSkeleton,
  SummaryCardValue,
  SummaryCartTitle,
} from "./_Components/Summary-Card-Component/summaryCard";
import { getDashboard } from "../_data-acess/dasboard/get-dashboard";

import RevenueChart from "./_Components/Revenue-Charts-Component/revenueChart";
import MostSoldProductsItem from "./_Components/Most-Sold-Products-Item-Component/mostSoldProductsItem";
import TotalRevenueCart from "./_Components/Total-Revenue-Cart-Component/totalRevenueCard";
import { Suspense } from "react";
import TodayRevenueCard from "./_Components/Today-Revenue-Card-Component/todayRevenueCard";

const Home = async () => {
  const {
    totalSales,
    totalStock,
    totalProducts,
    totalAt14daysRevenue,
    mostSoldProducts,
  } = await getDashboard();
  return (
    <div className="flex w-full flex-col space-y-8 p-8">
      <HeaderComponent>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubTitle>Visão geral dos dados</HeaderSubTitle>
        </HeaderLeft>
      </HeaderComponent>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCart />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCartTitle>Vendas Totais</SummaryCartTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCartTitle>Total em Estoque</SummaryCartTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCartTitle>Produtos</SummaryCartTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>
      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Receita </p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <RevenueChart data={totalAt14daysRevenue} />
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
          <p className="p-6 text-lg font-semibold text-slate-900">
            Produtos mais vendidos
          </p>

          <div className="space-y-7 overflow-y-auto px-6 pb-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProductsItem key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
