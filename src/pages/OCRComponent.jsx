import React, { useState, useEffect } from 'react';

const OCRComponent = () => {
  const [image, setImage] = useState(null);
  const [textResult, setTextResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { 
        setError('File size should be less than 1MB');
        return;
      }
      
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image file first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('apikey','K89290853088957');
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');

    try {
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.ErrorMessage) {
        throw new Error(data.ErrorMessage);
      }

      if (data.ParsedResults?.[0]?.ParsedText) {
        setTextResult(data.ParsedResults[0].ParsedText);
      } else {
        throw new Error('No text could be extracted from the image');
      }
    } catch (error) {
      setError(error.message || 'Failed to extract text. Please try again.');
      setTextResult('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div style={{ maxWidth: '32rem', margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ 
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                padding: '0.5rem'
              }}
            />
          </div>

          {preview && (
            <div style={{ marginTop: '1rem' }}>
              <img
                src={preview}
                alt="Preview"
                style={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !image}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              color: 'white',
              backgroundColor: loading || !image ? '#9CA3AF' : '#2563EB',
              cursor: loading || !image ? 'not-allowed' : 'pointer',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {loading ? 'Processing...' : 'Extract Text'}
          </button>
        </form>

        {error && (
          <div style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #EF4444',
            borderRadius: '0.375rem',
            padding: '1rem',
            color: '#B91C1C'
          }}>
            {error}
          </div>
        )}

        {textResult && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Extracted Text:
            </h3>
            <div style={{
              backgroundColor: '#F9FAFB',
              padding: '1rem',
              borderRadius: '0.375rem',
              border: '1px solid #E5E7EB'
            }}>
              <pre style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '0.875rem'
              }}>
                {textResult}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRComponent;