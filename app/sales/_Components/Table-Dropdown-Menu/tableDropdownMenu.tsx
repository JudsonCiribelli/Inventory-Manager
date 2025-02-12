import { deleteSale } from "@/app/_actions/sales/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/Components/ui/alert-dialog";
import { Button } from "@/app/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/Components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/Components/ui/sheet";
import {
  ClipboardIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertSheetContent from "../Upsert-sheet-content/upsertSheetContent";
import { useState } from "react";
import { ComboboxOption } from "@/app/Components/ui/combobox";
import { ProductDto } from "@/app/_data-acess/product/get-products";
import { SalesDto } from "@/app/_data-acess/sales/get-sales";

interface SalesTableDropdownMenuProps {
  sale: Pick<SalesDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const SalesTableDropdownMenu = ({
  sale,
  products,
  productOptions,
}: SalesTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpersetSheetIsOpen] = useState(false);

  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso.");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao deletar a venda!");
    },
  });
  const handleCopyToClipboardClick = () => {
    toast.success("ID copiado para área de transferência!");
  };

  const handleDeleteSaleClick = () => execute({ id: sale.id });
  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpersetSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="pointer cursor-pointer"
              onClick={handleCopyToClipboardClick}
            >
              <ClipboardIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem className="pointer cursor-pointer">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="pointer cursor-pointer">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que deseja excluir?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Esta ação não pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSaleClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <UpsertSheetContent
        setSheetIsOpen={setUpersetSheetIsOpen}
        saleId={sale.id}
        productOptions={productOptions}
        products={products}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
        }))}
      />
    </Sheet>
  );
};

export default SalesTableDropdownMenu;
