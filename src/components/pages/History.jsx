import { motion } from "framer-motion";
import GenerationHistory from "@/components/organisms/GenerationHistory";
import ApperIcon from "@/components/ApperIcon";

const History = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <ApperIcon name="History" className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold gradient-text">
              Generation History
            </h1>
          </div>
          <p className="text-text-secondary">
            View and manage all your AI-generated content
          </p>
        </motion.div>

        <GenerationHistory />
      </div>
    </div>
  );
};

export default History;