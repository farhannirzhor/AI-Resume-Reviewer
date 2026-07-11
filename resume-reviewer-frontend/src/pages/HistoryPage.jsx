import React, { useEffect, useState } from 'react';
import { getHistory, getReviewById } from '../api/reviewApi';
import ReviewResult from '../components/ReviewResult';
import MatchGauge from '../components/MatchGauge';

function getMatchBadge(pct) {
  if (pct >= 71) return { color: '#22c55e', bg: 'rgba(34,197,94,0.12)', label: `${pct}%` };
  if (pct >= 41) return { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', label: `${pct}%` };
  return { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', label: `${pct}%` };
}

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      setLoading(true);
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to load history. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleRowClick(id) {
    setDetailLoading(true);
    setSelectedReview(null);
    try {
      const data = await getReviewById(id);
      setSelectedReview(data);
    } catch {
      setError('Failed to load review details.');
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        {selectedReview ? (
          <ReviewResult
            review={selectedReview}
            onReset={() => setSelectedReview(null)}
          />
        ) : (
          <>
            {/* Header */}
            <div className="animate-fade-up mb-4">
              <div className="section-tag">🕑 Review History</div>
              <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: '0.5rem' }}>
                Past <span className="gradient-text">Analyses</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Click any row to view the full review details.
              </p>
            </div>

            {loading ? (
              <div className="loading-overlay">
                <div className="loading-ring" />
                <div style={{ color: 'var(--text-muted)' }}>Loading history…</div>
              </div>
            ) : error ? (
              <div className="error-alert animate-fade">
                <span>⚠️</span><span>{error}</span>
              </div>
            ) : history.length === 0 ? (
              <div className="glass-card p-5 text-center animate-fade-up">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.4rem' }}>No reviews yet</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Go to the Analyze tab and submit your first resume!
                </div>
              </div>
            ) : (
              <div className="glass-card animate-fade-up" style={{ overflow: 'hidden' }}>
                {detailLoading && (
                  <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                    <div className="d-flex align-items-center gap-2" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
                      <div className="loading-ring" style={{ width: 20, height: 20, borderWidth: 2 }} />
                      Loading review…
                    </div>
                  </div>
                )}

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                        {['#', 'Job Role', 'Match Score', 'Date'].map(h => (
                          <th key={h} style={{
                            padding: '0.9rem 1.2rem',
                            color: 'var(--text-muted)',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.8px',
                            textAlign: h === 'Match Score' ? 'center' : 'left',
                          }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item, i) => {
                        const badge = getMatchBadge(item.match_percentage);
                        return (
                          <tr
                            key={item.id}
                            className="history-row animate-fade-up"
                            style={{ animationDelay: `${i * 0.05}s` }}
                            onClick={() => handleRowClick(item.id)}
                          >
                            <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', width: 60 }}>
                              #{item.id}
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.job_role}</div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{
                                display: 'inline-block',
                                background: badge.bg,
                                color: badge.color,
                                border: `1px solid ${badge.color}44`,
                                borderRadius: '50px',
                                padding: '0.25rem 0.9rem',
                                fontSize: '0.88rem',
                                fontWeight: 700,
                                minWidth: 64,
                              }}>
                                {badge.label}
                              </span>
                            </td>
                            <td style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                              {new Date(item.created_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
