import HeaderComponent, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "./Components/Header-Component/HeaderComponent";

export default function Home() {
  return (
    <div className="w-full space-y-8 p-8">
      <HeaderComponent>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubTitle>Visão geral dos dados</HeaderSubTitle>
        </HeaderLeft>
      </HeaderComponent>
    </div>
  );
}
