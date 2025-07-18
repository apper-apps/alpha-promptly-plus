import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ title, value, icon, change, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card gradient className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <ApperIcon name={icon} className="w-6 h-6 text-white" />
          </div>
          {change && (
            <div className={`flex items-center space-x-1 text-xs ${
              change > 0 ? "text-green-400" : "text-red-400"
            }`}>
              <ApperIcon 
                name={change > 0 ? "TrendingUp" : "TrendingDown"} 
                className="w-4 h-4" 
              />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-2xl font-display font-bold gradient-text mb-1">
            {value}
          </h3>
          <p className="text-text-secondary text-sm">{title}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;