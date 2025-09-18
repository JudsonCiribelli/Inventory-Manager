"use client";
import { formatCurrency } from "@/app/_helpers/Currency/currency";
import { Button } from "@/app/Components/ui/button";
import { Combobox, ComboboxOption } from "@/app/Components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/Components/ui/form";
import { Input } from "@/app/Components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/Components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/Components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import UpsertSaleTableDropdownMenu from "../Sales-Table-Dropdown-Menu/salesTableDropdownMenu";
import { upsertSale } from "@/app/_actions/sales/upsert-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";
import { ProductDto } from "@/app/_data-acess/product/get-products";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto selecionado não é válido!",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface SelectedProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
interface UpsertSheetContentProps {
  isOpen: boolean;
  saleId?: string;
  productOptions: ComboboxOption[];
  products: ProductDto[];
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
  defaultSelectedProducts?: SelectedProducts[];
}
const UpsertSheetContent = ({
  isOpen,
  saleId,
  productOptions,
  setSheetIsOpen,
  products,
  defaultSelectedProducts,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProduts] = useState<SelectedProducts[]>(
    defaultSelectedProducts ?? [],
  );
  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso.");
      setSheetIsOpen(false);
    },
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 0,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setSelectedProduts([]);
    }
  }, [isOpen, form]);

  useEffect(() => {
    setSelectedProduts(defaultSelectedProducts ?? []);
  }, [defaultSelectedProducts]);

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectedProduts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque!",
          });
          return currentProducts;
        }
        form.reset();
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return { ...product, quantity: product.quantity + data.quantity };
          }
          return product;
        });
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque!",
        });
        return currentProducts;
      }
      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    setSelectedProduts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  const onSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    options={productOptions}
                    placeholder="Selecione um produto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSaleTableDropdownMenu
                  product={product}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter>
        <Button
          onClick={onSubmitSale}
          className="mt-2 w-full gap-2"
          disabled={selectedProducts.length === 0}
        >
          <CheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
