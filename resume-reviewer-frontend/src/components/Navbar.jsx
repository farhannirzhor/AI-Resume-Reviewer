import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar-custom">
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="d-flex align-items-center gap-2">
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, #00d4aa 0%, #00a8e8 100%)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', fontWeight: 800, color: '#0a0e1a',
                boxShadow: '0 0 16px rgba(0,212,170,0.4)',
              }}>
                AI
              </div>
              <span style={{
                fontWeight: 700, fontSize: '1.05rem',
                color: 'var(--text-primary)', letterSpacing: '-0.3px',
              }}>
                Resume <span className="gradient-text">Reviewer</span>
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="d-flex align-items-center gap-2">
            <Link
              to="/"
              className={`btn-ghost ${location.pathname === '/' ? 'active-nav' : ''}`}
              style={location.pathname === '/' ? {
                borderColor: 'var(--accent-primary)',
                color: 'var(--accent-primary)',
                background: 'rgba(0,212,170,0.08)',
              } : {}}
            >
              <span>⚡</span> Analyze
            </Link>
            <Link
              to="/history"
              className={`btn-ghost ${location.pathname === '/history' ? 'active-nav' : ''}`}
              style={location.pathname === '/history' ? {
                borderColor: 'var(--accent-primary)',
                color: 'var(--accent-primary)',
                background: 'rgba(0,212,170,0.08)',
              } : {}}
            >
              <span>🕑</span> History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
