"use client";
import { Button } from "@/app/Components/ui/button";
import { Sheet, SheetTrigger } from "@/app/Components/ui/sheet";
import UpsertSheetContent from "../Upsert-sheet-content/upsertSheetContent";
import { ComboboxOption } from "@/app/Components/ui/combobox";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { ProductDto } from "@/app/_data-acess/product/get-products";

interface UpsertSaleButtonProps {
  productOptions: ComboboxOption[];
  products: ProductDto[];
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
        isOpen={sheetIsOpen}
        setSheetIsOpen={setSheetIsOpen}
        {...props}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
