import { createContext, useContext } from "react";

export const SidebarContext = createContext<{ 
  isOpen: boolean; 
  setIsOpen: (value: boolean) => void;
} | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside SidebarContext");
  }
  return context;
};