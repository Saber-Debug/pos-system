import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PosPage from './pages/PosPage';
import ProductsPage from './pages/ProductsPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif' }}>
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<PosPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;