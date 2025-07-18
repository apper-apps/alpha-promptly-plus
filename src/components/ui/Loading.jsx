import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <div className="h-8 bg-gradient-to-r from-surface to-surface/60 rounded-lg w-64 animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-surface to-surface/60 rounded-lg w-96 animate-pulse" />
      </motion.div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-surface rounded-2xl p-6 border border-secondary/20"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-surface to-surface/60 rounded w-24 animate-pulse" />
                <div className="h-3 bg-gradient-to-r from-surface to-surface/60 rounded w-16 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gradient-to-r from-surface to-surface/60 rounded w-full animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-surface to-surface/60 rounded w-3/4 animate-pulse" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 bg-gradient-to-r from-surface to-surface/60 rounded w-20 animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-surface to-surface/60 rounded w-16 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;