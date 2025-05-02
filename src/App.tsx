import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { SearchProvider } from './context/SearchContext';
import { ProductProvider } from './context/ProductContext';
import './App.css';

function App() {
  return (
    <Router>
      <SearchProvider>
        <ProductProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProductProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;