import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const CertificateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        issuer: '',
        expiry: '',
        image: '',
        status: 'Active',
        show_on_products: true,
        category_ids: [] // Array of mapped category IDs
    });

    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const cats = await supabaseService.getCategories();
            setAllCategories(cats || []);

            if (isEditMode) {
                const data = await supabaseService.getCertificate(id);
                if (data) {
                    setFormData({
                        name: data.name || '',
                        issuer: data.issuer || '',
                        expiry: data.expiry || '',
                        image: data.image || '',
                        status: data.status || 'Active',
                        show_on_products: data.show_on_products !== false,
                        category_ids: data.category_ids || []
                    });
                } else {
                    alert('Certificate not found');
                    navigate('/admin/certificates');
                }
            }
        };
        loadData();
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryToggle = (catId) => {
        setFormData(prev => {
            const current = prev.category_ids || [];
            if (current.includes(catId)) {
                return { ...prev, category_ids: current.filter(id => id !== catId) };
            } else {
                return { ...prev, category_ids: [...current, catId] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simple validation
        if (!formData.name || !formData.image) {
            alert('Please provide a name and an image URL.');
            setLoading(false);
            return;
        }

        try {
            const payload = { ...formData };
            // Ensure expiry is null if empty string to avoid Date parse errors? 
            // Postgres date field might complain about empty string.
            if (payload.expiry === '') payload.expiry = null;

            if (isEditMode) {
                await supabaseService.updateCertificate(id, payload);
            } else {
                await supabaseService.createCertificate(payload);
            }
            navigate('/admin/certificates');
        } catch (error) {
            console.error('Error saving certificate:', error);
            alert('Failed to save certificate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/admin/certificates" className="btn-icon" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                        <ArrowLeft size={18} />
                    </Link>
                    <h1 className="admin-title">{isEditMode ? 'Edit Certificate' : 'Add New Certificate'}</h1>
                </div>
            </div>

            <div className="admin-card" style={{ maxWidth: 800, margin: '0 auto' }}>
                <form onSubmit={handleSubmit} className="admin-form">

                    {/* Basic Info */}
                    <div className="form-section">
                        <h3 className="form-legend">Basic Information</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Certificate Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. ISO 13485:2016"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Issuer / Authority</label>
                                <input
                                    type="text"
                                    name="issuer"
                                    value={formData.issuer}
                                    onChange={handleChange}
                                    placeholder="e.g. SGS, FDA"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Expiry Date (Optional)</label>
                            <input
                                type="date"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="form-section">
                        <h3 className="form-legend">Certificate Image</h3>
                        <div className="form-group">
                            <label>Image URL <span className="required">*</span></label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/cert.png"
                                    style={{ flex: 1 }}
                                />
                                {/* Placeholder for actual upload integration */}
                                <button type="button" className="btn btn-secondary">
                                    <Upload size={16} /> Upload
                                </button>
                            </div>
                            <small className="form-hint">Enter a direct URL or upload (mock).</small>
                        </div>

                        {formData.image && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, display: 'inline-block' }}>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Preview:</p>
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    style={{ height: 100, objectFit: 'contain' }}
                                    onError={(e) => e.target.src = 'https://placehold.co/150x150?text=Invalid+Link'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Category Mapping (NEW) */}
                    <div className="form-section">
                        <h3 className="form-legend">Applicable Product Categories</h3>
                        <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
                            Select the categories this certificate applies to. All products in these categories will automatically display this certificate.
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: 6, background: '#f8fafc' }}>
                            {allCategories.map(cat => (
                                <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'white', borderRadius: 4, border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.category_ids?.includes(cat.id)}
                                        onChange={() => handleCategoryToggle(cat.id)}
                                    />
                                    <span style={{ fontSize: '0.9rem' }}>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Visibility & Status */}
                    <div className="form-section">
                        <h3 className="form-legend">Visibility & Settings</h3>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Active"
                                        checked={formData.status === 'Active'}
                                        onChange={handleChange}
                                    />
                                    <span className="status-badge active">Active</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Draft"
                                        checked={formData.status === 'Draft'}
                                        onChange={handleChange}
                                    />
                                    <span className="status-badge draft">Draft</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Disabled"
                                        checked={formData.status === 'Disabled'}
                                        onChange={handleChange}
                                    />
                                    <span className="status-badge disabled">Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: 6, transition: 'all 0.2s', background: formData.show_on_products ? '#f0fdf4' : 'white', borderColor: formData.show_on_products ? '#86efac' : '#e2e8f0' }}>
                                <input
                                    type="checkbox"
                                    name="show_on_products"
                                    checked={formData.show_on_products}
                                    onChange={handleChange}
                                />
                                <div>
                                    <strong style={{ display: 'block' }}>Show on Product Detail Pages</strong>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Display as a trust badge near product specifications.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/admin/certificates" className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            <Save size={18} /> {loading ? 'Saving...' : 'Save Certificate'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CertificateForm;
