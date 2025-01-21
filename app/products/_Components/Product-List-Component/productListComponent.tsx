import { Product } from "@prisma/client";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
