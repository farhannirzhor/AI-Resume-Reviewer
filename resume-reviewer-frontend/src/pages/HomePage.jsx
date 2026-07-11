import React, { useState } from 'react';
import ResumeDropzone from '../components/ResumeDropzone';
import ReviewResult from '../components/ReviewResult';
import { analyzeResume } from '../api/reviewApi';

export default function HomePage() {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!jobRole.trim()) { setError('Please enter a job role.'); return; }
    if (!jobDescription.trim()) { setError('Please enter a job description.'); return; }
    if (!resumeFile) { setError('Please upload your resume (PDF or DOCX).'); return; }

    setLoading(true);
    try {
      const data = await analyzeResume(jobRole, jobDescription, resumeFile);
      setResult(data);
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setJobRole('');
    setJobDescription('');
    setResumeFile(null);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        {result ? (
          <ReviewResult review={result} onReset={handleReset} />
        ) : (
          <>
            {/* Hero */}
            <div className="text-center mb-5 animate-fade-up">
              <div className="section-tag" style={{ margin: '0 auto 1.2rem' }}>
                🤖 Powered by Gemma3 via Ollama
              </div>
              <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.15, marginBottom: '1rem' }}>
                Analyze Your Resume with{' '}
                <span className="gradient-text">AI Precision</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                Upload your resume and a job description. Get an instant AI-powered analysis with match score, strengths, weaknesses, and actionable suggestions.
              </p>
            </div>

            {/* Form Card */}
            <div className="glass-card p-4 p-md-5 animate-fade-up delay-1">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {/* Job Role */}
                  <div className="col-12 col-md-5">
                    <label htmlFor="job-role" className="form-label-custom">🎯 Target Job Role</label>
                    <input
                      id="job-role"
                      type="text"
                      className="form-control-custom"
                      placeholder="e.g. Senior Frontend Developer"
                      value={jobRole}
                      onChange={e => setJobRole(e.target.value)}
                      disabled={loading}
                      autoComplete="off"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="col-12 col-md-7">
                    <label className="form-label-custom">📄 Resume File</label>
                    <ResumeDropzone
                      onFileSelect={setResumeFile}
                      file={resumeFile}
                    />
                  </div>

                  {/* Job Description */}
                  <div className="col-12">
                    <label htmlFor="job-desc" className="form-label-custom">📋 Job Description</label>
                    <textarea
                      id="job-desc"
                      className="form-control-custom"
                      placeholder="Paste the full job description here..."
                      rows={7}
                      value={jobDescription}
                      onChange={e => setJobDescription(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="col-12">
                      <div className="error-alert animate-fade">
                        <span>⚠️</span>
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="col-12">
                    <button
                      id="analyze-btn"
                      type="submit"
                      className="btn-primary-custom"
                      disabled={loading}
                      style={{ minWidth: 200 }}
                    >
                      {loading ? (
                        <>
                          <div className="spinner" />
                          Analyzing…
                        </>
                      ) : (
                        <>⚡ Analyze Resume</>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Loading state */}
              {loading && (
                <div className="loading-overlay mt-4 animate-fade">
                  <div className="loading-ring" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.3rem' }}>
                      AI is analyzing your resume…
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      This may take 15–60 seconds depending on resume length
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Feature pills */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-4 animate-fade-up delay-2">
              {['🔒 100% Local — No data leaves your machine', '📊 Match Score 0–100', '🎯 Actionable Suggestions', '🔑 Missing Keyword Detection'].map(f => (
                <span key={f} className="chip">{f}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
