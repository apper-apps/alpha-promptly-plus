import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import PromptPackGrid from "@/components/organisms/PromptPackGrid";
import StatCard from "@/components/molecules/StatCard";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const { user } = useSelector(state => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      <div className="px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text mb-2">
                Welcome back, {user.displayName}
              </h1>
              <p className="text-text-secondary">
                Ready to create something amazing?
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <ApperIcon name="Sparkles" className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Generations"
              value={user.generationCount}
              icon="FileText"
              change={12}
              index={0}
            />
            <StatCard
              title="Remaining"
              value={user.subscription.generationsLeft}
              icon="Zap"
              change={-5}
              index={1}
            />
            <StatCard
              title="Favorites"
              value="8"
              icon="Heart"
              change={25}
              index={2}
            />
            <StatCard
              title="Streak"
              value="3"
              icon="Calendar"
              change={15}
              index={3}
            />
          </div>
        </motion.div>

        {/* Featured Prompt Packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Star" className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Featured Prompt Packs
            </h2>
          </div>
          
          <PromptPackGrid />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { name: "Essays", icon: "GraduationCap", color: "from-blue-500 to-blue-600" },
            { name: "Captions", icon: "MessageCircle", color: "from-green-500 to-green-600" },
            { name: "Poems", icon: "Feather", color: "from-purple-500 to-purple-600" },
            { name: "Stories", icon: "BookOpen", color: "from-orange-500 to-orange-600" }
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-br ${item.color} p-4 rounded-xl cursor-pointer`}
            >
              <ApperIcon name={item.icon} className="w-6 h-6 text-white mb-2" />
              <span className="text-white font-medium text-sm">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;