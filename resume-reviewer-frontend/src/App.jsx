import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-glass)',
      padding: '1.5rem 0',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.82rem',
    }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        AI Resume Reviewer · Powered by{' '}
        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Gemma3</span>{' '}
        via Ollama · 100% local &amp; private
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
