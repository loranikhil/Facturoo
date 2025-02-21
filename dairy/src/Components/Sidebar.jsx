import React from 'react';

import { Home, ShoppingCart, CreditCard, Gift, Trophy, HeadphonesIcon, Settings} from 'lucide-react';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';

import './Sidebar.css';



const Sidebar = () => {
  const sidebarItems = [
    { id: 'customer', icon: <Home size={20} />, label: 'Customer' },
    { id: 'orders', icon: <ShoppingCart size={20} />, label: 'My Orders' },
    { id: 'payments', icon: <CreditCard size={20} />, label: 'Payments & Bills' },
    { id: 'offers', icon: <Gift size={20} />, label: 'Offers & Discounts' },
    { id: 'loyalty', icon: <Trophy size={20} />, label: 'Loyalty Program' },
    { id: 'support', icon: <HeadphonesIcon size={20} />, label: 'Support & Feedback' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    
    { id: 'Dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    {id: 'InventoryManagement', icon: <Inventory2Icon size={20} />, label: 'InventoryManagement' },
    {id: 'Orders&Sales', icon: <ReceiptOutlinedIcon size={20} />, label: 'Orders&Sales' },
    {id: 'Billing&Invoices', icon: <DescriptionRoundedIcon size={20} />, label: 'Billing&Invoices'},
    { id: 'Payments', icon: <CreditCard size={20} />, label: 'Payments & Bills' },
    { id: 'Reports&Analytics', icon: <BarChartRoundedIcon size={20} />, label: 'Reports&Analytics' },
    { id: 'Marketing & Promotions', icon: <CampaignRoundedIcon size={20} />, label: 'Marketing & Promotions' },
    { id: 'Users & Roles', icon: <GroupRoundedIcon size={20} />, label: 'Users & Roles' },
    { id: 'Store Setup & Branding', icon: <StorefrontRoundedIcon size={20} />, label: 'Store Setup & Branding' },
    { id: 'System Settings', icon: <CreditCard size={20} />, label: 'System Settings' },
   
    { id: 'Dashboard', icon: <CreditCard size={20} />, label: 'Dashboard' },
    { id: 'Orders Management', icon: <CreditCard size={20} />, label: 'Orders Management' },
    { id: 'Stock & Inventory', icon: <CreditCard size={20} />, label: 'Stock & Inventory' },
    { id: 'Sales Reports', icon: <CreditCard size={20} />, label: 'Sales Reports' },
    { id: 'Customer Queries & Feedback', icon: <CreditCard size={20} />, label: 'Customer Queries & Feedback' },
    { id: 'Refunds & Cancellations', icon: <CreditCard size={20} />, label: 'Refunds & Cancellations' },
    
    
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav>
          {sidebarItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="sidebar-item"
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;