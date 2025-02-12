import { getProducts } from "../_data-acess/product/get-products";
import { getSales } from "../_data-acess/sales/get-sales";
import { ComboboxOption } from "../Components/ui/combobox";
import { DataTable } from "../Components/ui/data-table";
import UpsertSaleButton from "./_Components/Create-Sale-Button/createSaleButton";
//import UpsertSaleButton from "./_Components/Create-Sale-Button/upsertSaleButton";
import { saleTableColumns } from "./_Components/Table-Columns-Sale-Component/TableColumnsSale";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
    <div className="w-full space-y-8 p-8">
      {/* ESQUERDA */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xl font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-gray">Vendas</h2>
        </div>
        <UpsertSaleButton products={products} productOptions={productOptions} />
      </div>
      <DataTable columns={saleTableColumns} data={tableData} />
    </div>
  );
};

export default SalesPage;
