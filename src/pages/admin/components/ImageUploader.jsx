import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ label, value, onChange, helpText }) => {
    const [preview, setPreview] = useState(value);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>
                {label}
            </label>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {/* Preview Area */}
                <div
                    onClick={triggerUpload}
                    style={{
                        width: '120px',
                        height: '120px',
                        border: '2px dashed #cbd5e1',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: preview ? `url(${preview}) center/cover no-repeat` : '#f8fafc',
                        position: 'relative',
                        transition: 'all 0.2s'
                    }}
                    className="image-upload-preview"
                >
                    {!preview && (
                        <>
                            <Upload size={24} color="#64748b" />
                            <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>Upload</span>
                        </>
                    )}
                </div>

                {/* Actions & Help */}
                <div style={{ flex: 1 }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <button
                            type="button"
                            onClick={triggerUpload}
                            className="btn btn-secondary"
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <ImageIcon size={16} /> Choose Image
                        </button>
                        {preview && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="btn btn-danger-outline"
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.875rem',
                                    color: '#ef4444',
                                    border: '1px solid #ef4444',
                                    background: 'transparent',
                                    borderRadius: '0.375rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    {helpText && (
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                            {helpText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
