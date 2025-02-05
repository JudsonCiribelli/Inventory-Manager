"use client";
import { Button } from "@/app/Components/ui/button";
import { Sheet, SheetTrigger } from "@/app/Components/ui/sheet";
import UpsertSheetContent from "../Upsert-sheet-content/upsertSheetContent";
import { ComboboxOption } from "@/app/Components/ui/combobox";
import { Product } from "@prisma/client";
import { useState } from "react";

interface CreateSaleButtonProps {
  productOptions: ComboboxOption[];
  products: Product[];
}
const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Vendas</Button>
      </SheetTrigger>
      <UpsertSheetContent
        onSubmitSuccess={() => setSheetIsOpen(false)}
        {...props}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
