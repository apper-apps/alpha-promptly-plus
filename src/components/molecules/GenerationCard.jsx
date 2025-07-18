import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toggleFavorite, deleteGeneration } from "@/store/slices/generationSlice";

const GenerationCard = ({ generation, index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(generation.id));
    toast.success(generation.isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteGeneration(generation.id));
    toast.success("Generation deleted");
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(generation.output);
    toast.success("Copied to clipboard");
  };

  const handleClick = () => {
    navigate(`/generation/${generation.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card 
        className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge variant="primary" size="sm">
              {generation.category || "Essay"}
            </Badge>
            <span className="text-xs text-text-muted">
              {format(new Date(generation.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="p-1 hover:bg-surface/50"
            >
              <ApperIcon 
                name={generation.isFavorite ? "Heart" : "Heart"} 
                className={`w-4 h-4 ${generation.isFavorite ? "fill-red-500 text-red-500" : "text-text-muted"}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="p-1 hover:bg-surface/50"
            >
              <ApperIcon name="Copy" className="w-4 h-4 text-text-muted" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="p-1 hover:bg-surface/50 text-red-400"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-3">
          <h3 className="font-medium text-text-primary mb-1 line-clamp-1">
            {generation.inputs?.title || "Untitled Generation"}
          </h3>
          <p className="text-text-secondary text-sm line-clamp-2">
            {generation.output}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center space-x-2">
            <ApperIcon name="FileText" className="w-4 h-4" />
            <span>{generation.output.length} characters</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Clock" className="w-4 h-4" />
            <span>{format(new Date(generation.createdAt), "h:mm a")}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default GenerationCard;