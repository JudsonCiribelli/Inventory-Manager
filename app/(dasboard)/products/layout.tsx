import { ReactNode } from "react";

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h1>Layout dos produtos</h1>
      {children}
    </div>
  );
};

export default ProductsLayout;
