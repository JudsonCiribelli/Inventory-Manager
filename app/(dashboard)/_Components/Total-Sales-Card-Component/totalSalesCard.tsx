import { CircleDollarSign } from "lucide-react";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardValue,
  SummaryCartTitle,
} from "../Summary-Card-Component/summaryCard";
import { getTotalSales } from "@/app/_data-acess/dasboard/get-total-sales";

const TotalSalesCard = async () => {
  const totalSales = await getTotalSales();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <CircleDollarSign />
      </SummaryCardIcon>
      <SummaryCartTitle>Vendas Totais</SummaryCartTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalSalesCard;
