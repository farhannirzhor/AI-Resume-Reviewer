import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ResumeDropzone({ onFileSelect, file }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) onFileSelect(acceptedFiles[0]);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone-area ${isDragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
    >
      <input {...getInputProps()} id="resume-file-input" />

      {file ? (
        <div className="animate-fade">
          <div style={{ fontSize: '2.2rem', marginBottom: '0.6rem' }}>📄</div>
          <div style={{ fontWeight: 600, color: 'var(--accent-primary)', fontSize: '0.95rem' }}>
            {file.name}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.3rem' }}>
            {(file.size / 1024).toFixed(1)} KB · Click or drag to replace
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            {isDragActive ? '📥' : '📂'}
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
            {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            or click to browse · PDF or DOCX · Max 5MB
          </div>
        </div>
      )}
    </div>
  );
}
