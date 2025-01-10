"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarButtonProps {
  href: string;
  children: ReactNode;
}

const SideBarButton = ({ href, children }: SidebarButtonProps) => {
  const pathname = usePathname();
  return (
    <Button
      className="justify-start gap-1"
      variant={pathname === href ? "secondary" : "ghost"}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SideBarButton;
