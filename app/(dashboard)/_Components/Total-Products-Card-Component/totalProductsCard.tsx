import { ShoppingBasketIcon } from "lucide-react";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardValue,
  SummaryCartTitle,
} from "../Summary-Card-Component/summaryCard";
import { getTotalProducts } from "@/app/_data-acess/dasboard/get-total-products";

const TotalProductsCard = async () => {
  const totalProducts = await getTotalProducts();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <ShoppingBasketIcon />
      </SummaryCardIcon>
      <SummaryCartTitle>Produtos</SummaryCartTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProductsCard;
