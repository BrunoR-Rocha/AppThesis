import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};