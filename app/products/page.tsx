import { DataTable } from "../Components/ui/data-table";
import { getProducts } from "../_data-acess/product/get-products";
//Components
import { productsTableColumns } from "./_Components/TableColumns-Component/tableColumnsComponent";
import AddProductsButton from "./_Components/Add-Products-Button-Component/createProductsButtonComponent";

export const dynamic = "force-dynamic";
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
        <AddProductsButton />
      </div>
      <DataTable columns={productsTableColumns} data={products} />
    </div>
  );
};

export default ProductsPage;
