import { Outlet } from "react-router-dom";
import TabBar from "@/components/molecules/TabBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-24">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};

export default Layout;