import "./App.css";
import HomePage from "./landing_page/home/HomePage.jsx";
import SignupForm from "./landing_page/signup/SignupForm.jsx";
import LoginForm from "./landing_page/signup/LoginForm.jsx";
import About from "./landing_page/about/AboutPage.jsx";
import Product from "./landing_page/products/ProductPage.jsx";
import Pricing from "./landing_page/pricing/PricingPage.jsx";
import Support from "./landing_page/support/SupportPage.jsx";
import Navbar from "./landing_page/Navbar.jsx";
import Fotter from "./landing_page/Fotter.jsx";
import PageNotFound from "./landing_page/PageNotFound.jsx";
import Dashboard from "./landing_page/dashboard/Dashboard.jsx"; // ✅ NEW

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ NEW */}
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Fotter />
    </div>
  );
}

export default App;
