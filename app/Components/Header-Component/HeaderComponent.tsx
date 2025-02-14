import React, { ReactNode } from "react";

export const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-xl font-semibold text-slate-500">{children}</h2>;
};

export const HeaderSubTitle = ({ children }: { children: ReactNode }) => {
  return <span className="text-gray">{children}</span>;
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-1">{children}</div>;
};

export const HeaderRight = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
const HeaderComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

export default HeaderComponent;
