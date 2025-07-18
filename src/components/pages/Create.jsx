import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PromptForm from "@/components/organisms/PromptForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { promptPackService } from "@/services/api/promptPackService";

const Create = () => {
  const { packId } = useParams();
  const navigate = useNavigate();
  const [promptPack, setPromptPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPromptPack = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const pack = await promptPackService.getById(packId);
      if (!pack) {
        throw new Error("Prompt pack not found");
      }
      setPromptPack(pack);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (packId) {
      loadPromptPack();
    } else {
      navigate("/");
    }
  }, [packId, navigate]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPromptPack} />;
  if (!promptPack) return <Error message="Prompt pack not found" onRetry={() => navigate("/")} />;

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
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3 mb-2">
            <ApperIcon name="Sparkles" className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold gradient-text">
              Create Content
            </h1>
          </div>
          <p className="text-text-secondary">
            Fill in the details below to generate your content
          </p>
        </motion.div>

        <PromptForm promptPack={promptPack} />
      </div>
    </div>
  );
};

export default Create;