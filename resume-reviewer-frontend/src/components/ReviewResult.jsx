import React, { useState } from 'react';
import MatchGauge from './MatchGauge';

const TABS = [
  { key: 'strengths',        label: 'Strengths',         icon: '✅', color: 'var(--success)' },
  { key: 'weaknesses',       label: 'Weaknesses',        icon: '❌', color: 'var(--danger)' },
  { key: 'suggestions',      label: 'Suggestions',       icon: '💡', color: 'var(--warning)' },
  { key: 'missing_keywords', label: 'Missing Keywords',  icon: '🔑', color: 'var(--info)' },
];

const ITEM_STYLES = {
  strengths:        { bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.2)',  iconBg: 'rgba(34,197,94,0.15)',  iconColor: '#22c55e' },
  weaknesses:       { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',  iconBg: 'rgba(239,68,68,0.15)',  iconColor: '#ef4444' },
  suggestions:      { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', iconBg: 'rgba(245,158,11,0.15)', iconColor: '#f59e0b' },
  missing_keywords: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', iconBg: 'rgba(59,130,246,0.15)', iconColor: '#3b82f6' },
};

const ICONS = {
  strengths: '✓', weaknesses: '✗', suggestions: '→', missing_keywords: '#',
};

function ResultItem({ text, type }) {
  const s = ITEM_STYLES[type];
  return (
    <div className="result-item animate-fade-up" style={{ background: s.bg, borderColor: s.border }}>
      <div className="result-item-icon" style={{ background: s.iconBg, color: s.iconColor, fontWeight: 700 }}>
        {ICONS[type]}
      </div>
      <span style={{ color: 'var(--text-primary)', lineHeight: 1.55 }}>{text}</span>
    </div>
  );
}

export default function ReviewResult({ review, onReset }) {
  const [activeTab, setActiveTab] = useState('strengths');

  const activeItems = review[activeTab] || [];

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <div className="section-tag">✨ AI Analysis Complete</div>
          <h2 style={{ fontWeight: 800, fontSize: '1.6rem', margin: 0 }}>
            {review.job_role}
          </h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            📄 {review.resume_filename} · {new Date(review.created_at).toLocaleString()}
          </div>
        </div>
        <button className="btn-ghost" onClick={onReset}>
          ← Analyze Another
        </button>
      </div>

      <div className="row g-4">
        {/* Left: Gauge + Summary */}
        <div className="col-lg-4">
          <div className="glass-card p-4 h-100">
            <MatchGauge percentage={review.match_percentage} />
            <div className="divider" />
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.6rem' }}>
                AI Summary
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                {review.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Tabbed results */}
        <div className="col-lg-8">
          <div className="glass-card p-4">
            {/* Tabs */}
            <div className="tabs-custom">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon} {tab.label}
                  <span style={{
                    background: activeTab === tab.key ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.06)',
                    borderRadius: '50px', padding: '0 6px', fontSize: '0.75rem',
                  }}>
                    {(review[tab.key] || []).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Items */}
            <div style={{ minHeight: 240 }}>
              {activeItems.length > 0 ? (
                activeItems.map((item, i) => (
                  <ResultItem key={i} text={item} type={activeTab} />
                ))
              ) : (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem', fontSize: '0.9rem' }}>
                  No items in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
