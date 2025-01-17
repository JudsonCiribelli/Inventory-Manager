import { PlusIcon } from "lucide-react";
import { Button } from "../Components/ui/button";
import { DataTable } from "../Components/ui/data-table";
import { productsTableColumns } from "./_Components/TableColumns-Component/tableColumnsComponent";
import { getProducts } from "../_data-acess/product/get-products";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="w-full space-y-8 p-8">
      {/* ESQUERDA */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xl font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h2 className="text-gray">Produtos</h2>
        </div>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </div>
      <DataTable
        columns={productsTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
