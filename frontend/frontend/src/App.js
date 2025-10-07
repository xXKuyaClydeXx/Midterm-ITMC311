import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseJobs from "./pages/BrowseJobs";
import Applications from "./pages/Applications";
import EmployerDashboard from "./pages/EmployerDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
         {/* <Route path="/" element={<BrowseJobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} /> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
