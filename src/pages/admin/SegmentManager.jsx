import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, Image as ImageIcon, Link as LinkIcon, Upload } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';
import ImageUploader from './components/ImageUploader';

const SegmentManager = () => {
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', description: '', hero_image: '', is_active: true });

    // UI State for Image Input Method: 'url' or 'upload'
    const [imageInputType, setImageInputType] = useState('url');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await supabaseService.getSegments();
        setSegments(data);
        setLoading(false);
    };

    const handleEdit = (seg) => {
        setFormData(seg);
        // Detect if current image is a blob/data URL or a web URL to set initial state
        const isDataUrl = seg.hero_image && seg.hero_image.startsWith('data:');
        setImageInputType(isDataUrl ? 'upload' : 'url');
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this segment? This will affect all categories linked to it.')) {
            try {
                await supabaseService.deleteSegment(id);
                loadData();
            } catch (error) {
                alert('Error deleting segment: ' + error.message);
            }
        }
    };

    const handleSave = async () => {
        if (!formData.name) return alert('Name is required');

        try {
            if (formData.id) {
                await supabaseService.updateSegment(formData.id, formData);
            } else {
                await supabaseService.createSegment(formData);
            }
            loadData();
            setShowModal(false);
            setFormData({ id: null, name: '', description: '', hero_image: '', is_active: true });
            setImageInputType('url'); // Reset default
        } catch (error) {
            alert('Error saving segment: ' + error.message);
        }
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

            {/* Card List View (Soft UI) */}
            <div className="card-list">
                {segments.map(seg => (
                    <div key={seg.id} className="card-list-item" style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow-soft)' }}>

                        {/* Left: Image & Info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '16px', overflow: 'hidden', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {seg.hero_image ? (
                                    <img src={seg.hero_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <ImageIcon size={24} color="#CBD5E1" />
                                )}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>{seg.name}</h4>
                                <p style={{ color: '#6B7280', fontSize: '0.9rem', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {seg.description || 'No description provided'}
                                </p>
                            </div>
                        </div>

                        {/* Middle: Order & Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Order</span>
                                <span style={{ fontWeight: '600', color: '#374151' }}>{seg.display_order || 0}</span>
                            </div>

                            <span className={`badge ${seg.is_active ? 'badge-success' : 'badge-gray'}`} style={{
                                padding: '0.5rem 1rem', borderRadius: '999px',
                                background: seg.is_active ? '#ECFDF5' : '#F3F4F6',
                                color: seg.is_active ? '#059669' : '#6B7280',
                                fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem'
                            }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></div>
                                {seg.is_active ? 'Active' : 'Hidden'}
                            </span>
                        </div>

                        {/* Right: Actions */}
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => handleEdit(seg)} className="btn-icon-soft" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', background: 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(seg.id)} className="btn-icon-soft" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48', background: '#fff1f2', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {segments.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#9CA3AF' }}>No segments found. Add one to get started.</div>
                )}
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
