import { ReactNode } from "react";

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-2 flex h-9 w-6 items-center justify-center rounded-md bg-emerald-500 bg-opacity-10 text-emerald-500">
      {children}
    </div>
  );
};

export const SummaryCartTitle = ({ children }: { children: ReactNode }) => {
  return <p className="p text-sm font-medium text-slate-500">{children}</p>;
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};

const SummaryCard = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-xl bg-white p-4">{children}</div>;
};

export default SummaryCard;
