import {
  CircleDollarSign,
  DollarSign,
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
  SummaryCardValue,
  SummaryCartTitle,
} from "./_Components/Summary-Card-Component/summaryCard";
import { getDashboard } from "../_data-acess/dasboard/get-dashboard";
import { formatCurrency } from "../_helpers/Currency/currency";

const Home = async () => {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } =
    await getDashboard();
  return (
    <div className="w-full space-y-8 p-8">
      <HeaderComponent>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubTitle>Visão geral dos dados</HeaderSubTitle>
        </HeaderLeft>
      </HeaderComponent>
      <div className="grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCartTitle>Receita Total</SummaryCartTitle>
          <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCartTitle>Receita Hoje</SummaryCartTitle>
          <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
        </SummaryCard>
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
    </div>
  );
};
export default Home;
