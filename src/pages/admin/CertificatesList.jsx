import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ShieldCheck, Home, Factory, Box } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const CertificatesList = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        setLoading(true);
        try {
            const data = await supabaseService.getCertificates();
            setCertificates(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id, certName) => {
        if (window.confirm(`Are you sure you want to delete "${certName}"?\n\nThis action cannot be undone.`)) {
            try {
                await supabaseService.deleteCertificate(id);
                loadCertificates();
            } catch (error) {
                console.error(error);
                alert('Failed to delete certificate');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Certificates & Compliance</h1>
                <Link to="/admin/certificates/new" className="btn btn-primary">
                    <Plus size={18} /> Add Certificate
                </Link>
            </div>

            {/* Soft UI Card List */}
            <div className="card-list">
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading certificates...</div>
                ) : certificates.length === 0 ? (
                    <div className="empty-state">
                        <ShieldCheck size={48} color="#cbd5e1" />
                        <h3>No Certificates Added</h3>
                        <p>Upload ISO, CE, or GMP certificates to display trust badges on your site.</p>
                        <Link to="/admin/certificates/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            Add First Certificate
                        </Link>
                    </div>
                ) : (
                    <div className="card-list-items">
                        {certificates.map(cert => (
                            <div key={cert.id} className="card-list-item" style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow-soft)' }}>

                                {/* 1. Logo & Name */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '30%' }}>
                                    <div style={{ width: 60, height: 60, background: 'white', border: '1px solid #F1F5F9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                                        <img
                                            src={cert.image}
                                            alt={cert.name}
                                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', color: '#1E293B', fontSize: '1.05rem' }}>{cert.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Added: {new Date(cert.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>

                                {/* 2. Visibility */}
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {cert.show_on_products ? (
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, background: '#F8FAFC', color: '#64748B', padding: '0.4rem 0.8rem', borderRadius: 999, display: 'flex', alignItems: 'center', gap: '4px' }}><Box size={14} /> On Products</span>
                                    ) : (
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, background: '#FFF1F2', color: '#E11D48', padding: '0.4rem 0.8rem', borderRadius: 999 }}>Hidden on Products</span>
                                    )}
                                    {cert.show_on_homepage && (
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, background: '#F0F9FF', color: '#0284C7', padding: '0.4rem 0.8rem', borderRadius: 999, display: 'flex', alignItems: 'center', gap: '4px' }}><Home size={14} /> On Home</span>
                                    )}
                                </div>

                                {/* 3. Status */}
                                <div>
                                    <span style={{
                                        padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600',
                                        background: cert.status === 'Active' ? '#ECFDF5' : '#F3F4F6',
                                        color: cert.status === 'Active' ? '#059669' : '#6B7280'
                                    }}>
                                        {cert.status}
                                    </span>
                                </div>

                                {/* 4. Actions */}
                                <div className="action-buttons" style={{ display: 'flex', gap: '0.75rem' }}>
                                    <Link to={`/admin/certificates/edit/${cert.id}`} className="btn-icon-soft" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', background: 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <Edit size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(cert.id, cert.name)} className="btn-icon-soft" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', background: '#FEF2F2', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificatesList;
