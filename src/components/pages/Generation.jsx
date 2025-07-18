import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GenerationViewer from "@/components/organisms/GenerationViewer";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { generationService } from "@/services/api/generationService";

const Generation = () => {
  const { generationId } = useParams();
  const navigate = useNavigate();
  const [generation, setGeneration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGeneration = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const gen = await generationService.getById(generationId);
      if (!gen) {
        throw new Error("Generation not found");
      }
      setGeneration(gen);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (generationId) {
      loadGeneration();
    } else {
      navigate("/history");
    }
  }, [generationId, navigate]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadGeneration} />;
  if (!generation) return <Error message="Generation not found" onRetry={() => navigate("/history")} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/history")}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              <span>Back to History</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3 mb-2">
            <ApperIcon name="FileText" className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold gradient-text">
              Generated Content
            </h1>
          </div>
          <p className="text-text-secondary">
            View and manage your AI-generated content
          </p>
        </motion.div>

        <GenerationViewer generation={generation} />
      </div>
    </div>
  );
};

export default Generation;