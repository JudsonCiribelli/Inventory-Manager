const SideBarComponent = () => {
  return (
    <div className="w-64 bg-white h-screen">
      <div className="px-16 py-4">
        {/* IMAGEM*/}
        <h1 className="text-2xl font-bold text-black">STOCKLY</h1>
      </div>
      <div className="flex flex-col p-2 gap-2">
        {/*BOTOES*/}
        <button className=" px-6 py-3 rounded">Dasboard</button>
        <button className=" px-6 py-3 rounded"> Products</button>
        <button className=" px-6 py-3 rounded">Sales</button>
      </div>
    </div>
  );
};

export default SideBarComponent;
