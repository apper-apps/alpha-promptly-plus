import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StatCard from "@/components/molecules/StatCard";
import ApperIcon from "@/components/ApperIcon";

const Profile = () => {
  const { user } = useSelector(state => state.user);

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
            <ApperIcon name="User" className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold gradient-text">
              Profile
            </h1>
          </div>
          <p className="text-text-secondary">
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card gradient className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-bold text-text-primary">
                    {user.displayName}
                  </h2>
                  <p className="text-text-secondary">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={user.subscription.plan === "free" ? "secondary" : "primary"}>
                      {user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)}
                    </Badge>
                    <span className="text-sm text-text-muted">
                      Joined {format(new Date(user.joinedAt), "MMM yyyy")}
                    </span>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  Edit Profile
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Your Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                title="Total Generations"
                value={user.generationCount}
                icon="FileText"
                index={0}
              />
              <StatCard
                title="Remaining"
                value={user.subscription.generationsLeft}
                icon="Zap"
                index={1}
              />
              <StatCard
                title="Favorites"
                value="8"
                icon="Heart"
                index={2}
              />
              <StatCard
                title="Days Active"
                value="12"
                icon="Calendar"
                index={3}
              />
            </div>
          </motion.div>

          {/* Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Subscription
                </h3>
                <Badge variant={user.subscription.plan === "free" ? "secondary" : "primary"}>
                  {user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)} Plan
                </Badge>
              </div>
              
              {user.subscription.plan === "free" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Generations Left</span>
                    <span className="text-text-primary font-semibold">
                      {user.subscription.generationsLeft}
                    </span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      style={{ width: `${(user.subscription.generationsLeft / 100) * 100}%` }}
                    />
                  </div>
                  <Button variant="primary" className="w-full">
                    Upgrade to Premium
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <ApperIcon name="Crown" className="w-12 h-12 text-accent mx-auto mb-2" />
                  <p className="text-text-primary font-semibold">Unlimited Generations</p>
                  <p className="text-text-secondary text-sm">Thank you for being a premium member!</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Bell" className="w-5 h-5 text-text-secondary" />
                    <span className="text-text-primary">Notifications</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Download" className="w-5 h-5 text-text-secondary" />
                    <span className="text-text-primary">Export Data</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="HelpCircle" className="w-5 h-5 text-text-secondary" />
                    <span className="text-text-primary">Help & Support</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;