import { LayoutGrid, ShoppingCart, BadgeDollarSign } from "lucide-react";
//Components
import SideBarButton from "../Sidebar-Button-Component/Sidebar-Button-Component";

const SideBarComponent = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <SideBarButton href="/">
          <LayoutGrid size={20} />
          Dasboard
        </SideBarButton>
        {/*BOTOES*/}
        <SideBarButton href="/products">
          <ShoppingCart size={20} />
          Produtos
        </SideBarButton>
        <SideBarButton href="/sales">
          <BadgeDollarSign size={20} />
          Vendas
        </SideBarButton>
      </div>
    </div>
  );
};

export default SideBarComponent;
