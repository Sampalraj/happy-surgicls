import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, Search } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const CategoryManager = () => {
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ id: null, segment_id: '', name: '', description: '', is_active: true });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [cats, segs] = await Promise.all([
            supabaseService.getCategories(),
            supabaseService.getSegments()
        ]);
        setCategories(cats);
        setSegments(segs);
        setLoading(false);
    };

    const handleEdit = (cat) => {
        setFormData({
            id: cat.id,
            segment_id: cat.segment_id || '',
            name: cat.name,
            description: cat.description || '',
            is_active: cat.is_active ?? true
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await supabaseService.deleteCategory(id);
                loadData();
            } catch (error) {
                alert('Error deleting category: ' + error.message);
            }
        }
    };

    const handleSave = async () => {
        if (!formData.name || !formData.segment_id) return alert('Name and Segment are required');

        try {
            if (formData.id) {
                await supabaseService.updateCategory(formData.id, formData);
            } else {
                await supabaseService.createCategory(formData);
            }
            loadData();
            setShowModal(false);
            setFormData({ id: null, segment_id: '', name: '', description: '', is_active: true });
        } catch (error) {
            alert('Error saving category: ' + error.message);
        }
    };

    return (
        <div className="category-manager">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Categories</h2>
                <button onClick={() => { setFormData({ id: null, segment_id: '', name: '', description: '', status: 'Active' }); setShowModal(true); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Add Category
                </button>
            </div>

            {/* Soft UI Card List */}
            <div className="card-list">
                {categories.map(cat => {
                    const parentSeg = segments.find(s => s.id === cat.segment_id);
                    return (
                        <div key={cat.id} className="card-list-item" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow-soft)' }}>

                            {/* Left: Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#F0F9FF', color: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{cat.name.charAt(0)}</div>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.2rem' }}>{cat.name}</h4>
                                    {parentSeg && (
                                        <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0EA5E9' }}></span>
                                            {parentSeg.name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Middle: Description */}
                            <div style={{ flex: 1, padding: '0 2rem', color: '#64748B', fontSize: '0.9rem' }}>
                                {cat.description || <span style={{ opacity: 0.5 }}>No description</span>}
                            </div>

                            {/* Right: Actions */}
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button onClick={() => handleEdit(cat)} className="btn-icon-soft" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', background: 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(cat.id)} className="btn-icon-soft" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', background: '#FEF2F2', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {categories.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>No categories found. Create one.</div>
                )}
            </div>

            {/* Add Category Modal Overlay */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formData.id ? 'Edit Category' : 'New Category'}</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Parent Segment <span style={{ color: 'red' }}>*</span></label>
                            <select className="form-control" value={formData.segment_id} onChange={(e) => setFormData({ ...formData, segment_id: e.target.value })}>
                                <option value="">Select Segment...</option>
                                {segments.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category Name</label>
                            <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Surgical Gloves" />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                            <input type="text" className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <button onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleSave} className="btn btn-primary">Save Category</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CategoryManager;
