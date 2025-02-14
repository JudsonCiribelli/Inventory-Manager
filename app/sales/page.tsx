import { getProducts } from "../_data-acess/product/get-products";
import { getSales } from "../_data-acess/sales/get-sales";
import HeaderComponent, {
  HeaderLeft,
  HeaderRight,
  HeaderSubTitle,
  HeaderTitle,
} from "../Components/Header-Component/HeaderComponent";
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
      <HeaderComponent>
        <HeaderLeft>
          <HeaderTitle>Gestão de Vendas</HeaderTitle>
          <HeaderSubTitle>Vendas</HeaderSubTitle>
        </HeaderLeft>
        <HeaderRight>
          <UpsertSaleButton
            products={products}
            productOptions={productOptions}
          />
        </HeaderRight>
      </HeaderComponent>
      <DataTable columns={saleTableColumns} data={tableData} />
    </div>
  );
};

export default SalesPage;
