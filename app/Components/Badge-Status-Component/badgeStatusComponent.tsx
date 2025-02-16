import { Badge } from "../ui/badge";
import { ProductStatus } from "@/app/_data-acess/product/get-products";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
};

interface BadgeStatusProps {
  status: ProductStatus;
}
const BadgeStatus = ({ status }: BadgeStatusProps) => {
  const label = getStatusLabel(status);
  return (
    <Badge
      className="gap-1.5 bg-green-400"
      variant={label === "Em estoque" ? "default" : "outline"}
    >
      {label}
    </Badge>
  );
};

export default BadgeStatus;
