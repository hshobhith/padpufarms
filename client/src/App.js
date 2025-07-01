import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageTrainings from "./pages/admin/ManageTrainings";
import AdminRequests from "./pages/admin/OrdersAndRequests";
import Footer from "./components/Footer";
import AdminFAQs from "./pages/admin/AdminFAQs";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/training" element={<Training />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/trainings" element={<ManageTrainings />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/faqs" element={<AdminFAQs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
