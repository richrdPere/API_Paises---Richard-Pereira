// Libraries (Librerias)
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="max-sm:hidden md:flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">
          Paises & Continentes
        </span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Navegacion */}
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          {/* 1.- Nav. Principal */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 text-sky-500 hover:bg-gray-700 font-bold"
                : "flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Paises
          </NavLink>

          {/* 2.- Nav. Favoritos */}
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 text-sky-500 hover:bg-gray-700 font-bold"
                : "flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Favoritos
          </NavLink>

          {/* 3.- Nav. Actividades */}
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 text-sky-500 hover:bg-gray-700 font-bold"
                : "flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Actividades
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
