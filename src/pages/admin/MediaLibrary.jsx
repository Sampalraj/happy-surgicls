import React, { useState } from 'react';
import { Upload, Image as ImageIcon, FileText, Trash2, Link as LinkIcon, Download } from 'lucide-react';

const MediaLibrary = () => {
    const [filter, setFilter] = useState('All');
    const [mediaItems, setMediaItems] = useState([
        { id: 1, type: 'image', name: 'surgical-kit.jpg', url: '/placeholder.jpg', size: '1.2 MB' },
        { id: 2, type: 'image', name: 'factory-floor.png', url: '/placeholder.jpg', size: '2.4 MB' },
        { id: 3, type: 'pdf', name: 'product-catalog-2025.pdf', url: '#', size: '4.5 MB' },
        { id: 4, type: 'image', name: 'logo-transparent.png', url: '/placeholder.jpg', size: '0.5 MB' },
    ]);

    const filteredItems = filter === 'All' ? mediaItems : mediaItems.filter(item => item.type === (filter === 'Images' ? 'image' : 'pdf'));

    return (
        <div className="media-library">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Media Library</h2>
                <div className="upload-btn-wrapper">
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Upload size={18} /> Upload New
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="media-filters" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                {['All', 'Images', 'Documents'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            fontWeight: filter === f ? 'bold' : 'normal',
                            color: filter === f ? 'var(--color-primary)' : '#666',
                            borderBottom: filter === f ? '2px solid var(--color-primary)' : 'none'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Media Grid */}
            <div className="media-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
                {/* Upload Placeholder */}
                <div style={{ border: '2px dashed #ddd', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', background: '#fafafa', cursor: 'pointer' }}>
                    <Upload size={32} color="#ccc" />
                    <p style={{ marginTop: '1rem', color: '#999', fontSize: '0.9rem' }}>Drop files to upload</p>
                </div>

                {filteredItems.map(item => (
                    <div key={item.id} className="media-item" style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', background: 'white', position: 'relative', transition: 'box-shadow 0.2s' }}>
                        <div className="media-preview" style={{ height: '140px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {item.type === 'image' ? (
                                <ImageIcon size={48} color="#999" />
                                // In real app: <img src={item.url} ... />
                            ) : (
                                <FileText size={48} color="#e53e3e" />
                            )}
                        </div>
                        <div className="media-info" style={{ padding: '0.75rem' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: '500', truncate: 'true', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                            <p style={{ fontSize: '0.75rem', color: '#999' }}>{item.size}</p>
                        </div>
                        <div className="media-actions" style={{ padding: '0 0.75rem 0.75rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button className="btn-icon" title="Copy Link" style={{ padding: '4px' }}><LinkIcon size={14} /></button>
                            <button className="btn-icon" title="Delete" style={{ padding: '4px', color: '#c53030' }}><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default MediaLibrary;
