import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório.",
  }),
  price: z.number().min(0.01, {
    message: "O valor do produto é obrigatório.",
  }),
  stock: z.coerce
    .number()
    .positive({ message: "A quantidade do estoque deve ser positiva" })
    .int()
    .min(0, {
      message: "A quantidade em estoque é obrigatória.",
    }),
});
export type createProductSchema = z.infer<typeof createProductSchema>;
