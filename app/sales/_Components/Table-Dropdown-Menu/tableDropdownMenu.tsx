import { deleteSale } from "@/app/_actions/sales";
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
import { Sale } from "@prisma/client";
import {
  ClipboardIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface SalesTableDropdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
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
          <DropdownMenuItem className="pointer cursor-pointer">
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>
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
  );
};

export default SalesTableDropdownMenu;
