import { useState, useEffect } from "react";
import PromptPackCard from "@/components/molecules/PromptPackCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { promptPackService } from "@/services/api/promptPackService";

const PromptPackGrid = ({ category = null }) => {
  const [promptPacks, setPromptPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPromptPacks = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await promptPackService.getAll();
      const filteredData = category 
        ? data.filter(pack => pack.category === category)
        : data;
      
      setPromptPacks(filteredData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromptPacks();
  }, [category]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPromptPacks} />;
  if (promptPacks.length === 0) return <Empty message="No prompt packs found" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promptPacks.map((pack, index) => (
        <PromptPackCard 
          key={pack.id} 
          promptPack={pack} 
          index={index}
        />
      ))}
    </div>
  );
};

export default PromptPackGrid;