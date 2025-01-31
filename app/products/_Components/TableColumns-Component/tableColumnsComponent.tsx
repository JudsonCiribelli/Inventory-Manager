"use client";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/Components/ui/badge";
import {
  CircleIcon,
  ClipboardIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/Components/ui/dropdown-menu";
import { Button } from "@/app/Components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/Components/ui/alert-dialog";
import DeleteProductDialogContent from "../Delete-Dialog/deleteDialogProdutcContent";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/app/Components/ui/dialog";
import UpserProductDialogContent from "../Upsert-Product-Dialog/upsertProductDialogContent";
import { useState } from "react";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
};

export const productsTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <Badge
          className="gap-1.5 bg-green-400"
          variant={label === "Em estoque" ? "default" : "outline"}
        >
          <CircleIcon
            size={10}
            className={`{${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`}
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const product = row.row.original;
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
    },
  },
];
