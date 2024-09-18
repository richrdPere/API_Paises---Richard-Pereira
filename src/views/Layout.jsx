// Libraries (Librerias)
import React from "react";

// Components (Componentes)
import Sidebar from "../components/Layout_Components/Sidebar";


import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Hijos como Components */}
          <main className="container mx-4 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
