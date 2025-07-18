import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GenerationCard from "@/components/molecules/GenerationCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { generationService } from "@/services/api/generationService";

const GenerationHistory = () => {
  const { generations } = useSelector(state => state.generation);
  const [filteredGenerations, setFilteredGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadGenerations = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await generationService.getAll();
      setFilteredGenerations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGenerations();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredGenerations(generations);
    } else {
      const filtered = generations.filter(gen => 
        gen.output.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gen.inputs?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGenerations(filtered);
    }
  }, [searchTerm, generations]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadGenerations} />;

  return (
    <div className="space-y-6">
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search your generations..."
      />
      
      {filteredGenerations.length === 0 ? (
        <Empty 
          message={searchTerm ? "No generations found matching your search" : "No generations yet"}
          action={!searchTerm ? "Create your first generation" : "Try a different search"}
        />
      ) : (
        <div className="space-y-4">
          {filteredGenerations.map((generation, index) => (
            <GenerationCard 
              key={generation.id} 
              generation={generation} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerationHistory;