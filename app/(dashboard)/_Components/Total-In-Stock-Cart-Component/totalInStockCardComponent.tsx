import { PackageIcon } from "lucide-react";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardValue,
  SummaryCartTitle,
} from "../Summary-Card-Component/summaryCard";
import { getTotalInStock } from "@/app/_data-acess/dasboard/get-total-in-stock";

const TotalInStockCard = async () => {
  const totalStock = await getTotalInStock();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
      <SummaryCartTitle>Total em Estoque</SummaryCartTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalInStockCard;
