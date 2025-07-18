import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const GenerationViewer = ({ generation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generation.output);
    toast.success("Copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Generated Content",
        text: generation.output
      });
    } else {
      handleCopy();
    }
  };

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([generation.output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `generation-${format(new Date(generation.createdAt), "yyyy-MM-dd-HH-mm")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("File downloaded!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card gradient className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-text-primary mb-2">
              {generation.inputs?.title || "Generated Content"}
            </h1>
            <div className="flex items-center space-x-3">
              <Badge variant="primary">
                {generation.category || "Content"}
              </Badge>
              <span className="text-sm text-text-secondary">
                {format(new Date(generation.createdAt), "MMM dd, yyyy 'at' h:mm a")}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Copy" className="w-4 h-4" />
              <span>Copy</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Share" className="w-4 h-4" />
              <span>Share</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExport}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Download" className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Generated Content */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Generated Content
          </h3>
          <div className="flex items-center space-x-4 text-sm text-text-muted">
            <span>{generation.output.length} characters</span>
            <span>{generation.output.split(" ").length} words</span>
            <span>{generation.output.split("\n").length} lines</span>
          </div>
        </div>
        
        <div className="relative">
          <div 
            className={`prose prose-invert max-w-none ${
              !isExpanded ? "max-h-96 overflow-hidden" : ""
            }`}
          >
            <div className="whitespace-pre-wrap text-text-primary leading-relaxed">
              {generation.output}
            </div>
          </div>
          
          {!isExpanded && generation.output.length > 500 && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent flex items-end justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="mb-2"
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Input Details */}
      {generation.inputs && Object.keys(generation.inputs).length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Input Details
          </h3>
          <div className="space-y-3">
            {Object.entries(generation.inputs).map(([key, value]) => (
              <div key={key} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-text-secondary capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-text-primary">
                  {typeof value === "string" ? value : JSON.stringify(value)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default GenerationViewer;