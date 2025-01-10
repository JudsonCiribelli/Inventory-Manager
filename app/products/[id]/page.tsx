interface ParamsDetails {
  id: string;
}

const ProductsDetailsPage = ({ params: { id } }: { params: ParamsDetails }) => {
  return (
    <div>
      <h1>Id: {id}</h1>
    </div>
  );
};

export default ProductsDetailsPage;
