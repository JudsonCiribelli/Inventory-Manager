import { getProducts } from "../_data-acess/product/get-products";
import { Button } from "../Components/ui/button";
import { ComboboxOption } from "../Components/ui/combobox";
import { Sheet, SheetTrigger } from "../Components/ui/sheet";
import UpsertSheetContent from "./_Components/Upsert-sheet-content/upsertSheetContent";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  return (
    <div className="w-full space-y-8 p-8">
      {/* ESQUERDA */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xl font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-gray">Produtos</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Vendas</Button>
          </SheetTrigger>
          <UpsertSheetContent
            products={products}
            productOptions={productOptions}
          />
        </Sheet>
      </div>
      {/* <DataTable columns={productsTableColumns} data={products} /> */}
    </div>
  );
};

export default SalesPage;
