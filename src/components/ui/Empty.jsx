import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  message = "No content found",
  action = "Get started",
  icon = "FileText",
  onAction
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="p-8 text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {message}
        </h3>
        
        <p className="text-text-secondary mb-6">
          Ready to create something amazing? Choose a prompt pack and start generating!
        </p>
        
        <Button
          onClick={handleAction}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>{action}</span>
        </Button>
      </Card>
    </motion.div>
  );
};

export default Empty;