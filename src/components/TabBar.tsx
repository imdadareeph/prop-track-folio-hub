
import { Home, Building, CreditCard, GalleryHorizontal, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const TabBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const tabs = [
    {
      name: "Home",
      path: "/",
      icon: Home
    },
    {
      name: "Property",
      path: "/property",
      icon: Building
    },
    {
      name: "Payment",
      path: "/payment",
      icon: CreditCard
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: GalleryHorizontal
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];

  return (
    <div className="tab-bar">
      {tabs.map((tab) => {
        const isActive = tab.path === "/" 
          ? currentPath === "/" 
          : currentPath.startsWith(tab.path);
          
        return (
          <Link 
            key={tab.name} 
            to={tab.path} 
            className={`tab-item ${isActive ? "active" : ""}`}
          >
            <tab.icon className="h-5 w-5 mb-1" />
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default TabBar;
