import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, Search } from 'lucide-react';

const CategoryManager = () => {
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([
        { id: 1, name: 'Surgical Instruments', count: 145, status: 'Active' },
        { id: 2, name: 'Dental Instruments', count: 89, status: 'Active' },
        { id: 3, name: 'Veterinary Instruments', count: 42, status: 'Active' },
        { id: 4, name: 'Single Use', count: 0, status: 'Hidden' },
    ]);

    const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });

    const handleSave = () => {
        // Mock save
        const newId = categories.length + 1;
        setCategories([...categories, { id: newId, name: formData.name, count: 0, status: formData.status }]);
        setShowModal(false);
        setFormData({ name: '', description: '', status: 'Active' });
    };

    return (
        <div className="category-manager">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Categories</h2>
                <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Add Category
                </button>
            </div>

            <div className="card" style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Product Count</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td style={{ fontWeight: '500' }}>{cat.name}</td>
                                <td style={{ color: '#666' }}>{cat.count} products</td>
                                <td>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        background: cat.status === 'Active' ? '#e6fffa' : '#edf2f7',
                                        color: cat.status === 'Active' ? '#38a169' : '#718096'
                                    }}>
                                        {cat.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button className="btn-icon" title="Edit"><Edit size={16} /></button>
                                        <button className="btn-icon" title="Delete" style={{ color: '#c53030' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Category Modal Overlay */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add New Category</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category Name</label>
                            <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Orthopedic" />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                            <textarea className="form-control" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description for SEO..."></textarea>
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Status</label>
                            <select className="form-control" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option>Active</option>
                                <option>Hidden</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
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
