import { DataTable } from "../Components/ui/data-table";
import { getProducts } from "../_data-acess/product/get-products";
//Components
import { productsTableColumns } from "./_Components/Table-Columns-Product-Component/tableColumnsComponent";
import AddProductsButton from "./_Components/Add-Products-Button-Component/createProductsButtonComponent";
import HeaderComponent, {
  HeaderLeft,
  HeaderRight,
  HeaderSubTitle,
  HeaderTitle,
} from "../Components/Header-Component/HeaderComponent";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full space-y-8 overflow-auto p-8">
      <HeaderComponent>
        <HeaderLeft>
          <HeaderTitle>Gestão de Produtos</HeaderTitle>
          <HeaderSubTitle>Produtos</HeaderSubTitle>
        </HeaderLeft>
        <HeaderRight>
          <AddProductsButton />
        </HeaderRight>
      </HeaderComponent>
      <DataTable columns={productsTableColumns} data={products} />
    </div>
  );
};

export default ProductsPage;
