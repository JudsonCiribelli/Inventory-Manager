import { DollarSign } from "lucide-react";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardValue,
  SummaryCartTitle,
} from "../Summary-Card-Component/summaryCard";
import { formatCurrency } from "@/app/_helpers/Currency/currency";

const TodayRevenueCard = () => {
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
      <SummaryCartTitle>Receita Hoje</SummaryCartTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TodayRevenueCard;
