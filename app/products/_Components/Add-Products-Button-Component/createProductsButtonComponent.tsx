"use client";
import { Button } from "@/app/Components/ui/button";
import { Dialog, DialogTrigger } from "@/app/Components/ui/dialog";
import { PlusIcon } from "lucide-react";
import UpserProductDialogContent from "../Upsert-Product-Dialog/upsertProductDialogContent";
import { useState } from "react";

const AddProductsButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </DialogTrigger>
      <UpserProductDialogContent setDialogIsOpen={setDialogIsOpen} />
    </Dialog>
  );
};

export default AddProductsButton;
