import { MostSoldProductsDto } from "@/app/_data-acess/dasboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/Currency/currency";
import BadgeStatus from "@/app/Components/Badge-Status-Component/badgeStatusComponent";

interface MostSoldProductsProps {
  product: MostSoldProductsDto;
}
const MostSoldProductsItem = ({ product }: MostSoldProductsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[6px]">
        <BadgeStatus status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(Number(product.price))}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold">{product.totalSold} vendidos</p>
      </div>
    </div>
  );
};

export default MostSoldProductsItem;
