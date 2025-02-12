"use client";
import { SalesDto } from "@/app/_data-acess/sales/get-sales";
import { formatCurrency } from "@/app/_helpers/Currency/currency";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "../Table-Dropdown-Menu/tableDropdownMenu";

export const saleTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "productName",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de produtos",
  },
  {
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => (
      <SalesTableDropdownMenu sale={sale} />
    ),
  },
];
