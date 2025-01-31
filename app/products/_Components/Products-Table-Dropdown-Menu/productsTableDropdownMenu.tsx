import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/Components/ui/alert-dialog";
import { Button } from "@/app/Components/ui/button";
import { Dialog, DialogTrigger } from "@/app/Components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/Components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import {
  ClipboardIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import UpserProductDialogContent from "../Upsert-Product-Dialog/upsertProductDialogContent";
import DeleteProductDialogContent from "../Delete-Dialog/deleteDialogProdutcContent";

interface ProductTableDropdownMenuProps {
  product: Product;
}
const ProductTableDropdownMenu = ({
  product,
}: ProductTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <ClipboardIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="pointer cursor-pointer">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="pointer cursor-pointer">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpserProductDialogContent
          defaultValues={{
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
            id: product.id,
          }}
          onSuccess={() => setEditDialogOpen(false)}
        />
        <DeleteProductDialogContent productId={product.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default ProductTableDropdownMenu;
