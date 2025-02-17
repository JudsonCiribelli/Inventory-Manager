import { getTotalRevenue } from "@/app/_data-acess/dasboard/get-total-revenue";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardValue,
  SummaryCartTitle,
} from "../Summary-Card-Component/summaryCard";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/app/_helpers/Currency/currency";

const TotalRevenueCart = async () => {
  const totalRevenue = await getTotalRevenue();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
      <SummaryCartTitle>Receita Total</SummaryCartTitle>
      <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalRevenueCart;
