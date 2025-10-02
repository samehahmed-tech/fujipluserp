import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from './context/LocalizationContext';
import { TabProvider } from './context/TabContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainMenu } from './pages/MainMenu';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Sales } from './pages/Sales';
import { NotFound } from './pages/NotFound';
import { Warehouses } from './pages/Warehouses';
import { BillOfMaterials } from './pages/BillOfMaterials';
import { Production } from './pages/Production';
import { ItemsManagement } from './pages/ItemsManagement';
// Import new pages
import { Purchasing } from './pages/Purchasing';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { InventoryTransfers } from './pages/InventoryTransfers';


const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <ThemeProvider>
        <HashRouter>
          <TabProvider>
            <Routes>
              <Route path="/" element={<MainMenu />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/items" element={<ItemsManagement />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchasing" element={<Purchasing />} />
              <Route path="/manufacturing" element={<Production />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />

              {/* New Manufacturing & Logistics Routes */}
              <Route path="/warehouses" element={<Warehouses />} />
              <Route path="/bill-of-materials" element={<BillOfMaterials />} />
              <Route path="/inventory-transfers" element={<InventoryTransfers />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TabProvider>
        </HashRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;