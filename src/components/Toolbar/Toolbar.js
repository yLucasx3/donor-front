import { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import './styles.css';

function Toolbar() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProSidebar collapsed={collapsed}>
      <SidebarHeader>
        <p className="toggle" 
           onClick={() => {
             setCollapsed(!collapsed);
           }}>
          Toggle
        </p>
      </SidebarHeader>
      <Menu iconShape="circle">
          <MenuItem icon>Donors</MenuItem>
          <MenuItem icon>Donations</MenuItem>
          <MenuItem icon>Payments</MenuItem>
      </Menu>
    </ProSidebar>
  );
}

export default Toolbar;