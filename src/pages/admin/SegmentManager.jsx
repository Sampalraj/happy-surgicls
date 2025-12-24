import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, Image as ImageIcon, Link as LinkIcon, Upload } from 'lucide-react';
import { mockBackend } from '../../utils/mockBackend';
import ImageUploader from './components/ImageUploader';

const SegmentManager = () => {
    const [segments, setSegments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', description: '', hero_image: '', is_active: true });

    // UI State for Image Input Method: 'url' or 'upload'
    const [imageInputType, setImageInputType] = useState('url');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setSegments(mockBackend.getSegments());
    };

    const handleEdit = (seg) => {
        setFormData(seg);
        // Detect if current image is a blob/data URL or a web URL to set initial state
        const isDataUrl = seg.hero_image && seg.hero_image.startsWith('data:');
        setImageInputType(isDataUrl ? 'upload' : 'url');
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this segment? This will affect all categories linked to it.')) {
            mockBackend.deleteSegment(id);
            loadData();
        }
    };

    const handleSave = () => {
        if (!formData.name) return alert('Name is required');

        mockBackend.saveSegment(formData);
        loadData();
        setShowModal(false);
        setFormData({ id: null, name: '', description: '', hero_image: '', is_active: true });
        setImageInputType('url'); // Reset default
    };

    return (
        <div className="segment-manager">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Segments</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Top-level industry groupings (Carousel Items)</p>
                </div>
                <button onClick={() => { setFormData({ id: null, name: '', description: '', hero_image: '', is_active: true }); setImageInputType('url'); setShowModal(true); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Add Segment
                </button>
            </div>

            <div className="card" style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Hero</th>
                            <th>Segment Name</th>
                            <th>Description</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {segments.map(seg => (
                            <tr key={seg.id}>
                                <td>
                                    {seg.hero_image ? (
                                        <img src={seg.hero_image} alt="" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ImageIcon size={16} color="#999" />
                                        </div>
                                    )}
                                </td>
                                <td style={{ fontWeight: '500' }}>{seg.name}</td>
                                <td style={{ color: '#666' }}>{seg.description || '-'}</td>
                                <td>{seg.display_order || 0}</td>
                                <td>
                                    <span className={`badge ${seg.is_active ? 'badge-success' : 'badge-gray'}`} style={{ padding: '4px 8px', borderRadius: '4px', background: seg.is_active ? '#e6fffa' : '#edf2f7', color: seg.is_active ? '#047857' : '#718096', fontSize: '12px' }}>
                                        {seg.is_active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button onClick={() => handleEdit(seg)} className="btn-icon"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(seg.id)} className="btn-icon" style={{ color: '#c53030' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formData.id ? 'Edit Segment' : 'New Segment'}</h3>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                            <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Healthcare" />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Subtitle)</label>
                            <input type="text" className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>

                        {/* Image Input Toggle */}
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Hero Image</label>

                            <div style={{ display: 'flex', marginBottom: '0.75rem', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setImageInputType('url')}
                                    style={{
                                        flex: 1, padding: '0.4rem', border: '1px solid #e2e8f0', borderRadius: '4px',
                                        background: imageInputType === 'url' ? '#eff6ff' : 'white',
                                        color: imageInputType === 'url' ? '#1d4ed8' : '#64748b',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <LinkIcon size={14} /> Image URL
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImageInputType('upload')}
                                    style={{
                                        flex: 1, padding: '0.4rem', border: '1px solid #e2e8f0', borderRadius: '4px',
                                        background: imageInputType === 'upload' ? '#f0fdf4' : 'white',
                                        color: imageInputType === 'upload' ? '#15803d' : '#64748b',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Upload size={14} /> Upload Image
                                </button>
                            </div>

                            {imageInputType === 'url' ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.hero_image}
                                    onChange={e => setFormData({ ...formData, hero_image: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                />
                            ) : (
                                <ImageUploader
                                    label=""
                                    value={formData.hero_image}
                                    onChange={(val) => setFormData({ ...formData, hero_image: val })}
                                    helpText="Recommended: 500x500px or larger. PNG or JPG."
                                />
                            )}
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Display Order</label>
                            <input type="number" className="form-control" value={formData.display_order} onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) })} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <button onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleSave} className="btn btn-primary">Save Segment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SegmentManager;
