import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PromptPackCard = ({ promptPack, index = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/create/${promptPack.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        gradient 
        className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <ApperIcon name={promptPack.icon} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-text-primary">
                {promptPack.name}
              </h3>
              <Badge variant="secondary" size="sm">
                {promptPack.category}
              </Badge>
            </div>
          </div>
          <ApperIcon name="ChevronRight" className="w-5 h-5 text-text-secondary" />
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {promptPack.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <ApperIcon name="Users" className="w-4 h-4" />
            <span>{promptPack.usageCount.toLocaleString()} uses</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-text-muted">
            <ApperIcon name="FileText" className="w-4 h-4" />
            <span>{promptPack.fields.length} fields</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PromptPackCard;