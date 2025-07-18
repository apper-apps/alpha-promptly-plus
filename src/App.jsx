import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import History from "@/components/pages/History";
import Create from "@/components/pages/Create";
import Profile from "@/components/pages/Profile";
import Generation from "@/components/pages/Generation";

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
          <Route path="create/:packId" element={<Create />} />
          <Route path="profile" element={<Profile />} />
          <Route path="generation/:generationId" element={<Generation />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;