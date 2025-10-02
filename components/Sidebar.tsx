
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { NAV_LINKS, IconLogout } from '../constants';
import { useLocalization } from '../hooks/useLocalization';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { translations } = useLocalization();

  return (
    <>
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`fixed top-0 start-0 z-40 w-64 h-screen bg-white shadow-xl transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:start-auto`}>
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold text-sky-500">FUJI<span className="text-gray-700">PLUS</span></h1>
        </div>
        <nav className="flex flex-col justify-between h-[calc(100vh-5rem)] p-4">
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <RouterNavLink
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {link.icon}
                  <span className="ms-4 font-semibold">{translations[link.labelKey]}</span>
                </RouterNavLink>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                <IconLogout />
                <span className="ms-4 font-semibold">{translations.logout}</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
