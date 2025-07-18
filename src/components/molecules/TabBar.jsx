import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TabBar = () => {
  const tabs = [
    { name: "Home", path: "/", icon: "Home" },
    { name: "History", path: "/history", icon: "History" },
    { name: "Create", path: "/create", icon: "Plus" },
    { name: "Profile", path: "/profile", icon: "User" }
  ];

  return (
    <div className="glass fixed bottom-0 left-0 right-0 z-50 px-4 py-2 mx-4 mb-4 rounded-2xl">
      <nav className="flex items-center justify-around">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) => 
              `relative flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "text-white" 
                  : "text-text-muted hover:text-text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <ApperIcon name={tab.icon} className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{tab.name}</span>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default TabBar;