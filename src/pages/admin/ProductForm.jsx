import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Save, ArrowLeft, Upload, Plus, Trash2, ChevronRight,
    Image as ImageIcon, FileText, CheckCircle, Circle
} from 'lucide-react';
import { mockBackend } from '../../utils/mockBackend';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        code: '', // SKU
        category: '',
        price: '',
        status: 'Active',
        description: '',
        shortDescription: '',
        img: '/placeholder-bed.png' // Default placeholder
    });

    // Dynamic Specs
    const [specs, setSpecs] = useState([{ id: 1, key: 'Material', value: 'Stainless Steel' }]);

    // Compliance Data
    const [allCertificates, setAllCertificates] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    // Load data if edit mode
    useEffect(() => {
        setAllCertificates(mockBackend.getCertificates());
        setAllCategories(mockBackend.getCategories());

        if (isEditMode) {
            const product = mockBackend.getProduct(id);
            if (product) {
                setFormData({
                    name: product.name || '',
                    code: product.code || '',
                    category: product.category || '',
                    price: product.price || '',
                    status: product.stock !== 'Out of Stock' ? 'Active' : 'Hidden',
                    description: product.description || '',
                    shortDescription: product.description ? product.description.substring(0, 100) : '',
                    img: product.img || '/placeholder-bed.png',
                    inherit_certificates: product.inherit_certificates !== false, // default true
                    certificate_ids: product.certificate_ids || []
                });
                if (product.features) {
                    setSpecs(product.features.map((f, i) => ({ id: i, key: 'Feature', value: f })));
                }
            }
        } else {
            // New Product defaults
            setFormData(prev => ({ ...prev, inherit_certificates: true, certificate_ids: [] }));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!formData.name || !formData.category) {
            alert('Please fill in Name and Category');
            return;
        }

        const productData = {
            id: isEditMode ? id : undefined,
            ...formData,
            stock: formData.status === 'Active' ? 'In Stock' : 'Out of Stock', // Mapping back
            features: specs.map(s => s.value).filter(v => v) // Flatten specs to features array
        };

        mockBackend.saveProduct(productData);

        // Audit Logging
        const action = isEditMode ? 'Updated Product' : 'Created Product';
        let details = `Product: ${formData.name}`;

        if (!formData.inherit_certificates) {
            details += ` | Compliance Override: ENABLED (${formData.certificate_ids?.length || 0} certs selected)`;
        } else {
            details += ` | Compliance: Inherited`;
        }

        mockBackend.logActivity('Admin', action, formData.name, details);

        alert('Product Saved Successfully!');
        navigate('/admin/products');
    };

    const addSpec = () => {
        setSpecs([...specs, { id: Date.now(), key: '', value: '' }]);
    };

    const removeSpec = (id) => {
        setSpecs(specs.filter(s => s.id !== id));
    };

    const updateSpec = (id, field, val) => {
        setSpecs(specs.map(s => s.id === id ? { ...s, [field]: val } : s));
    };

    return (
        <div className="product-form-page" style={{ position: 'relative' }}>

            {/* A. TOP BAR (STICKY) */}
            <div className="admin-sticky-bar">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
                        <span onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>Dashboard</span> <ChevronRight size={14} />
                        <span onClick={() => navigate('/admin/products')} style={{ cursor: 'pointer' }}>Products</span> <ChevronRight size={14} />
                        <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>{isEditMode ? 'Edit Product' : 'Add Product'}</span>
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '4px' }}>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/admin/products')} className="btn btn-secondary" style={{ color: '#666' }}>Cancel</button>
                    <button onClick={handleSave} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Save size={18} /> {isEditMode ? 'Update Product' : 'Publish Product'}
                    </button>
                </div>
            </div>

            <div className="form-layout-grid">

                {/* LEFT COLUMN (Main Info) */}
                <div className="form-main">

                    {/* B. BASIC INFORMATION */}
                    <div className="form-card">
                        <h3>Basic Information</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '500', marginBottom: '8px', display: 'block' }}>Product Name <span style={{ color: 'red' }}>*</span></label>
                                <input name="name" value={formData.name} onChange={handleChange} type="text" className="form-control" placeholder="e.g. Iris Scissors Straight" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '500', marginBottom: '8px', display: 'block' }}>SKU / Product Code</label>
                                <input name="code" value={formData.code} onChange={handleChange} type="text" className="form-control" placeholder="e.g. SUR-001" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '500', marginBottom: '8px', display: 'block' }}>Price (₹)</label>
                                <input name="price" value={formData.price} onChange={handleChange} type="number" className="form-control" placeholder="e.g. 1200" />
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: '24px' }}>
                            <label className="form-label" style={{ fontWeight: '500', marginBottom: '8px', display: 'block' }}>Category <span style={{ color: 'red' }}>*</span></label>
                            <select name="category" value={formData.category} onChange={handleChange} className="form-control">
                                <option value="">Select Category...</option>
                                <option value="Surgical Instruments">Surgical Instruments</option>
                                <option value="Dental Instruments">Dental Instruments</option>
                                <option value="Tables">Tables</option>
                                <option value="Lights">Lights</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Anesthesia">Anesthesia</option>
                            </select>
                        </div>
                    </div>

                    {/* D. DESCRIPTION */}
                    <div className="form-card">
                        <h3>Product Description</h3>
                        <div className="form-group" style={{ marginBottom: '24px' }}>
                            <label className="form-label" style={{ fontWeight: '500', marginBottom: '8px', display: 'block' }}>Short Description</label>
                            <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="form-control" rows="3" placeholder="Brief summary for list views..."></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label" style={{ fontWeight: '500', marginBottom: '8px', display: 'block' }}>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="6" placeholder="Detailed product description..."></textarea>
                        </div>
                    </div>

                    {/* E. TECHNICAL SPECIFICATIONS */}
                    <div className="form-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.75rem' }}>
                            <h3 style={{ margin: 0, border: 'none', padding: 0 }}>Features / Specifications</h3>
                            <button onClick={addSpec} className="btn-sm btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Plus size={14} /> Add Row
                            </button>
                        </div>
                        <table className="spec-table">
                            <tbody>
                                {specs.map((spec) => (
                                    <tr key={spec.id}>
                                        <td style={{ width: '40%' }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Key (Optional)"
                                                value={spec.key}
                                                onChange={(e) => updateSpec(spec.id, 'key', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Value (e.g. 15cm or Feature)"
                                                value={spec.value}
                                                onChange={(e) => updateSpec(spec.id, 'value', e.target.value)}
                                            />
                                        </td>
                                        <td style={{ width: '40px', paddingTop: '8px' }}>
                                            <button onClick={() => removeSpec(spec.id)} className="btn-icon" style={{ color: '#c53030' }}><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* F. COMPLIANCE & CERTIFICATIONS */}
                    <div className="form-card">
                        <h3>Compliance & Certifications</h3>

                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            {/* Inheritance Toggle */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Inherit certificates from category</h4>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                                        When ON, this product automatically displays certificates assigned to <strong>{formData.category || 'its category'}</strong>.
                                    </p>
                                </div>
                                <label className="toggle-switch" style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.inherit_certificates}
                                        onChange={(e) => setFormData({ ...formData, inherit_certificates: e.target.checked })}
                                        style={{ opacity: 0, width: 0, height: 0 }}
                                    />
                                    <span style={{
                                        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                        backgroundColor: formData.inherit_certificates ? '#004daa' : '#ccc',
                                        borderRadius: '24px', transition: '0.4s'
                                    }}></span>
                                    <span style={{
                                        position: 'absolute', content: '""', height: '18px', width: '18px', left: '3px', bottom: '3px',
                                        backgroundColor: 'white', borderRadius: '50%', transition: '0.4s',
                                        transform: formData.inherit_certificates ? 'translateX(24px)' : 'translateX(0)'
                                    }}></span>
                                </label>
                            </div>

                            {/* Logic: If Inherit ON, show read-only list. If OFF, show selectable list */}
                            {formData.inherit_certificates ? (
                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>Inherited Certificates:</span>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                        {/* Helper logic to find inherited */}
                                        {(() => {
                                            const cat = allCategories.find(c => c.name === formData.category);
                                            // Get ID if found
                                            const inherited = cat ? mockBackend.getCertificatesForCategory(cat.id) : [];

                                            if (inherited.length === 0) return <span style={{ fontSize: '0.9rem', color: '#999', fontStyle: 'italic' }}>No certificates mapped to this category.</span>;

                                            return inherited.map(cert => (
                                                <div key={cert.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#e2e8f0', borderRadius: '20px', fontSize: '0.85rem', color: '#475569', cursor: 'not-allowed' }}>
                                                    <img src={cert.image} alt="" style={{ width: 16, height: 16 }} />
                                                    {cert.name}
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                    <div className="alert-warning" style={{ background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                        <strong>⚠ Override Mode:</strong> You are manually selecting certificates for this product. Updates to the category will NOT affect this product.
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>Select Applicable Certificates:</span>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
                                        {allCertificates.map(cert => (
                                            <label key={cert.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.certificate_ids?.includes(cert.id)}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        const current = formData.certificate_ids || [];
                                                        setFormData({
                                                            ...formData,
                                                            certificate_ids: checked
                                                                ? [...current, cert.id]
                                                                : current.filter(id => id !== cert.id)
                                                        });
                                                    }}
                                                />
                                                <img src={cert.image} alt="" style={{ width: 20, height: 20 }} />
                                                <span style={{ fontSize: '0.9rem' }}>{cert.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (Organization) */}
                <div className="form-sidebar">

                    {/* G. STATUS & VISIBILITY */}
                    <div className="form-card">
                        <h3>Status & Visibility</h3>
                        <div
                            className={`status-option ${formData.status === 'Active' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, status: 'Active' })}
                        >
                            {formData.status === 'Active' ? <CheckCircle size={20} color="var(--color-primary)" /> : <Circle size={20} color="#ddd" />}
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Active</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Visible on website</div>
                            </div>
                        </div>

                        <div
                            className={`status-option ${formData.status === 'Draft' ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, status: 'Draft' })}
                        >
                            {formData.status === 'Draft' ? <CheckCircle size={20} color="var(--color-primary)" /> : <Circle size={20} color="#ddd" />}
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Draft</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>In progress, hidden</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductForm;
