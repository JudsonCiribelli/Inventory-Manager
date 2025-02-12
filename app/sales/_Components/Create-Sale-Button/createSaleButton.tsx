"use client";
import { Button } from "@/app/Components/ui/button";
import { Sheet, SheetTrigger } from "@/app/Components/ui/sheet";
import UpsertSheetContent from "../Upsert-sheet-content/upsertSheetContent";
import { ComboboxOption } from "@/app/Components/ui/combobox";
import { Product } from "@prisma/client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

interface UpsertSaleButtonProps {
  productOptions: ComboboxOption[];
  products: Product[];
}
const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Nova venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        onSubmitSuccess={() => setSheetIsOpen(false)}
        {...props}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
