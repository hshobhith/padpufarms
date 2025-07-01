import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/LOGO_11_jpeg.jpg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenus}>
            <img src={logo} alt="Padpu Farms" className="h-14 w-auto" />
            <span className="ml-2 text-xl font-bold text-green-800">Padpu Farms</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-green-700 font-medium">Home</Link>
            <Link to="/about" className="hover:text-green-700 font-medium">About</Link>

            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="hover:text-green-700 font-medium"
              >
                Services ▾
              </button>
              {servicesOpen && (
                <div className="absolute top-8 left-0 bg-white shadow rounded py-2 w-32">
                  <Link to="/products" className="block px-4 py-2 hover:bg-green-50" onClick={closeMenus}>Products</Link>
                  <Link to="/training" className="block px-4 py-2 hover:bg-green-50" onClick={closeMenus}>Training</Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="hover:text-green-700 font-medium">Contact Us</Link>
            <Link to="/gallery" className="hover:text-green-700 font-medium">Gallery</Link>
            <Link to="/faqs" className="hover:text-green-700 font-medium">FAQs</Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-800 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to="/" className="block hover:text-green-700" onClick={closeMenus}>Home</Link>
            <Link to="/about" className="block hover:text-green-700" onClick={closeMenus}>About</Link>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="block w-full text-left hover:text-green-700"
            >
              Services ▾
            </button>
            {servicesOpen && (
              <div className="pl-4 space-y-1">
                <Link to="/products" className="block hover:text-green-700" onClick={closeMenus}>Products</Link>
                <Link to="/training" className="block hover:text-green-700" onClick={closeMenus}>Training</Link>
              </div>
            )}
            <Link to="/contact" className="block hover:text-green-700" onClick={closeMenus}>Contact Us</Link>
            <Link to="/gallery" className="block hover:text-green-700" onClick={closeMenus}>Gallery</Link>
            <Link to="/faqs" className="block hover:text-green-700" onClick={closeMenus}>FAQs</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
