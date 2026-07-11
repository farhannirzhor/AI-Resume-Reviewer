import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function getMatchColors(pct) {
  if (pct >= 71) return { path: '#22c55e', trail: 'rgba(34,197,94,0.12)', text: '#22c55e', label: 'Strong Match', bg: 'rgba(34,197,94,0.08)' };
  if (pct >= 41) return { path: '#f59e0b', trail: 'rgba(245,158,11,0.12)', text: '#f59e0b', label: 'Moderate Match', bg: 'rgba(245,158,11,0.08)' };
  return       { path: '#ef4444', trail: 'rgba(239,68,68,0.12)', text: '#ef4444', label: 'Low Match', bg: 'rgba(239,68,68,0.08)' };
}

export default function MatchGauge({ percentage }) {
  const colors = getMatchColors(percentage);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 160, height: 160, margin: '0 auto 1rem',
        filter: `drop-shadow(0 0 20px ${colors.path}55)`,
      }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: colors.path,
            trailColor: colors.trail,
            textColor: colors.text,
            textSize: '18px',
            pathTransitionDuration: 1.2,
            pathTransition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0s',
          })}
        />
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        background: colors.bg, border: `1px solid ${colors.path}44`,
        borderRadius: '50px', padding: '0.3rem 0.9rem',
        fontSize: '0.82rem', fontWeight: 700, color: colors.text,
        letterSpacing: '0.4px', textTransform: 'uppercase',
      }}>
        <span>●</span> {colors.label}
      </div>
    </div>
  );
}
