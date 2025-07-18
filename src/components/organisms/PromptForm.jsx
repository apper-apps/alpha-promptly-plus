import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Slider from "@/components/atoms/Slider";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { addGeneration, setGenerating } from "@/store/slices/generationSlice";
import { incrementGenerationCount } from "@/store/slices/userSlice";
import { generationService } from "@/services/api/generationService";

const PromptForm = ({ promptPack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isGenerating } = useSelector(state => state.generation);
  const { user } = useSelector(state => state.user);
  
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialData = {};
    promptPack.fields.forEach(field => {
      initialData[field.name] = field.type === "slider" ? field.min || 0 : "";
    });
    setFormData(initialData);
  }, [promptPack]);

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    promptPack.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateAIGeneration = async () => {
    const samples = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    ];
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    
    // Simulate streaming by returning characters progressively
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(randomSample);
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (user.subscription.plan === "free" && user.subscription.generationsLeft <= 0) {
      toast.error("You've reached your free generation limit");
      return;
    }

    try {
      dispatch(setGenerating(true));
      
      const generatedText = await simulateAIGeneration();
      
      const newGeneration = {
        id: `gen-${Date.now()}`,
        promptPackId: promptPack.id,
        inputs: formData,
        output: generatedText,
        createdAt: new Date().toISOString(),
        isFavorite: false,
        category: promptPack.category,
        userId: user.id
      };

      await generationService.create(newGeneration);
      dispatch(addGeneration(newGeneration));
      dispatch(incrementGenerationCount());
      
      toast.success("Content generated successfully!");
      navigate(`/generation/${newGeneration.id}`);
      
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      dispatch(setGenerating(false));
    }
  };

  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      error: errors[field.name],
      required: field.required
    };

    switch (field.type) {
      case "text":
        return (
          <Input
            {...commonProps}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );
      
      case "textarea":
        return (
          <Textarea
            {...commonProps}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
          />
        );
      
      case "select":
        return (
          <Select
            {...commonProps}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      
      case "slider":
        return (
          <Slider
            {...commonProps}
            value={formData[field.name] || field.min || 0}
            onChange={(e) => handleInputChange(field.name, parseInt(e.target.value))}
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 1}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card gradient className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <ApperIcon name={promptPack.icon} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              {promptPack.name}
            </h2>
            <p className="text-text-secondary">{promptPack.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {promptPack.fields.map(renderField)}
          
          <div className="flex items-center justify-between pt-6 border-t border-secondary/20">
            <div className="text-sm text-text-muted">
              {user.subscription.plan === "free" && (
                <span>{user.subscription.generationsLeft} generations left</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/")}
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isGenerating}
                className="min-w-[120px]"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Sparkles" className="w-4 h-4" />
                    <span>Generate</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default PromptForm;